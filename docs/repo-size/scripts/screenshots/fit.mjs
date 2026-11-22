// Writes an image as lossless WebP no wider than a width: the form Part A
// commits. It decodes the image in full first, then resizes with lanczos3,
// never enlarging, since sharp resizing a WebP or JPEG file straight from
// disk decodes it at a reduced size first (shrink-on-load), which blurs it.
//
//   node fit.mjs <frontend-dir> <width> <input> <output.webp>
//
// <frontend-dir> is a checkout's frontend/ with node_modules, for its sharp.
import { createRequire } from "node:module";
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const [frontend, width, input, output] = process.argv.slice(2);
if (!frontend || !width || !input || !output) {
  console.error("usage: fit.mjs <frontend-dir> <width> <input> <output.webp>");
  process.exit(2);
}
/** @type {import("sharp")} */
const sharp = createRequire(join(frontend, "package.json"))("sharp");
const { data, info } = await sharp(await readFile(input))
  .rotate()
  .raw()
  .toBuffer({ resolveWithObject: true });
const { data: webp, info: out } = await sharp(data, {
  raw: { width: info.width, height: info.height, channels: info.channels },
})
  .resize({ width: Number(width), withoutEnlargement: true })
  .webp({ lossless: true, effort: 6 })
  .toBuffer({ resolveWithObject: true });
await writeFile(output, webp);
console.log(`${output}: ${out.width}x${out.height}, ${webp.length} bytes`);
