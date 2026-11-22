// Copied from fuzzley-games' docs/repo-size/scripts/history/rewrite-refs.mjs at 92f00d6b.
//
// Rewrites the commit hashes that files name, from the old history's to the
// rewritten history's, using filter-repo's commit-map. Dry run unless
// --write is given.
//
//   node rewrite-refs.mjs --map <commit-map> --old <old-git-dir> --new <new-git-dir>
//     [--other <git-dir>] [--exclude <path>]... [--write] <file-or-dir>...
//
// --exclude leaves out a file or folder that records the old history on
// purpose, such as docs/repo-size/data/history/, whose commit-map would
// otherwise have its old column rewritten.
//
// A token is a run of 7 to 40 lowercase hex characters standing alone. It is
// rewritten when git resolves it, in the old repository, to a commit the map
// gives a new hash, and it resolves in no --other repository (here
// fuzzley-games, whose short hashes the memory notes name too). The new
// token keeps the old one's length, unless that prefix is ambiguous in the
// new repository, when it grows until it is not. Only .md, .tsv, .txt, .sh,
// .mjs and .json files are read.
import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, resolve, sep } from "node:path";

const argv = process.argv.slice(2);
/** @type {Record<string, string>} */
const opts = {};
/** @type {string[]} */
const targets = [];
/** @type {string[]} */
const excluded = [];
let write = false;
for (let i = 0; i < argv.length; i++) {
  const a = argv[i] ?? "";
  if (a === "--write") write = true;
  else if (a === "--exclude") excluded.push(resolve(argv[++i] ?? ""));
  else if (a.startsWith("--")) opts[a.slice(2)] = argv[++i] ?? "";
  else targets.push(a);
}
const { map, old: oldDir, new: newDir, other = "" } = opts;
if (!map || !oldDir || !newDir || !targets.length) {
  console.error(
    "usage: rewrite-refs.mjs --map <commit-map> --old <dir> --new <dir> [--other <dir>] [--exclude <path>]... [--write] <path>...",
  );
  process.exit(2);
}
const TOKEN = /\b[0-9a-f]{7,40}\b/g;

/**
 * Returns what `git cat-file --batch-check` says of each name: the full
 * object name and type, 'ambiguous', or nothing.
 * @param {string} dir
 * @param {string[]} names
 * @returns {Map<string, { name: string, type: string }>}
 */
function check(dir, names) {
  /** @type {Map<string, { name: string, type: string }>} */
  const out = new Map();
  if (!dir || !names.length) return out;
  const lines = execFileSync(
    "git",
    ["-C", dir, "cat-file", "--batch-check=%(objectname) %(objecttype)"],
    {
      input: names.join("\n") + "\n",
      maxBuffer: 1 << 30,
    },
  )
    .toString()
    .split("\n");
  names.forEach((n, i) => {
    const [name = "", type = ""] = (lines[i] ?? "").split(" ");
    if (type === "ambiguous") out.set(n, { name: n, type: "ambiguous" });
    else if (type && type !== "missing") out.set(n, { name, type });
  });
  return out;
}

/** @type {Map<string, string>} */
const commitMap = new Map();
for (const line of readFileSync(map, "utf8").split("\n").slice(1)) {
  const [from, to] = line.split(" ");
  if (from && to) commitMap.set(from, to);
}

/**
 * Returns every file under the targets that the script reads.
 * @param {string} path
 * @returns {string[]}
 */
function files(path) {
  const full = resolve(path);
  if (excluded.some((e) => full === e || full.startsWith(e + sep))) return [];
  if (statSync(path).isDirectory()) {
    return readdirSync(path)
      .sort()
      .flatMap((n) => files(join(path, n)));
  }
  return /\.(md|tsv|txt|sh|mjs|json)$/.test(path) ? [path] : [];
}
const all = targets.flatMap(files);
const texts = new Map(all.map((f) => [f, readFileSync(f, "utf8")]));
const tokens = [
  ...new Set(
    [...texts.values()].flatMap((t) => [...t.matchAll(TOKEN)].map((m) => m[0])),
  ),
];
const inOld = check(oldDir, tokens);
const inOther = check(other, tokens);
const inNewAsWritten = check(newDir, tokens);

const counts = {
  tokens: tokens.length,
  "commits in old": 0,
  "ambiguous in old": 0,
  "resolve in other repository too": 0,
  "pruned (map gives 0000…)": 0,
  "hash unchanged": 0,
  "rewritten at the same length": 0,
  "rewritten longer, as the same length was ambiguous": 0,
  "old token resolves to something else in the new repository": 0,
};
/** @type {Map<string, string>} */
const replacement = new Map();
/** @type {string[]} */
const longer = [];
const candidates = [];
for (const t of tokens) {
  const o = inOld.get(t);
  if (!o) continue;
  if (o.type === "ambiguous") {
    counts["ambiguous in old"]++;
    continue;
  }
  if (o.type !== "commit") continue;
  counts["commits in old"]++;
  if (inOther.has(t)) {
    counts["resolve in other repository too"]++;
    continue;
  }
  const n = commitMap.get(o.name);
  if (!n || /^0+$/.test(n)) {
    counts["pruned (map gives 0000…)"]++;
    continue;
  }
  if (n === o.name) {
    counts["hash unchanged"]++;
    continue;
  }
  const stale = inNewAsWritten.get(t);
  if (stale && stale.name !== n)
    counts["old token resolves to something else in the new repository"]++;
  candidates.push({ t, n });
}
// Grow each new prefix until the new repository resolves it to its commit.
let pending = candidates.map((c) => ({ ...c, len: c.t.length }));
while (pending.length) {
  const got = check(
    newDir,
    pending.map((p) => p.n.slice(0, p.len)),
  );
  const next = [];
  for (const p of pending) {
    const r = got.get(p.n.slice(0, p.len));
    if (r && r.type !== "ambiguous" && r.name === p.n) {
      replacement.set(p.t, p.n.slice(0, p.len));
      if (p.len > p.t.length) {
        counts["rewritten longer, as the same length was ambiguous"]++;
        longer.push(`${p.t} -> ${p.n.slice(0, p.len)}`);
      } else counts["rewritten at the same length"]++;
    } else if (p.len < 40) next.push({ ...p, len: p.len + 1 });
  }
  pending = next;
}

let replaced = 0;
/** @type {[string, number][]} */
const perFile = [];
for (const [file, text] of texts) {
  let n = 0;
  const out = text.replace(TOKEN, (t) => {
    const r = replacement.get(t);
    if (!r) return t;
    n++;
    return r;
  });
  if (n) {
    perFile.push([file, n]);
    replaced += n;
    if (write) writeFileSync(file, out);
  }
}
console.log(`mode: ${write ? "write" : "dry run"}`);
console.log(`files read: ${all.length}`);
for (const e of excluded) console.log(`excluded: ${e}`);
for (const [k, v] of Object.entries(counts)) console.log(`${k}: ${v}`);
console.log(`replacements: ${replaced} in ${perFile.length} files`);
for (const l of longer) console.log(`  longer: ${l}`);
for (const [f, n] of perFile.sort((a, b) => b[1] - a[1]))
  console.log(`  ${n}\t${f}`);
