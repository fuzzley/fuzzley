// Compares what builds serve of each screenshot with the best that could be
// served: how much each AVIF copy in a build's dist/_astro/ differs from its
// screenshot as committed at a reference commit, decoded in full and resized
// to the copy's size with lanczos3 alone, as encodings.mjs measures.
//
//   node compare-builds.mjs <frontend-dir> <ref-commit> <out-file> <label>=<dist-dir>...
//
// <frontend-dir> is a checkout's frontend/ with node_modules, for its sharp,
// and inside the repository <ref-commit> is read from. Each <dist-dir> is a
// built site. A copy is matched to its screenshot by the name its file starts
// with, such as solitaire-klondike.hUlJ9YUt_Z26OSA0.avif. The error is the
// mean change in a channel, of 255.
//
// Writes a row for each screenshot and width, with each build's error, then
// each build's mean at every width and at each screenshot's widest.
//
// Astro asks sharp for a width and a height it rounds, and sharp crops to
// them. A screenshot whose shape isn't a round ratio, such as Spider
// Solitaire's 1600 x 996, comes out a fraction of a pixel off the stretched
// reference at some widths, and measures worse than it looks.
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const [frontend, ref, outFile, ...builds] = process.argv.slice(2);
if (!frontend || !ref || !outFile || !builds.length) {
  console.error(
    "usage: compare-builds.mjs <frontend-dir> <ref-commit> <out-file> <label>=<dist-dir>...",
  );
  process.exit(2);
}
/** @type {import("sharp")} */
const sharp = createRequire(resolve(frontend, "package.json"))("sharp");

/** @typedef {{ data: Buffer, width: number, height: number }} Pixels */

/**
 * Returns an image's pixels, decoded in full, without alpha.
 * @param {Buffer} bytes
 * @returns {Promise<Pixels>}
 */
async function decode(bytes) {
  const { data, info } = await sharp(bytes)
    .rotate()
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  return { data, width: info.width, height: info.height };
}

/**
 * Returns decoded pixels resized with lanczos3 alone to exactly a size.
 * @param {Pixels} pixels
 * @param {number} width
 * @param {number} height
 * @returns {Promise<Pixels>}
 */
async function resized(pixels, width, height) {
  const { data, info } = await sharp(pixels.data, {
    raw: { width: pixels.width, height: pixels.height, channels: 3 },
  })
    .resize({ width, height, fit: "fill" })
    .raw()
    .toBuffer({ resolveWithObject: true });
  return { data, width: info.width, height: info.height };
}

/**
 * Returns the mean change between two images' channels, of 255.
 * @param {Pixels} a
 * @param {Pixels} b
 * @returns {number}
 */
function meanChange(a, b) {
  let sum = 0;
  for (let i = 0; i < a.data.length; i++) {
    sum += Math.abs((a.data[i] ?? 0) - (b.data[i] ?? 0));
  }
  return sum / a.data.length;
}

// The screenshots at the reference commit, by name without extension.
const git = (/** @type {string[]} */ ...args) =>
  execFileSync("git", ["-C", frontend, ...args], {
    maxBuffer: 1 << 28,
  });
const folder = "frontend/src/assets/projects/";
/** @type {Map<string, Pixels>} */
const references = new Map();
for (const path of git(
  "ls-tree",
  "--full-tree",
  "--name-only",
  `${ref}:${folder}`,
)
  .toString()
  .split("\n")
  .filter(Boolean)) {
  const name = path.replace(/\.[^.]+$/, "");
  references.set(name, await decode(git("show", `${ref}:${folder}${path}`)));
}

/** @type {Map<string, Map<string, number>>} "name width" to each build's error */
const rows = new Map();
const labels = [];
for (const build of builds) {
  const [label, dir] = build.split("=");
  if (!label || !dir) throw new Error(`not <label>=<dist-dir>: ${build}`);
  labels.push(label);
  const astro = join(dir, "_astro");
  for (const file of readdirSync(astro).sort()) {
    if (!file.endsWith(".avif")) continue;
    const name = file.slice(0, file.indexOf("."));
    const capture = references.get(name);
    if (!capture) continue;
    const served = await decode(readFileSync(join(astro, file)));
    const best = await resized(capture, served.width, served.height);
    const key = `${name}\t${served.width}`;
    const row = rows.get(key) ?? new Map();
    row.set(label, meanChange(best, served));
    rows.set(key, row);
  }
}

const byName = (/** @type {string} */ a, /** @type {string} */ b) => {
  const [an, aw] = a.split("\t");
  const [bn, bw] = b.split("\t");
  return an === bn
    ? Number(aw) - Number(bw)
    : (an ?? "").localeCompare(bn ?? "");
};
const keys = [...rows.keys()].sort(byName);
const out = [["image", "width", ...labels].join("\t")];
for (const key of keys) {
  const row = rows.get(key);
  out.push(
    [key, ...labels.map((l) => row?.get(l)?.toFixed(2) ?? "-")].join("\t"),
  );
}

// The widest width each build serves of each screenshot.
out.push("", ["image", ...labels.map((l) => `${l}: widest, error`)].join("\t"));
const names = [...new Set(keys.map((k) => k.split("\t")[0]))];
/** @type {Record<string, { every: number[], widest: number[] }>} */
const means = Object.fromEntries(
  labels.map((l) => [l, { every: [], widest: [] }]),
);
for (const name of names) {
  const cells = [name];
  for (const label of labels) {
    const own = keys.filter(
      (k) => k.startsWith(`${name}\t`) && rows.get(k)?.has(label),
    );
    const widest = own.at(-1);
    const error = widest ? rows.get(widest)?.get(label) : undefined;
    cells.push(
      widest && error !== undefined
        ? `${widest.split("\t")[1]}, ${error.toFixed(2)}`
        : "-",
    );
    if (error !== undefined) means[label]?.widest.push(error);
    for (const k of own) {
      const e = rows.get(k)?.get(label);
      if (e !== undefined) means[label]?.every.push(e);
    }
  }
  out.push(cells.join("\t"));
}
const mean = (/** @type {number[]} */ xs) =>
  (xs.reduce((a, b) => a + b, 0) / xs.length).toFixed(2);
out.push("", "build\tmean error, every copy\tmean error, each one's widest");
for (const label of labels) {
  const m = means[label];
  if (m) out.push([label, mean(m.every), mean(m.widest)].join("\t"));
}
out.push(
  "",
  `reference: the screenshots at ${ref}; sharp ${sharp.versions.sharp}, libvips ${sharp.versions.vips}`,
);
writeFileSync(outFile, out.join("\n") + "\n");
console.log(out.join("\n"));
