// Moves each game's pin in games.json to the newest build on its site-build
// release, as named by that release's latest.json (see games.mjs).
//
//   node tools/update-games.mjs
//
// It only edits games.json. The scheduled workflow update-games.yml then
// builds the site and commits. Environment:
//
//   SKIP_ASSETS    Archives not to move to, one per line: those whose update
//                  already failed (the workflow passes the archives named by
//                  open "Game update failed" issues).
//   GITHUB_OUTPUT  Set by GitHub Actions. Gets `changed` (true or false),
//                  `assets` (the new archives, one per line) and `message`
//                  (a commit message).

import { randomUUID } from "node:crypto";
import fs from "node:fs";
import {
  checkGame,
  readManifest,
  releaseUrl,
  writeManifest,
} from "./games.mjs";

const skip = new Set(
  (process.env.SKIP_ASSETS ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean),
);

function log(message) {
  console.log(`update-games: ${message}`);
}

/** The newest build on a repository's release, or null if it has none. */
async function latestBuild(repo) {
  const url = releaseUrl(repo, "latest.json");
  const response = await fetch(url);
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`${url}: HTTP ${response.status}`);
  return checkGame(`${repo}'s latest.json`, {
    repo,
    ...(await response.json()),
  });
}

const short = (commit) => commit.slice(0, 7);

/** Writes a GitHub Actions step output, allowing several lines. */
function output(name, value) {
  if (!process.env.GITHUB_OUTPUT) return;
  const delimiter = `EOF_${randomUUID()}`;
  fs.appendFileSync(
    process.env.GITHUB_OUTPUT,
    `${name}<<${delimiter}\n${value}\n${delimiter}\n`,
  );
}

const manifest = readManifest();
const changes = [];

for (const [slug, game] of Object.entries(manifest)) {
  const latest = await latestBuild(game.repo);
  if (!latest) {
    log(`${slug}: ${game.repo} has no latest.json yet`);
  } else if (latest.asset === game.asset) {
    log(`${slug}: up to date (${game.asset})`);
  } else if (skip.has(latest.asset)) {
    log(`${slug}: skipping ${latest.asset}, whose update already failed`);
  } else {
    log(`${slug}: ${game.asset} -> ${latest.asset}`);
    changes.push({ slug, from: game, to: latest });
    manifest[slug] = {
      repo: latest.repo,
      commit: latest.commit,
      asset: latest.asset,
      sha256: latest.sha256,
    };
  }
}

output("changed", String(changes.length > 0));
if (changes.length > 0) {
  writeManifest(manifest);

  const subject =
    changes.length === 1
      ? `chore(games): update ${changes[0].slug} to ${changes[0].to.repo}@${short(changes[0].to.commit)}`
      : `chore(games): update ${changes.map((c) => c.slug).join(", ")}`;
  const lines = changes.map(
    ({ slug, from, to }) =>
      `- ${slug}: ${to.asset}, ` +
      `https://github.com/${to.repo}/compare/${short(from.commit)}...${short(to.commit)}`,
  );
  output(
    "message",
    [
      subject,
      "",
      ...lines,
      "",
      "Pinned by .github/workflows/update-games.yml after the site built.",
    ].join("\n"),
  );
  output("assets", changes.map(({ to }) => to.asset).join("\n"));
}
