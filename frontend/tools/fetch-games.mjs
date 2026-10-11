// Fetches the games pinned in games.json into public/projects/<slug>/play/.
//
// Each game is built and released by its own repository (see games.mjs).
// This downloads each pinned archive once, keeps it in
// node_modules/.cache/games/, checks its SHA-256, and unpacks it in place of
// whatever was in the game's folder. A game whose installed copy already
// matches its pin is left alone, so running this again is quick.
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

const ATTEMPTS = 3;

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

/** Downloads a file, trying again after a network error or a 5xx. */
async function download(url) {
  for (let attempt = 1; ; attempt++) {
    try {
      const response = await fetch(url);
      if (response.ok) return Buffer.from(await response.arrayBuffer());
      if (response.status < 500 || attempt === ATTEMPTS) {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (error) {
      if (attempt === ATTEMPTS) throw error;
    }
    await sleep(1000 * attempt);
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

async function main() {
  if (process.env.PLAY_ORIGIN) {
    log("PLAY_ORIGIN is set, so this build has no games to fetch");
    return;
  }

  const installed = options.force ? {} : readInstalled();
  const failures = [];

  for (const [slug, game] of Object.entries(readManifest())) {
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
