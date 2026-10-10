import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import astro from "eslint-plugin-astro";

export default [
  {
    ignores: ["dist/**", "node_modules/**", "public/**", ".astro/**"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    files: ["**/*.astro"],
    languageOptions: {
      globals: {
        // Replaced at build time through Vite's `define`.
        __BUILD_INFO__: "readonly",
      },
    },
  },
  {
    // Build tooling that runs in Node rather than the browser.
    files: ["astro.config.mjs", "eslint.config.js", "tools/**/*.mjs"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
];
