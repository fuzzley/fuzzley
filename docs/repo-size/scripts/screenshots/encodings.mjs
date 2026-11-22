// Measures what each screenshot would cost committed in other forms, and how
// close what a visitor gets from each form comes to the capture.
//
//   node encodings.mjs <frontend-dir> <out-file> <widths-file> [today|plan]
//
// <frontend-dir> is a checkout's frontend/ with node_modules, whose sharp is
// the one Astro uses. Each screenshot under src/assets/projects/ is encoded
// as:
//
//   today              the committed file
//   lossless WebP      no wider than the widest picture the site draws from it
//                      (the cap)
//   lossless PNG       the same pixels, as PNG, which sharp resizes without
//                      shrink-on-load
//   q90 WebP           lossy, at the committed file's own size
//
// Then, for every width the site draws the image at, it makes what a visitor
// gets from each form, as Astro's sharp service does: sharp's resize with its
// defaults (lanczos3, never enlarged, and shrink-on-load for a WebP source),
// then AVIF at sharp's default quality, decoded again. It compares that with
// the reference: the capture's decoded pixels resized with lanczos3 alone, to
// the served image's size, which is the best any form could give back. The error is the mean change in
// a channel, of 255. It also gives the change before the AVIF encode, which is
// the resizes' alone.
//
// The widths are the site's at b45c184, or with `plan`, the ones the plan
// gives the site, which reach 2x tablets and 3x phones (§5).
//
// Writes a summary to <out-file> and every width's figures to <widths-file>.
import { createRequire } from "node:module";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const [frontend, outFile, widthsFile, widthSet = "today"] =
  process.argv.slice(2);
if (!frontend || !outFile || !widthsFile) {
  console.error("usage: encodings.mjs <frontend-dir> <out-file> <widths-file>");
  process.exit(2);
}
/** @type {import("sharp")} */
const sharp = createRequire(resolve(frontend, "package.json"))("sharp");

// The widths each use asks for, from the pages and components at b45c184:
// GameTile (wide and small), the project page's cover and gallery, the
// Projects page's cards, and the project page's 1200 px link preview. The
// plan's add 1600 to the wide covers, 800 to the small tiles, and 1200 to the
// cards and the gallery.
const WIDTH_SETS = {
  today: {
    cover: [320, 400, 480, 640, 720, 800, 960, 1200, 1280],
    gallery: [400, 640, 800],
  },
  plan: {
    cover: [320, 400, 480, 640, 720, 800, 960, 1200, 1280, 1600],
    gallery: [400, 640, 800, 1200],
  },
};
const widthSetFor = widthSet === "plan" ? WIDTH_SETS.plan : WIDTH_SETS.today;
const COVER = widthSetFor.cover;
const GALLERY = widthSetFor.gallery;
/** @type {Record<string, number[]>} */
const USES = {
  "fuzzley-games.webp": COVER,
  "minesweeper.png": COVER,
  "pong.png": COVER,
  "solitaire-klondike.webp": COVER,
  "spider.png": COVER,
  "solitaire-freecell.webp": GALLERY,
  "solitaire-pyramid.webp": GALLERY,
  "solitaire-spider.webp": GALLERY,
};

/** @typedef {{ data: Buffer, width: number, height: number }} Pixels */

/**
 * Returns an encoded image's pixels at a width, resized as Astro's sharp
 * service resizes.
 * @param {Buffer} input
 * @param {number} width
 * @returns {Promise<Pixels>}
 */
async function served(input, width) {
  const { data, info } = await sharp(input)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  return { data, width: info.width, height: info.height };
}

/**
 * Returns decoded pixels resized with lanczos3 alone, as raw input has no
 * shrink-on-load: to a width, or to exactly a width and a height.
 * @param {Pixels} pixels
 * @param {number} width
 * @param {number} [height]
 * @returns {Promise<Pixels>}
 */
async function reference(pixels, width, height) {
  const { data, info } = await sharp(pixels.data, {
    raw: { width: pixels.width, height: pixels.height, channels: 3 },
  })
    .resize(
      height === undefined
        ? { width, withoutEnlargement: true }
        : { width, height, fit: "fill" },
    )
    .raw()
    .toBuffer({ resolveWithObject: true });
  return { data, width: info.width, height: info.height };
}

/**
 * Returns pixels as a visitor gets them: encoded as AVIF at sharp's default
 * quality, as Astro encodes with none given, and decoded again.
 * @param {Pixels} pixels
 * @returns {Promise<Pixels>}
 */
async function throughAvif(pixels) {
  const avif = await sharp(pixels.data, {
    raw: { width: pixels.width, height: pixels.height, channels: 3 },
  })
    .avif()
    .toBuffer();
  const { data, info } = await sharp(avif)
    .removeAlpha()
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
  if (a.width !== b.width || a.height !== b.height) return NaN;
  let sum = 0;
  for (let i = 0; i < a.data.length; i++) {
    sum += Math.abs((a.data[i] ?? 0) - (b.data[i] ?? 0));
  }
  return sum / a.data.length;
}

