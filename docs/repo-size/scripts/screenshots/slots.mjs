// Measures how each page fits each screenshot into the space it draws it in:
// how much of the screenshot the space cuts off, and whether the copy the
// browser picks is wide enough for the width it is drawn at.
//
//   node slots.mjs <dist-dir> <chrome-helpers> <out-file> [--shots <dir>] [--sweep]
//
// <dist-dir> is a built site (`yarn build`'s frontend/dist). <chrome-helpers>
// is fuzzley-games' frontend/lib/dev/src/chrome.ts, whose headless Chrome
// this borrows. It serves the build itself, opens every page with a
// screenshot at each of VIEWPORTS, makes every image load at once, and
// writes a row for each image to <out-file>. With --shots, it also writes a
// PNG of each space into <dir>, at one pixel to a CSS pixel, for a person to
// look at. With --sweep, it opens the home page and a project page at every
// window width from 896 px, where the wide layout starts, to 1366, at one
// device pixel to a CSS pixel, instead.
//
// It reads where the image is drawn from the page's own styles: with
// `object-fit: cover` from the top left, as the site draws today, the
// screenshot fills its space and loses its right or its bottom; otherwise it
// is drawn at its own box, and what the space doesn't hold is cut.
import { createServer } from "node:http";
import { mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { extname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { parseArgs } from "node:util";

const { positionals, values } = parseArgs({
  allowPositionals: true,
  options: {
    shots: { type: "string" },
    sweep: { type: "boolean", default: false },
  },
});
const [distArg, helpersArg, outFile] = positionals;
const shotsDir = values.shots;
if (!distArg || !helpersArg || !outFile) {
  console.error(
    "usage: slots.mjs <dist-dir> <chrome-helpers> <out-file> [--shots <dir>] [--sweep]",
  );
  process.exit(2);
}
const dist = resolve(distArg);
/** @type {typeof import("../../../../../fuzzley-games/frontend/lib/dev/src/chrome.ts")} */
const { withChrome, withPage } = await import(
  pathToFileURL(resolve(helpersArg)).href
);

/** @type {{ name: string, width: number, height: number, deviceScaleFactor: number }[]} */
const SCREENS = [
  { name: "desktop 2560", width: 2560, height: 1440, deviceScaleFactor: 1 },
  { name: "desktop 1920", width: 1920, height: 1080, deviceScaleFactor: 1 },
  { name: "laptop 1440 @2", width: 1440, height: 900, deviceScaleFactor: 2 },
  { name: "laptop 1280", width: 1280, height: 800, deviceScaleFactor: 1 },
  { name: "window 900", width: 900, height: 900, deviceScaleFactor: 1 },
  { name: "tablet 1024 @2", width: 1024, height: 768, deviceScaleFactor: 2 },
  { name: "tablet 820 @2", width: 820, height: 1180, deviceScaleFactor: 2 },
  { name: "phone 390 @3", width: 390, height: 844, deviceScaleFactor: 3 },
  { name: "phone 360 @3", width: 360, height: 800, deviceScaleFactor: 3 },
];
const ALL_PAGES = [
  "/",
  "/projects/",
  "/projects/fuzzley-games/",
  "/projects/solitaire/",
  "/projects/minesweeper/",
  "/projects/pong/",
  "/projects/spider/",
  "/404.html",
];
const SWEEP_WIDTHS = [
  896, 920, 960, 1000, 1024, 1080, 1120, 1180, 1240, 1280, 1366,
];
const VIEWPORTS = values.sweep
  ? SWEEP_WIDTHS.map((width) => ({
      name: `window ${width}`,
      width,
      height: 900,
      deviceScaleFactor: 1,
    }))
  : SCREENS;
const PAGES = values.sweep ? ["/", "/projects/solitaire/"] : ALL_PAGES;

/** @type {Record<string, string>} */
const TYPES = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".txt": "text/plain",
  ".xml": "application/xml",
};
const server = createServer((req, res) => {
  const path = decodeURIComponent(new URL(req.url ?? "/", "http://x").pathname);
  let file = join(dist, path);
  if (!file.startsWith(dist)) {
    res.writeHead(403).end();
    return;
  }
  try {
    if (statSync(file).isDirectory()) file = join(file, "index.html");
    res.writeHead(200, {
      "content-type": TYPES[extname(file)] ?? "application/octet-stream",
    });
    res.end(readFileSync(file));
  } catch {
    res.writeHead(404).end();
  }
});
await new Promise((done) =>
  server.listen(0, "127.0.0.1", () => done(undefined)),
);
const address = server.address();
const origin = `http://127.0.0.1:${typeof address === "object" && address ? address.port : 0}`;

/**
 * A screenshot as a page draws it: its space's box, and the box the whole
 * image is drawn at, before the space cuts it, in CSS pixels from the page's
 * top left.
 * @typedef {{ space: string, image: string, left: number, top: number, width: number,
 *   height: number, drawnLeft: number, drawnTop: number, drawnWidth: number,
 *   drawnHeight: number, naturalWidth: number, naturalHeight: number, chosen: number,
 *   widest: number }} Drawn
 */

/**
 * Returns every screenshot the page draws, once each has loaded, with the
 * space it is drawn in. Runs in the page.
 * @returns {Promise<Drawn[]>}
 */
async function drawn() {
  const images = [...document.querySelectorAll(".tile-media img")];
  for (const img of images) img.setAttribute("loading", "eager");
  await Promise.all(images.map((img) => img.decode().catch(() => undefined)));
  const spaces = [
    ["feature", ".feature"],
    ["wide tile", ".game--wide"],
    ["small tile", ".game"],
    ["card", ".card-media"],
    ["cover", ".cover"],
    ["gallery", ".shot"],
  ];
  return images.map((img) => {
    const space =
      spaces.find(([, selector]) => img.closest(selector))?.[0] ?? "?";
    const where = img.closest("section.more") ? " (more)" : "";
    const box = (img.closest("picture") ?? img).getBoundingClientRect();
    const own = img.getBoundingClientRect();
    // object-fit: cover scales the image to the larger of the two ratios,
    // from the top left; otherwise it is drawn at its own box.
    const scale =
      getComputedStyle(img).objectFit === "cover"
        ? Math.max(own.width / img.naturalWidth, own.height / img.naturalHeight)
        : own.width / img.naturalWidth;
    // A copy's width, from its srcset entry: naturalWidth is in CSS pixels.
    const candidates = [
      ...(img.closest("picture")?.querySelectorAll("source, img") ?? []),
    ]
      .flatMap((el) => (el.getAttribute("srcset") ?? "").split(","))
      .map((c) => {
        const [url = "", w = ""] = c.trim().split(/\s+/);
        return {
          url: new URL(url, location.href).href,
          width: Number(w.replace("w", "")),
        };
      });
    const chosen =
      candidates.find((c) => c.url === img.currentSrc)?.width ?? NaN;
    const file = new URL(img.currentSrc).pathname.split("/").pop() ?? "";
    return {
      space: space + where,
      image: file.split(".")[0] ?? file,
      left: box.left + window.scrollX,
      top: box.top + window.scrollY,
      width: box.width,
      height: box.height,
      drawnLeft: own.left + window.scrollX,
      drawnTop: own.top + window.scrollY,
      drawnWidth: img.naturalWidth * scale,
      drawnHeight: img.naturalHeight * scale,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      chosen,
      widest: Math.max(...candidates.map((c) => c.width)),
    };
  });
}

const header = [
  "viewport",
  "page",
  "space",
  "image",
  "space w x h",
  "space aspect",
  "image aspect",
  "shown wide",
  "shown high",
  "tint shown",
  "copy w",
  "needed w",
  "widest w",
  "enlarged",
];
const rows = [header.join("\t")];
await withChrome(
  { name: "fuzzley-slots", pagesAtOnce: 1 },
  async (devtools) => {
    for (const viewport of VIEWPORTS) {
      await withPage(devtools, viewport, async (page) => {
        for (const path of PAGES) {
          await page.navigate(origin + path);
          const images = await page.evaluate(drawn);
          for (const [i, d] of images.entries()) {
            const imageAspect = d.naturalWidth / d.naturalHeight;
            const spaceAspect = d.width / d.height;
            const shownWide =
              Math.min(d.left + d.width, d.drawnLeft + d.drawnWidth) -
              Math.max(d.left, d.drawnLeft);
            const shownHigh =
              Math.min(d.top + d.height, d.drawnTop + d.drawnHeight) -
              Math.max(d.top, d.drawnTop);
            // The share of the space the image leaves to the tile's own color.
            const tint = 1 - (shownWide * shownHigh) / (d.width * d.height);
            // The image's width in device pixels, as drawn, before the space cuts it.
            const needed = d.drawnWidth * viewport.deviceScaleFactor;
            rows.push(
              [
                viewport.name,
                path,
                d.space,
                d.image,
                `${d.width.toFixed(0)}x${d.height.toFixed(0)}`,
                spaceAspect.toFixed(3),
                imageAspect.toFixed(3),
                `${((100 * shownWide) / d.drawnWidth).toFixed(0)}%`,
                `${((100 * shownHigh) / d.drawnHeight).toFixed(0)}%`,
                `${(100 * tint).toFixed(0)}%`,
                d.chosen,
                needed.toFixed(0),
                d.widest,
                (needed / d.chosen).toFixed(2),
              ].join("\t"),
            );
            if (shotsDir && d.width > 0) {
              const dir = join(shotsDir, viewport.name.replace(/\W+/g, "-"));
              mkdirSync(dir, { recursive: true });
              const { data } = await page.send("Page.captureScreenshot", {
                format: "png",
                captureBeyondViewport: true,
                clip: {
                  x: d.left,
                  y: d.top,
                  width: d.width,
                  height: d.height,
                  scale: 1 / viewport.deviceScaleFactor,
                },
              });
              const name = `${path.replace(/\W+/g, "-").replace(/^-|-$/g, "") || "home"}-${i}-${d.space.replace(/\W+/g, "-")}-${d.image}.png`;
              writeFileSync(join(dir, name), Buffer.from(data, "base64"));
            }
          }
        }
      });
    }
  },
);
server.close();
writeFileSync(outFile, rows.join("\n") + "\n");
console.log(rows.join("\n"));
