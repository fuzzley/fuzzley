// The games' builds, as pinned in games.json. Shared by fetch-games.mjs,
// update-games.mjs and astro.config.mjs.
//
// Each game repository uploads every production build to its site-build
// release as <slug>-<short sha>.tar.gz, and replaces latest.json there, which
// names the newest archive. games.json pins one archive per game:
//
//   "pong": {
//     "repo": "fuzzley/fPong",
//     "commit": "<the commit it was built from>",
//     "asset": "pong-76b68ce.tar.gz",
//     "sha256": "<the archive's SHA-256>"
//   }

import fs from "node:fs";

/** The release each game repository uploads its builds to. */
export const RELEASE_TAG = "site-build";

const manifestFile = new URL("../games.json", import.meta.url);

/** @typedef {{repo: string, commit: string, asset: string, sha256: string}} Game */

const patterns = {
  repo: /^[\w.-]+\/[\w.-]+$/,
  commit: /^[0-9a-f]{40}$/,
  asset: /^[\w.-]+\.tar\.gz$/,
  sha256: /^[0-9a-f]{64}$/,
};

/**
 * Throws unless a games.json entry, or a latest.json, has every field in the
 * expected form.
 *
 * @param {string} name What to call it in the error.
 * @param {unknown} game
 * @returns {Game}
 */
export function checkGame(name, game) {
  for (const [field, pattern] of Object.entries(patterns)) {
    const value = /** @type {Record<string, unknown>} */ (game)?.[field];
    if (typeof value !== "string" || !pattern.test(value)) {
      throw new Error(`${name}: "${field}" is missing or malformed.`);
    }
  }
  return /** @type {Game} */ (game);
}

/**
 * The pinned games, by slug.
 *
 * @returns {Record<string, Game>}
 */
export function readManifest() {
  const manifest = JSON.parse(fs.readFileSync(manifestFile, "utf8"));
  for (const [slug, game] of Object.entries(manifest)) {
    checkGame(`games.json: ${slug}`, game);
  }
  return manifest;
}

/** @param {Record<string, Game>} manifest */
export function writeManifest(manifest) {
  fs.writeFileSync(manifestFile, `${JSON.stringify(manifest, null, 2)}\n`);
}

/**
 * A file on a game repository's site-build release. These download URLs
 * don't count against GitHub's API rate limit.
 *
 * @param {string} repo Such as "fuzzley/fPong".
 * @param {string} file Such as "latest.json".
 */
export function releaseUrl(repo, file) {
  return `https://github.com/${repo}/releases/download/${RELEASE_TAG}/${file}`;
}
