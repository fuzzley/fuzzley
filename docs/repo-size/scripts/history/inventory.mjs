// Sorts every blob history holds by what it is, and whether main's tip still
// holds it, and writes the lists of blobs the scenarios strip.
//
//   node inventory.mjs <baseline-git-dir> <analysis-dir> <out-dir> <data-dir>
//
// <baseline-git-dir> is the mirror repacked as the scenarios are, so each
// blob's size on disk is what it costs a clone. <analysis-dir> is
// `git filter-repo --analyze`'s report folder, whose blob-shas-and-paths.txt
// gives every path a blob was ever stored under. The game builds' and the
// vendored libraries' folders come from env.sh.
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const [baseDir, analysisDir, outDir, dataDir] = process.argv.slice(2);
if (!baseDir || !analysisDir || !outDir || !dataDir) {
  console.error(
    "usage: inventory.mjs <baseline-git-dir> <analysis-dir> <out-dir> <data-dir>",
  );
  process.exit(2);
}
const GAME_BUILDS = new RegExp(
  process.env.GAME_BUILDS ?? "^(frontend/public/)?projects?/",
);
const VENDORED = new RegExp(
  process.env.VENDORED ?? "^(frontend/public/)?external/",
);
const IMAGE = /\.(png|jpe?g|webp|avif|gif|svg|ico|pdf)$/i;

/**
 * Runs git in a repository and returns what it printed.
 * @param {string[]} args
 * @param {string} [input]
 * @returns {string}
 */
function git(args, input) {
  return execFileSync("git", ["-C", baseDir, ...args], {
    encoding: "utf8",
    maxBuffer: 1 << 30,
    ...(input === undefined ? {} : { input }),
  });
}

/** @type {Map<string, string[]>} blob id to every path it was stored under */
const paths = new Map();
for (const line of readFileSync(
  join(analysisDir, "blob-shas-and-paths.txt"),
  "utf8",
)
  .split("\n")
  .slice(2)) {
  const m = /^\s*([0-9a-f]{40})\s+\d+\s+\d+\s+(.*)$/.exec(line);
  if (!m) continue;
  const [, id, rest] = m;
  const list = rest.startsWith("[") ? rest.slice(1, -1).split(", ") : [rest];
  paths.set(id, list);
}

const tip = new Set(
  git(["ls-tree", "-r", "--format=%(objectname)", "refs/heads/main"])
    .split("\n")
    .filter(Boolean),
);

/** @type {{ id: string, raw: number, disk: number, paths: string[], kind: string, atTip: boolean }[]} */
const blobs = [];
const listed = git(["rev-list", "--objects", "--all"])
  .split("\n")
  .map((l) => l.split(" ")[0])
  .filter(Boolean)
  .join("\n");
for (const line of git(
  [
    "cat-file",
    "--batch-check=%(objecttype) %(objectname) %(objectsize) %(objectsize:disk)",
  ],
  listed + "\n",
).split("\n")) {
  const [type, id, raw, disk] = line.split(" ");
  if (type !== "blob" || !id) continue;
  const where = paths.get(id) ?? [];
  let kind = "text and code";
  if (where.length && where.every((p) => GAME_BUILDS.test(p)))
    kind = "game builds";
  else if (
    where.length &&
    where.every((p) => VENDORED.test(p) || GAME_BUILDS.test(p))
  )
    kind = "vendored libraries";
  else if (where.some((p) => IMAGE.test(p))) kind = "site images";
  blobs.push({
    id,
    raw: Number(raw),
    disk: Number(disk),
    paths: where,
    kind,
    atTip: tip.has(id),
  });
}

const MiB = 1024 * 1024;
/**
 * Formats bytes as MiB to two places.
 * @param {number} n
 * @returns {string}
 */
const mib = (n) => (n / MiB).toFixed(2);

/** @type {Map<string, { count: number, raw: number, disk: number }>} */
const groups = new Map();
for (const b of blobs) {
  const key = `${b.kind}\t${b.atTip ? "at main's tip" : "old"}`;
  const g = groups.get(key) ?? { count: 0, raw: 0, disk: 0 };
  g.count++;
  g.raw += b.raw;
  g.disk += b.disk;
  groups.set(key, g);
}
const total = blobs.reduce((s, b) => s + b.disk, 0);
const rows = [...groups].sort((a, b) => b[1].disk - a[1].disk);
writeFileSync(
  join(dataDir, "inventory-kinds.tsv"),
  [
    "kind\twhere\tblobs\traw MiB\ton disk MiB\tshare of blobs on disk",
    ...rows.map(
      ([k, g]) =>
        `${k}\t${g.count}\t${mib(g.raw)}\t${mib(g.disk)}\t${((100 * g.disk) / total).toFixed(1)}%`,
    ),
    `all\t\t${blobs.length}\t${mib(blobs.reduce((s, b) => s + b.raw, 0))}\t${mib(total)}\t100%`,
  ].join("\n") + "\n",
);

// The folders, by the first path each blob was stored under: each game's
// build folder, and two levels below frontend/ otherwise.
/** @type {Map<string, { count: number, disk: number, kind: string }>} */
const folders = new Map();
for (const b of blobs) {
  const p = b.paths[0] ?? "(no path)";
  const parts = p.split("/");
  const build = GAME_BUILDS.test(p) && parts[0] === "frontend";
  const depth = build ? 4 : parts[0] === "frontend" ? 3 : 2;
  const key = parts.length > depth ? parts.slice(0, depth).join("/") + "/" : p;
  const f = folders.get(key) ?? { count: 0, disk: 0, kind: b.kind };
  if (f.kind !== b.kind) f.kind = "mixed";
  f.count++;
  f.disk += b.disk;
  folders.set(key, f);
}
writeFileSync(
  join(dataDir, "inventory-folders.tsv"),
  [
    "folder\tkind\tblobs\ton disk MiB",
    ...[...folders]
      .sort((a, b) => b[1].disk - a[1].disk)
      .filter(([, f]) => f.disk >= 0.01 * MiB)
      .map(([k, f]) => `${k}\t${f.kind}\t${f.count}\t${mib(f.disk)}`),
  ].join("\n") + "\n",
);

// The largest blobs, for a look by eye.
writeFileSync(
  join(dataDir, "inventory-largest.tsv"),
  [
    "blob\traw KiB\ton disk KiB\tkind\twhere\tpaths",
    ...[...blobs]
      .sort((a, b) => b.disk - a.disk)
      .slice(0, 40)
      .map(
        (b) =>
          `${b.id.slice(0, 8)}\t${(b.raw / 1024).toFixed(0)}\t${(b.disk / 1024).toFixed(0)}\t${b.kind}\t${b.atTip ? "tip" : "old"}\t${b.paths.join(", ")}`,
      ),
  ].join("\n") + "\n",
);

// What r3 strips beyond r2's folders: every old version of a site image.
mkdirSync(outDir, { recursive: true });
const oldImages = blobs.filter((b) => b.kind === "site images" && !b.atTip);
writeFileSync(
  join(outDir, "r3-strip-ids.txt"),
  oldImages.map((b) => b.id).join("\n") + "\n",
);
writeFileSync(
  join(dataDir, "inventory-old-site-images.tsv"),
  [
    "blob\ton disk KiB\tpaths",
    ...oldImages
      .sort((a, b) => b.disk - a.disk)
      .map(
        (b) =>
          `${b.id.slice(0, 8)}\t${(b.disk / 1024).toFixed(1)}\t${b.paths.join(", ")}`,
      ),
  ].join("\n") + "\n",
);
console.log(readFileSync(join(dataDir, "inventory-kinds.tsv"), "utf8"));
