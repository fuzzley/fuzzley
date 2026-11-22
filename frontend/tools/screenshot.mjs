// Adds or retakes a project screenshot: writes a capture to
// src/assets/projects/<name>.webp as lossless WebP, no wider than the widest
// copy the site serves of it.
//
// Every version of a screenshot stays in the repository's history for good,
// so a committed screenshot is only as wide as the site can use. The build
// makes the AVIF and WebP copies the pages serve from it.
//
//   node tools/screenshot.mjs <capture> <name> [--gallery]
//
//   <capture>  Any image sharp reads, such as a PNG from the browser. It may
//              be the very file it replaces.
//   <name>     The file's name: lowercase letters, digits and hyphens.
//   --gallery  For a project page's gallery, which is 16:9 and served up to
//              1200 px wide. Without it, the capture is a cover: 4:3 to 16:10,
//              up to 1600 px.
//
// A capture of another shape is refused, and nothing is written. For a
// cover, it prints the commonest color along the bottom edge, and says
// whether the project's `tint` is near enough to it: a tile taller than its
// cover shows the tint below it.

import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import sharp from "sharp";
import {
  COVER_MAX_WIDTH,
  COVER_RATIOS,
  GALLERY_MAX_WIDTH,
  GALLERY_RATIO,
  RATIO_TOLERANCE,
} from "../src/lib/image-widths.ts";

const USAGE = "usage: yarn screenshot <capture> <name> [--gallery]";
const NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

// How far a tint may be from its cover's bottom edge, in any channel of 255,
// and still read as part of the picture. Each tint was within 3 when this
// was written.
const TINT_NEAR = 4;

const frontendDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const assetsDir = path.join(frontendDir, "src/assets/projects");
const contentDir = path.join(frontendDir, "src/content/projects");

/** @returns {{ capture: string, name: string, gallery: boolean }} */
function readArgs() {
  try {
    const { positionals, values } = parseArgs({
      allowPositionals: true,
      options: { gallery: { type: "boolean", default: false } },
    });
    const [capture, name] = positionals;
    if (positionals.length === 2 && capture && name && NAME.test(name)) {
      return { capture, name, gallery: values.gallery };
    }
  } catch {
    // An unknown option: the usage below says what it takes.
  }
  console.error(USAGE);
  console.error("<name> is lowercase letters, digits and hyphens.");
  process.exit(2);
}

/** @param {number} ratio */
const shape = (ratio) => ratio.toFixed(3);

/**
 * The commonest color along the bottom 2% of an image, to 6 bits a channel,
 * as the mean of the pixels that have it, and how many of them do.
 *
 * @param {Buffer} pixels Raw pixels, `channels` bytes each.
 * @param {{ width: number, height: number, channels: number }} info
 */
function bottomEdge(pixels, { width, height, channels }) {
  const rows = Math.max(1, Math.round(height * 0.02));
  /** @type {Map<number, { count: number, sum: number[] }>} */
  const bins = new Map();
  for (let y = height - rows; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels;
      const rgb = [pixels[i], pixels[i + 1], pixels[i + 2]];
      const key = ((rgb[0] >> 2) << 12) | ((rgb[1] >> 2) << 6) | (rgb[2] >> 2);
      const bin = bins.get(key) ?? { count: 0, sum: [0, 0, 0] };
      bin.count++;
      rgb.forEach((value, c) => (bin.sum[c] += value));
      bins.set(key, bin);
    }
  }
  const top = [...bins.values()].reduce((a, b) => (b.count > a.count ? b : a));
  const hex = top.sum
    .map((sum) =>
      Math.round(sum / top.count)
        .toString(16)
        .padStart(2, "0"),
    )
    .join("");
  return { color: `#${hex}`, share: top.count / (rows * width) };
}

/**
 * The content files that name a screenshot, with each one's tint if it
 * names it as the cover.
 *
 * @param {string} file The screenshot's file name.
 */
