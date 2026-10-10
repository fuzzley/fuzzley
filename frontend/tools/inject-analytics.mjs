// Adds the site's analytics tags to the games in the build output.
//
// The pages under public/projects/<slug>/play/ are production builds pushed in
// by the project repositories (fMinesweeper, fPong, fSolitaire, fSpider, PATH).
// Those repositories deliberately carry no analytics code, so the tags are added
// here instead, after `astro build`, to the copies in dist/ — never to the
// sources in public/, which the next sync from a project repository overwrites.
//
// Run as part of `yarn build`. Safe to re-run: a page that already has the tags
// is left alone.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const frontendDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const distDir = path.join(frontendDir, "dist");
const projectsDir = path.join(distDir, "projects");

// The tags are useless if what they point at is missing, so treat that as a
// build failure rather than shipping pages that quietly 404.
const requiredAssets = ["env.js", "analytics.js"];

const closingHead = /<\/head>/i;

function fail(message) {
  console.error(`inject-analytics: ${message}`);
  process.exit(1);
}

function toPosix(filePath) {
  return filePath.split(path.sep).join("/");
}

function assetsExist() {
  for (const asset of requiredAssets) {
    if (!fs.existsSync(path.join(distDir, asset))) {
      fail(`dist/${asset} is missing — nothing to point the project pages at.`);
    }
  }
}

function findProjectPages() {
  if (!fs.existsSync(projectsDir)) {
    fail("dist/projects not found — run `astro build` first.");
  }

  // Only the games: dist/projects/<slug>/index.html is the site's own project
  // page, which already carries the tags from the base layout.
  const pages = fs
    .readdirSync(projectsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(projectsDir, entry.name, "play", "index.html"))
    .filter((page) => fs.existsSync(page));

  if (pages.length === 0) {
    fail("no index.html found under dist/projects/*/play.");
  }

  return pages;
}

// Relative rather than root-absolute, so a game still finds the tags if the
// site is ever served from a subpath.
function tagsFor(page) {
  const prefix = toPosix(path.relative(path.dirname(page), distDir));
  return (
    `<script src="${prefix}/env.js"></script>` +
    `<script src="${prefix}/analytics.js"></script>`
  );
}

assetsExist();

let instrumented = 0;
let alreadyDone = 0;

// A build with PLAY_ORIGIN set has no games: omitGames in astro.config.mjs
// deletes them, and the site links to them on that origin instead.
if (process.env.PLAY_ORIGIN) {
  console.log("inject-analytics: PLAY_ORIGIN is set, so there are no games");
  process.exit(0);
}

for (const page of findProjectPages()) {
  const name = toPosix(path.relative(distDir, page));
  const html = fs.readFileSync(page, "utf8");

  if (html.includes("analytics.js")) {
    console.log(`inject-analytics: ${name} already instrumented`);
    alreadyDone += 1;
    continue;
  } //else

  if (!closingHead.test(html)) {
    fail(`${name} has no </head>, so its analytics tags cannot be placed.`);
  }

  const tags = tagsFor(page);
  fs.writeFileSync(
    page,
    html.replace(closingHead, (head) => tags + head),
  );
  console.log(`inject-analytics: instrumented ${name}`);
  instrumented += 1;
}

console.log(
  `inject-analytics: ${instrumented} page(s) instrumented, ` +
    `${alreadyDone} already done`,
);