const folder = join(frontend, "src/assets/projects");
const FORMS = ["today", "lossless WebP", "lossless PNG", "q90 WebP"];
/** @type {Record<string, number>} */
const totals = Object.fromEntries(FORMS.map((f) => [f, 0]));
/** @type {Record<string, { sum: number, n: number }>} */
const errorSums = Object.fromEntries(FORMS.map((f) => [f, { sum: 0, n: 0 }]));
/** @type {Record<string, { sum: number, n: number }>} */
const widestSums = Object.fromEntries(FORMS.map((f) => [f, { sum: 0, n: 0 }]));
const summary = [
  "image\tsize today\tform\tsize\tKiB\tof today\tmean error\tworst width\tworst error",
];
const widthRows = ["image\tform\twidth\tchange before AVIF\terror"];

for (const name of readdirSync(folder).sort()) {
  const widths = USES[name];
  if (!widths) continue;
  const original = readFileSync(join(folder, name));
  const decoded = await sharp(original)
    .rotate()
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const capture = {
    data: decoded.data,
    width: decoded.info.width,
    height: decoded.info.height,
  };
  const cap = Math.min(capture.width, Math.max(...widths));
  const capped = await reference(capture, cap);
  const asRaw = () =>
    sharp(capped.data, {
      raw: { width: capped.width, height: capped.height, channels: 3 },
    });
  /** @type {Record<string, Buffer>} */
  const forms = {
    today: original,
    "lossless WebP": await asRaw()
      .webp({ lossless: true, effort: 6 })
      .toBuffer(),
    // No `effort` or `quality`: either turns sharp's PNG into a 256-colour
    // palette, which is lossy.
    "lossless PNG": await asRaw()
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toBuffer(),
    "q90 WebP": await sharp(capture.data, {
      raw: { width: capture.width, height: capture.height, channels: 3 },
    })
      .webp({ quality: 90, effort: 6 })
      .toBuffer(),
  };
  // The reference at each size a form is served at. A capped copy can round
  // a side to one pixel more than the capture does (Spider Solitaire's 797
  // rows, against 796.6), so each is made at the served size exactly.
  /** @type {Map<string, Pixels>} */
  const refs = new Map();
  /**
   * Returns the reference at exactly a served image's size.
   * @param {Pixels} pixels
   * @returns {Promise<Pixels>}
   */
  const referenceFor = async (pixels) => {
    const key = `${pixels.width}x${pixels.height}`;
    const cached = refs.get(key);
    if (cached) return cached;
    const made = await reference(capture, pixels.width, pixels.height);
    refs.set(key, made);
    return made;
  };
  for (const form of FORMS) {
    const bytes = forms[form] ?? original;
    const meta = await sharp(bytes).metadata();
    let sum = 0;
    let worst = { width: 0, error: -1 };
    for (const w of widths) {
      const pixels = await served(bytes, w);
      const ref = await referenceFor(pixels);
      const before = meanChange(ref, pixels);
      const error = meanChange(ref, await throughAvif(pixels));
      sum += error;
      if (error > worst.error) worst = { width: w, error };
      widthRows.push(
        [name, form, w, before.toFixed(2), error.toFixed(2)].join("\t"),
      );
      if (w === Math.max(...widths)) {
        const s = widestSums[form];
        if (s) {
          s.sum += error;
          s.n++;
        }
      }
    }
    const mean = sum / widths.length;
    totals[form] = (totals[form] ?? 0) + bytes.length;
    const e = errorSums[form];
    if (e) {
      e.sum += mean;
      e.n++;
    }
    summary.push(
      [
        name,
        `${capture.width}x${capture.height}`,
        form,
        `${meta.width}x${meta.height}`,
        (bytes.length / 1024).toFixed(1),
        `${((100 * bytes.length) / original.length).toFixed(0)}%`,
        mean.toFixed(2),
        worst.width,
        worst.error.toFixed(2),
      ].join("\t"),
    );
  }
}
summary.push("");
summary.push(
  "the 8 screenshots as\tKiB\tof today\tmean error, every width\tmean error, the widest width",
);
for (const form of FORMS) {
  const e = errorSums[form] ?? { sum: 0, n: 1 };
  const w = widestSums[form] ?? { sum: 0, n: 1 };
  summary.push(
    [
      form,
      ((totals[form] ?? 0) / 1024).toFixed(1),
      `${((100 * (totals[form] ?? 0)) / (totals.today ?? 1)).toFixed(0)}%`,
      (e.sum / e.n).toFixed(2),
      (w.sum / w.n).toFixed(2),
    ].join("\t"),
  );
}
summary.push("");
summary.push(
  `sharp ${sharp.versions.sharp}, libvips ${sharp.versions.vips}, libwebp ${sharp.versions.webp ?? "?"}`,
);
writeFileSync(outFile, summary.join("\n") + "\n");
writeFileSync(widthsFile, widthRows.join("\n") + "\n");
console.log(summary.join("\n"));