async function namedIn(file) {
  const found = [];
  for (const entry of await readdir(contentDir)) {
    if (!entry.endsWith(".md")) continue;
    const text = await readFile(path.join(contentDir, entry), "utf8");
    if (!text.includes(`assets/projects/${file}`)) continue;
    const cover = new RegExp(`^cover: .*/${file}$`, "m").test(text);
    const tint = text.match(/^tint: "(#[0-9a-f]{6})"$/im)?.[1];
    found.push({ entry, tint: cover ? tint : undefined });
  }
  return found;
}

const { capture, name, gallery } = readArgs();
const maxWidth = gallery ? GALLERY_MAX_WIDTH : COVER_MAX_WIDTH;
const [minRatio, maxRatio] = gallery
  ? [GALLERY_RATIO, GALLERY_RATIO]
  : [COVER_RATIOS.min, COVER_RATIOS.max];

// `yarn screenshot` runs this from frontend/, and says where it was run from
// in INIT_CWD, which a capture's path is relative to.
const from =
  process.env.npm_lifecycle_event === "screenshot" && process.env.INIT_CWD
    ? process.env.INIT_CWD
    : process.cwd();
const source = path.resolve(from, capture);
let bytes;
try {
  bytes = await readFile(source);
} catch (error) {
  console.error(`Can't read ${source}: ${error.message}`);
  process.exit(1);
}
// Decoded in full before resizing: sharp resizing a WebP or JPEG file
// straight from its bytes decodes it at a reduced size first, which blurs it.
const { data, info } = await sharp(bytes)
  .rotate()
  .raw()
  .toBuffer({ resolveWithObject: true });

const ratio = info.width / info.height;
if (
  ratio < minRatio * (1 - RATIO_TOLERANCE) ||
  ratio > maxRatio * (1 + RATIO_TOLERANCE)
) {
  const wanted =
    minRatio === maxRatio
      ? shape(minRatio)
      : `${shape(minRatio)} to ${shape(maxRatio)}`;
  console.error(
    `${capture} is ${info.width} × ${info.height}, ${shape(ratio)} wide to 1 high.`,
  );
  console.error(
    `A ${gallery ? "gallery image" : "cover"} is ${wanted}, within ${RATIO_TOLERANCE * 100}%. Nothing written.`,
  );
  process.exit(1);
}

const raw = {
  raw: { width: info.width, height: info.height, channels: info.channels },
};
const resized = await sharp(data, raw)
  .resize({ width: maxWidth, withoutEnlargement: true, kernel: "lanczos3" })
  .raw()
  .toBuffer({ resolveWithObject: true });
const webp = await sharp(resized.data, { raw: resized.info })
  .webp({ lossless: true, effort: 6 })
  .toBuffer();

const file = `${name}.webp`;
const output = path.join(assetsDir, file);
await writeFile(output, webp);
console.log(
  `${path.relative(frontendDir, output)}: ${resized.info.width} × ${resized.info.height}, ${(webp.length / 1024).toFixed(1)} KiB`,
);

const named = await namedIn(file);
if (!named.length) {
  console.log(
    `No content file names it yet: point a project's \`cover:\` or a gallery \`image:\` at ../../assets/projects/${file}.`,
  );
}
if (!gallery) {
  const edge = bottomEdge(resized.data, resized.info);
  console.log(
    `bottom edge: ${edge.color} (${Math.round(edge.share * 100)}% of it)`,
  );
  const tints = named.filter(({ tint }) => tint);
  if (!tints.length) {
    console.log(`Set the project's \`tint\` to "${edge.color}".`);
  }
  for (const { entry, tint } of tints) {
    const off = Math.max(
      ...[1, 3, 5].map((i) =>
        Math.abs(
          parseInt(edge.color.slice(i, i + 2), 16) -
            parseInt(tint.slice(i, i + 2), 16),
        ),
      ),
    );
    console.log(
      off <= TINT_NEAR
        ? `${entry}'s tint "${tint}" is near enough: keep it.`
        : `${entry}'s tint is "${tint}": set it to "${edge.color}".`,
    );
  }
}
