import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import fs from "node:fs";
import path from "node:path";
import { buildInfo } from "./tools/build-info.mjs";
import { readManifest } from "./tools/games.mjs";

const site = "https://fuzzley.info";

// Set only by the GitHub Pages workflow in fuzzley.github.io. That copy of the
// site leaves the games out and links to them on fuzzley.info instead. Unset,
// as in the Docker build and local builds, the games ship as usual.
const playOrigin = process.env.PLAY_ORIGIN
  ? new URL(process.env.PLAY_ORIGIN).origin
  : "";

// The games are prebuilt pages fetched into public/ (see games.json), so
// Astro does not know about them. List them in the sitemap by hand, from the
// manifest: they aren't on disk until fetched, and never with PLAY_ORIGIN set.
const playPages = Object.keys(readManifest()).map(
  (slug) => `${site}/projects/${slug}/play/`,
);

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

// With PLAY_ORIGIN set, deletes the fetched games from dist/. Only their play/
// folders go: dist/projects/<slug>/ itself is the site's own project page.
function omitGames() {
  return {
    name: "omit-games",
    hooks: {
      "astro:build:done": ({ dir, logger }) => {
        if (!playOrigin) return;
        for (const slug of Object.keys(readManifest())) {
          fs.rmSync(new URL(`projects/${slug}/play/`, dir), {
            recursive: true,
            force: true,
          });
        }
        logger.info(`Left the games out; play links go to ${playOrigin}.`);
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

// Serves a folder's index.html in public/ at the folder's address, as nginx
// does, so the fetched games play at /projects/<slug>/play/ in `astro dev`,
// which otherwise answers 404 there.
function servePublicIndexes() {
  return {
    name: "serve-public-indexes",
    apply: "serve",
    configureServer(server) {
      const { publicDir } = server.config;
      server.middlewares.use((req, _res, next) => {
        const url = new URL(req.url ?? "/", "http://localhost");
        const index = path.join(
          publicDir,
          decodeURIComponent(url.pathname),
          "index.html",
        );
        if (url.pathname.endsWith("/") && fs.existsSync(index)) {
          req.url = `${url.pathname}index.html${url.search}`;
        }
        next();
      });
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
    omitGames(),
    placeholderReport(),
  ],
  server: {
    port: 9000,
  },
  vite: {
    plugins: [servePublicIndexes()],
    define: {
      __BUILD_INFO__: JSON.stringify(buildInfo),
      __PLAY_ORIGIN__: JSON.stringify(playOrigin),
    },
  },
});
