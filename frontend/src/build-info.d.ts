// Replaced at build time through Vite's `define` in astro.config.mjs.
declare const __BUILD_INFO__: {
  version: string;
  commit: string;
  buildTime: string;
};

// The site the games are linked on, such as "https://fuzzley.info", or "" when
// this build carries the games itself. See PLAY_ORIGIN in astro.config.mjs.
declare const __PLAY_ORIGIN__: string;
