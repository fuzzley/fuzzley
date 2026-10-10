// Build metadata, shared by astro.config.mjs (which writes version.json) and
// the pages (the footer and the build-version meta tag).

import { execSync } from "node:child_process";
import fs from "node:fs";

const pkg = JSON.parse(
  fs.readFileSync(new URL("../package.json", import.meta.url), "utf8"),
);

// COMMIT_SHA comes first: the Docker build passes it in, and the GitHub Pages
// workflow sets it, because that workflow runs in fuzzley.github.io and its
// GITHUB_SHA names a commit in the wrong repository.
function commitHash() {
  if (process.env.COMMIT_SHA) {
    return process.env.COMMIT_SHA.slice(0, 7);
  }
  try {
    return execSync("git rev-parse --short HEAD", {
      stdio: ["ignore", "pipe", "ignore"],
    })
      .toString()
      .trim();
  } catch {
    // Not a git checkout, e.g. inside the Docker build.
  }
  if (process.env.GITHUB_SHA) {
    return process.env.GITHUB_SHA.slice(0, 7);
  }
  return "dev";
}

export const buildInfo = {
  version: pkg.version,
  commit: commitHash(),
  buildTime: new Date().toISOString(),
};
