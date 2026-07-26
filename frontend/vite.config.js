import { defineConfig } from "vite";
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

function getCommitHash() {
  if (process.env.GITHUB_SHA) {
    return process.env.GITHUB_SHA.slice(0, 7);
  }
  if (process.env.COMMIT_SHA) {
    return process.env.COMMIT_SHA.slice(0, 7);
  }
  try {
    return execSync("git rev-parse --short HEAD").toString().trim();
  } catch {
    return "dev";
  }
}

const commitHash = getCommitHash();
const buildTime = new Date().toISOString();
const buildInfo = {
  version: "0.0.1",
  commit: commitHash,
  buildTime: buildTime,
};

function versionJsonPlugin() {
  return {
    name: "generate-version-json",
    writeBundle(options) {
      const outDir = options.dir || "dist";
      const filePath = path.join(outDir, "version.json");
      fs.writeFileSync(filePath, JSON.stringify(buildInfo, null, 2));
    },
  };
}

export default defineConfig({
  base: "./",
  define: {
    __BUILD_INFO__: JSON.stringify(buildInfo),
  },
  plugins: [versionJsonPlugin()],
  server: {
    port: 9000,
    open: true,
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
});

