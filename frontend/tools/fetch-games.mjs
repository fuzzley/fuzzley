// Fetches the games pinned in games.json into public/projects/<slug>/play/.
//
// Each game is built and released by its own repository (see games.mjs).
// This downloads each pinned archive once, keeps it in
// node_modules/.cache/games/, checks its SHA-256, and unpacks it in place of
// whatever was in the game's folder. A game whose installed copy already
// matches its pin is left alone, so running this again is quick, and a game
// games.json no longer pins is deleted.
//
//   node tools/fetch-games.mjs [--optional] [--force]
//
//   --optional  Warn instead of failing when a game can't be fetched, so
//               `yarn dev` still starts offline.
//   --force     Download and unpack every game again.
//
// `yarn dev` and `yarn build` run it first. A build with PLAY_ORIGIN set
// leaves the games out, so then it does nothing.

import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { setTimeout as sleep } from "node:timers/promises";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import * as tar from "tar";
import { readManifest, releaseUrl } from "./games.mjs";

const frontendDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const projectsDir = path.join(frontendDir, "public", "projects");
const cacheDir = path.join(frontendDir, "node_modules", ".cache", "games");
// Which archive is unpacked in each game's folder, by slug.
const installedFile = path.join(cacheDir, "installed.json");

// A release's files can answer 404 for a little while after they are
// uploaded, so a 404 is tried again as well as a network error or a 5xx,
// for about half a minute in all.
const RETRY_DELAYS_MS = [1000, 2000, 4000, 8000, 16000];

const { values: options } = parseArgs({
  options: {
    optional: { type: "boolean" },
    force: { type: "boolean" },
  },
});

function log(message) {
  console.log(`fetch-games: ${message}`);
}

function readInstalled() {
  try {
    return JSON.parse(fs.readFileSync(installedFile, "utf8"));
  } catch {
    return {};
  }
}

const sha256 = (data) => createHash("sha256").update(data).digest("hex");

/** Downloads a file, trying again when that might help. */
async function download(url) {
  for (let attempt = 0; ; attempt++) {
    let failure;
    let retry = true;
    try {
      const response = await fetch(url);
      if (response.ok) return Buffer.from(await response.arrayBuffer());
      failure = `HTTP ${response.status}`;
      // Any other 4xx won't change by asking again.
      retry = response.status === 404 || response.status >= 500;
    } catch (error) {
      failure = error.message;
    }
    if (!retry || attempt === RETRY_DELAYS_MS.length) throw new Error(failure);
    await sleep(RETRY_DELAYS_MS[attempt]);
  }
}

/** Returns the path of the pinned archive, downloading it if needed. */
async function archiveFor(game) {
  const file = path.join(cacheDir, `${game.sha256}.tar.gz`);
  if (fs.existsSync(file) && sha256(fs.readFileSync(file)) === game.sha256) {
    return file;
  }
  const url = releaseUrl(game.repo, game.asset);
  let data;
  try {
    data = await download(url);
  } catch (error) {
    throw new Error(`couldn't download ${url}: ${error.message}`, {
      cause: error,
    });
  }
  const actual = sha256(data);
  if (actual !== game.sha256) {
    throw new Error(
      `${url} has SHA-256 ${actual}, but games.json pins ${game.sha256}.`,
    );
  }
  fs.mkdirSync(cacheDir, { recursive: true });
  fs.writeFileSync(file, data);
  return file;
}

async function install(slug, game) {
  const playDir = path.join(projectsDir, slug, "play");
  const file = await archiveFor(game);
  fs.rmSync(playDir, { recursive: true, force: true });
  fs.mkdirSync(playDir, { recursive: true });
  await tar.x({ file, cwd: playDir, strict: true });
  if (!fs.existsSync(path.join(playDir, "index.html"))) {
    throw new Error(`${game.asset} has no index.html at its top level.`);
  }
}

// Deletes each game games.json no longer pins, such as one now played on
// another site, whose old address is then a page of this site's own.
function removeUnpinned(manifest, installed) {
  if (!fs.existsSync(projectsDir)) return;
  for (const entry of fs.readdirSync(projectsDir, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name in manifest) continue;
    fs.rmSync(path.join(projectsDir, entry.name), {
      recursive: true,
      force: true,
    });
    delete installed[entry.name];
    log(`removed ${entry.name}, which games.json no longer pins`);
  }
}

async function main() {
  const manifest = readManifest();
  const installed = options.force ? {} : readInstalled();
  removeUnpinned(manifest, installed);

  if (process.env.PLAY_ORIGIN) {
    log("PLAY_ORIGIN is set, so this build has no games to fetch");
    return;
  }

  const failures = [];

  for (const [slug, game] of Object.entries(manifest)) {
    const playDir = path.join(projectsDir, slug, "play");
    const name = `${slug} (${game.asset})`;
    if (
      installed[slug] === game.sha256 &&
      fs.existsSync(path.join(playDir, "index.html"))
    ) {
      log(`${name} is up to date`);
      continue;
    }
    try {
      await install(slug, game);
      installed[slug] = game.sha256;
      log(`installed ${name}`);
    } catch (error) {
      delete installed[slug];
      failures.push(`${slug}: ${error.message}`);
    }
  }

  fs.mkdirSync(cacheDir, { recursive: true });
  fs.writeFileSync(installedFile, `${JSON.stringify(installed, null, 2)}\n`);

  if (failures.length === 0) return;
  const report = failures.map((failure) => `  ${failure}`).join("\n");
  if (options.optional) {
    console.warn(`fetch-games: some games are missing:\n${report}`);
    return;
  }
  console.error(`fetch-games: couldn't fetch every game:\n${report}`);
  process.exitCode = 1;
}

await main();
