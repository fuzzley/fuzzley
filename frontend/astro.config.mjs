import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import fs from "node:fs";
import { buildInfo } from "./tools/build-info.mjs";

const site = "https://fuzzley.info";

// The games are prebuilt pages copied from public/, so Astro does not know
// about them. List them in the sitemap by hand.
const playPages = fs
  .readdirSync(new URL("./public/projects/", import.meta.url), {
    withFileTypes: true,
  })
  .filter((entry) => entry.isDirectory())
  .map((entry) => `${site}/projects/${entry.name}/play/`);

// Writes dist/version.json, which nginx serves uncached.
function versionJson() {
  return {
    name: "version-json",
    hooks: {
      "astro:build:done": ({ dir }) => {
        fs.writeFileSync(
          new URL("version.json", dir),
          JSON.stringify(buildInfo, null, 2),
        );
      },
    },
  };
}

// Production builds hide highlights that still start with "TODO" (see
// src/lib/highlights.ts). Say so, so a placeholder is never forgotten.
function placeholderReport() {
  return {
    name: "placeholder-report",
    hooks: {
      "astro:build:done": ({ logger }) => {
        const text = fs.readFileSync(
          new URL("./src/content/experience.yaml", import.meta.url),
          "utf8",
        );
        const count = (text.match(/^\s*-\s*["']?TODO\b/gm) ?? []).length;
        if (count > 0) {
          logger.warn(
            `${count} placeholder highlight(s) in src/content/experience.yaml are hidden from this build.`,
          );
        }
      },
    },
  };
}

export default defineConfig({
  site,
  trailingSlash: "ignore",
  build: {
    format: "directory",
  },
  integrations: [
    sitemap({
      // The /project/<slug>/ pages only redirect to the games.
      filter: (page) => !page.includes("/project/"),
      customPages: playPages,
    }),
    versionJson(),
    placeholderReport(),
  ],
  server: {
    port: 9000,
  },
  vite: {
    define: {
      __BUILD_INFO__: JSON.stringify(buildInfo),
    },
  },
});
