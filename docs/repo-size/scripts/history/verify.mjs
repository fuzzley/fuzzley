// Adapted from fuzzley-games' docs/repo-size/scripts/history/verify.mjs at
// 92f00d6b, for a repository with main alone.
//
// Checks a rewritten mirror against the original: the tree at main's tip,
// the commit counts, the commits default pruning would drop, and
// every commit hash a commit message names.
//
//   node verify.mjs <old-git-dir> <new-git-dir> <scenario> [removed-regex] [pruned-list]
//
// removed-regex matches the paths the scenario removes from the tip on
// purpose, which the tree check leaves out. pruned-list is the old commits
// filter-repo's default pruning dropped, one per line.
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const [oldDir, newDir, scenario, removedSource = "", prunedFile = ""] =
  process.argv.slice(2);
const removed = removedSource ? new RegExp(removedSource) : undefined;

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

/** @type {Map<string, string>} old commit to new; identity without a map */
const commitMap = new Map();
const mapFile = join(newDir, "filter-repo/commit-map");
if (existsSync(mapFile)) {
  for (const line of readFileSync(mapFile, "utf8").split("\n").slice(1)) {
    const [from, to] = line.split(" ");
    if (from && to) commitMap.set(from, to);
  }
}
/**
 * Returns the commit an old commit became.
 * @param {string} old
 * @returns {string}
 */
const mapped = (old) => commitMap.get(old) ?? old;

console.log(`scenario: ${scenario}`);

// The tip trees.
for (const ref of ["refs/heads/main"]) {
  /**
   * Returns a tip's entries, without the paths removed on purpose.
   * @param {string} dir
   * @returns {{ kept: Set<string>, dropped: number }}
   */
  const entries = (dir) => {
    const lines = git(dir, ["ls-tree", "-r", "--full-tree", ref])
      .split("\n")
      .filter(Boolean);
    const kept = lines.filter(
      (l) => !(removed && removed.test(l.split("\t")[1] ?? "")),
    );
    return { kept: new Set(kept), dropped: lines.length - kept.length };
  };
  const before = entries(oldDir);
  const after = entries(newDir);
  const lost = [...before.kept].filter((e) => !after.kept.has(e));
  const gained = [...after.kept].filter((e) => !before.kept.has(e));
  console.log(
    `tree entries, ${ref}: ${before.kept.size + before.dropped} before, ${after.kept.size + after.dropped} after`,
  );
  console.log(`tree entries removed on purpose, ${ref}: ${before.dropped}`);
  console.log(`tree differences, ${ref}: ${lost.length + gained.length}`);
  for (const e of [
    ...lost.slice(0, 10).map((e) => `- ${e}`),
    ...gained.slice(0, 10).map((e) => `+ ${e}`),
  ]) {
    console.log(`  ${e}`);
  }
  const oldTip = git(oldDir, ["rev-parse", ref]).trim();
  const newTip = git(newDir, ["rev-parse", ref]).trim();
  console.log(
    `tip, ${ref}: ${oldTip} -> ${newTip}; commit-map gives ${mapped(oldTip)}`,
  );
}

// The commit counts.
for (const range of [["refs/heads/main"], ["--all"]]) {
  const before = git(oldDir, ["rev-list", "--count", ...range]).trim();
  const after = git(newDir, ["rev-list", "--count", ...range]).trim();
  console.log(`commits, ${range.join(" ")}: ${before} before, ${after} after`);
}
const changed = [...commitMap].filter(([a, b]) => a !== b).length;
console.log(
  `commits whose hash changed: ${changed} of ${commitMap.size || "all (no map)"}`,
);
const unchanged = [...commitMap].filter(([a, b]) => a === b).map(([a]) => a);
console.log(`commits whose hash stayed: ${unchanged.length}`);

// What default pruning would drop.
const pruned =
  prunedFile && existsSync(prunedFile)
    ? readFileSync(prunedFile, "utf8").split("\n").filter(Boolean)
    : [];
const onMain = new Set(
  git(oldDir, ["rev-list", "refs/heads/main"]).split("\n").filter(Boolean),
);
console.log(
  `commits default pruning drops: ${pruned.length}, ${pruned.filter((c) => onMain.has(c)).length} of them on main`,
);
for (const c of pruned.slice(0, 15)) {
  console.log(
    `  ${git(oldDir, ["log", "-1", "--format=%h %cs %s", c]).trim().slice(0, 110)}`,
  );
}
if (pruned.length > 15) console.log(`  ... and ${pruned.length - 15} more`);

// Every hex token of 7 to 40 characters in a commit message that names a
// commit, and what the rewritten message says in its place.
/**
 * Returns every commit's message, by hash.
 * @param {string} dir
 * @returns {Map<string, string>}
 */
function messages(dir) {
  const out = git(dir, ["log", "--all", "--format=%H%x00%B%x01"]);
  /** @type {Map<string, string>} */
  const byHash = new Map();
  for (const record of out.split("\x01")) {
    const [hash, body] = record.replace(/^\n/, "").split("\x00");
    if (hash && body !== undefined) byHash.set(hash, body);
  }
  return byHash;
}
const before = messages(oldDir);
const after = messages(newDir);
/** @type {Map<string, string>} */
const tokens = new Map();
for (const body of before.values()) {
  for (const [t] of body.matchAll(/\b[0-9a-f]{7,40}\b/g)) tokens.set(t, "");
}
const resolved = git(
  oldDir,
  ["cat-file", "--batch-check=%(objectname) %(objecttype)"],
  [...tokens.keys()].join("\n") + "\n",
)
  .split("\n")
  .filter(Boolean);
const names = [...tokens.keys()];
names.forEach((t, i) => {
  const [full, type] = (resolved[i] ?? "").split(" ");
  tokens.set(t, type === "commit" && full ? full : "");
});
let total = 0;
let onMainTotal = 0;
let right = 0;
let same = 0;
/** @type {string[]} */
const wrong = [];
/** @type {string[]} */
const samples = [];
for (const [hash, body] of before) {
  const newBody = after.get(mapped(hash)) ?? "";
  for (const [t] of body.matchAll(/\b[0-9a-f]{7,40}\b/g)) {
    const full = tokens.get(t);
    if (!full) continue;
    total++;
    if (onMain.has(hash)) onMainTotal++;
    const expected = mapped(full).slice(0, t.length);
    if (expected === t) {
      same++;
      continue;
    }
    if (newBody.includes(expected) && !new RegExp(`\\b${t}\\b`).test(newBody)) {
      right++;
      if (samples.length < 8 && onMain.has(hash))
        samples.push(
          `  ${hash.slice(0, 10)} names ${t} -> ${mapped(hash).slice(0, 10)} names ${expected}`,
        );
    } else {
      wrong.push(`  ${hash.slice(0, 10)} names ${t}, expected ${expected}`);
    }
  }
}
console.log(
  `message hash references: ${total}, ${onMainTotal} of them in main's commits`,
);
console.log(`message hash references rewritten: ${right}`);
console.log(`message hash references to commits that kept their hash: ${same}`);
console.log(`message hash references wrong: ${wrong.length}`);
for (const s of samples) console.log(s);
for (const w of wrong.slice(0, 15)) console.log(w);
