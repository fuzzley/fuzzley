// Counts every place that names a fuzzley commit by its hash: the files at
// main's tip, the sibling fuzzley-games repository's files, and the memory
// notes.
//
//   node hash-refs.mjs <mirror> <fuzzley-games-clone> <memory-dir> <data-dir>
//
// A token is any run of 7 to 40 lowercase hex characters standing alone. It
// counts as a reference when git resolves it, in the mirror, to a commit. One
// that resolves in fuzzley-games too is counted as ambiguous across the two,
// and left for a person to read. Reads only: nothing is written but the data
// files.
import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const [mirror, other, memoryDir, data] = process.argv.slice(2);
if (!mirror || !other || !memoryDir || !data) {
  console.error(
    "usage: hash-refs.mjs <mirror> <fuzzley-games-clone> <memory-dir> <data-dir>",
  );
  process.exit(2);
}
const TOKEN = /\b[0-9a-f]{7,40}\b/g;
const TEXT =
  /\.(md|mjs|js|ts|astro|json|ya?ml|sh|txt|tsv|toml|conf|template|html|css|scss|py)$|(^|\/)(Dockerfile|[^/.]+)$/;

/**
 * Runs git in a repository and returns what it printed.
 * @param {string} dir
 * @param {string[]} args
 * @param {string} [input]
 * @returns {string}
 */
function git(dir, args, input) {
  return execFileSync("git", ["-C", dir, ...args], {
    encoding: "utf8",
    maxBuffer: 1 << 30,
    ...(input === undefined ? {} : { input }),
  });
}

/**
 * Returns each token's resolution in a repository: the commit it names,
 * "ambiguous", or nothing.
 * @param {string} dir
 * @param {string[]} tokens
 * @returns {Map<string, string>}
 */
function resolve(dir, tokens) {
  /** @type {Map<string, string>} */
  const out = new Map();
  if (!tokens.length) return out;
  const lines = git(
    dir,
    ["cat-file", "--batch-check=%(objectname) %(objecttype)"],
    tokens.join("\n") + "\n",
  ).split("\n");
  tokens.forEach((t, i) => {
    const line = lines[i] ?? "";
    if (line.endsWith(" ambiguous")) out.set(t, "ambiguous");
    else if (line.endsWith(" commit")) out.set(t, line.split(" ")[0] ?? "");
  });
  return out;
}

/** @type {{ place: string, file: string, text: string }[]} */
const files = [];
const tip = git(mirror, ["ls-tree", "-r", "--name-only", "refs/heads/main"])
  .split("\n")
  .filter((p) => p && TEXT.test(p));
for (const p of tip) {
  const place = p.startsWith("docs/")
    ? "fuzzley: docs/"
    : /(^|\/)(AGENTS|CLAUDE)\.md$|^\.claude\//.test(p)
      ? "fuzzley: AGENTS.md, CLAUDE.md and skills"
      : /\.md$/.test(p)
        ? "fuzzley: other Markdown"
        : "fuzzley: code and config";
  files.push({
    place,
    file: p,
    text: git(mirror, ["show", `refs/heads/main:${p}`]),
  });
}
const otherFiles = git(other, ["ls-files"])
  .split("\n")
  .filter((p) => p && TEXT.test(p));
for (const p of otherFiles) {
  let text = "";
  try {
    text = readFileSync(join(other, p), "utf8");
  } catch {
    continue;
  }
  const place = p.startsWith("docs/archive/")
    ? "fuzzley-games: docs/archive/"
    : p.startsWith("docs/")
      ? "fuzzley-games: docs/, not the archive"
      : "fuzzley-games: everything else";
  files.push({ place, file: `fuzzley-games/${p}`, text });
}
for (const name of readdirSync(memoryDir)) {
  if (!name.endsWith(".md")) continue;
  files.push({
    place: "memory notes",
    file: `memory/${name}`,
    text: readFileSync(join(memoryDir, name), "utf8"),
  });
}

const tokens = [
  ...new Set(
    files.flatMap((f) => [...f.text.matchAll(TOKEN)].map((m) => m[0])),
  ),
];
const here = resolve(mirror, tokens);
const there = resolve(other, tokens);

/** @type {Map<string, { files: Set<string>, refs: number, commits: Set<string> }>} */
const places = new Map();
/** @type {Map<string, { place: string, refs: number, tokens: Set<string> }>} */
const byFile = new Map();
/** @type {string[]} */
const odd = [];
for (const f of files) {
  for (const [t] of f.text.matchAll(TOKEN)) {
    const commit = here.get(t);
    if (!commit) continue;
    if (commit === "ambiguous" || there.has(t)) {
      odd.push(
        `${f.file}\t${t}\t${commit === "ambiguous" ? "ambiguous in fuzzley" : "resolves in fuzzley-games too"}`,
      );
      continue;
    }
    const p = places.get(f.place) ?? {
      files: new Set(),
      refs: 0,
      commits: new Set(),
    };
    p.files.add(f.file);
    p.refs++;
    p.commits.add(commit);
    places.set(f.place, p);
    const b = byFile.get(f.file) ?? {
      place: f.place,
      refs: 0,
      tokens: new Set(),
    };
    b.refs++;
    b.tokens.add(t);
    byFile.set(f.file, b);
  }
}
const all = new Set([...places.values()].flatMap((p) => [...p.commits]));
writeFileSync(
  join(data, "hash-refs-summary.tsv"),
  [
    "place\tfiles\treferences\tdistinct commits",
    ...[...places]
      .sort((a, b) => b[1].refs - a[1].refs)
      .map(([k, p]) => `${k}\t${p.files.size}\t${p.refs}\t${p.commits.size}`),
    `all\t${byFile.size}\t${[...places.values()].reduce((s, p) => s + p.refs, 0)}\t${all.size}`,
  ].join("\n") + "\n",
);
writeFileSync(
  join(data, "hash-refs-files.tsv"),
  [
    "file\tplace\treferences\ttokens",
    ...[...byFile]
      .sort((a, b) => b[1].refs - a[1].refs)
      .map(
        ([k, b]) =>
          `${k}\t${b.place}\t${b.refs}\t${[...b.tokens].sort().join(" ")}`,
      ),
  ].join("\n") + "\n",
);
writeFileSync(
  join(data, "hash-refs-odd.tsv"),
  ["file\ttoken\twhy", ...odd].join("\n") + "\n",
);
console.log(readFileSync(join(data, "hash-refs-summary.tsv"), "utf8"));
console.log(`ambiguous or in both: ${odd.length}`);
