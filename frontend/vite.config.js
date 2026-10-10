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

function shouldRedirectProjectLinks(command, mode) {
  if (process.env.REDIRECT_PROJECT_LINKS !== undefined) {
    return (
      process.env.REDIRECT_PROJECT_LINKS === "true" ||
      process.env.REDIRECT_PROJECT_LINKS === "1"
    );
  }
  if (process.env.VITE_REDIRECT_PROJECTS !== undefined) {
    return (
      process.env.VITE_REDIRECT_PROJECTS === "true" ||
      process.env.VITE_REDIRECT_PROJECTS === "1"
    );
  }
  if (command === "serve" || mode === "development" || mode === "local") {
    return false;
  }
  if (mode === "deploy") {
    return true;
  }
  const isCI = Boolean(process.env.CI || process.env.GITHUB_ACTIONS);
  const hasDeploySha = Boolean(
    process.env.COMMIT_SHA || process.env.GITHUB_SHA,
  );
  return isCI || hasDeploySha;
}

function redirectProjectLinksPlugin(shouldRedirect) {
  return {
    name: "redirect-project-links",
    transformIndexHtml(html) {
      if (!shouldRedirect) {
        return html;
      }
      return html
        .replaceAll('href="./project/', 'href="https://fuzzley.info/project/')
        .replaceAll('href="project/', 'href="https://fuzzley.info/project/');
    },
  };
}

export default defineConfig(({ command, mode }) => {
  const redirectProjects = shouldRedirectProjectLinks(command, mode);

  return {
    base: "./",
    define: {
      __BUILD_INFO__: JSON.stringify(buildInfo),
    },
    plugins: [
      versionJsonPlugin(),
      redirectProjectLinksPlugin(redirectProjects),
    ],
    server: {
      port: 9000,
      open: true,
    },
    build: {
      outDir: "dist",
      assetsDir: "assets",
    },
  };
});
