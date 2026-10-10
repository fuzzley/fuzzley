import { defineCollection } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";

const yearMonth = z.string().regex(/^\d{4}-\d{2}$/, "Use YYYY-MM");

// One Markdown file per project. The file name is the slug: it sets both the
// project page (/projects/<slug>/) and the game (/projects/<slug>/play/), so
// it must match the folder in public/projects/.
const projects = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      // Position in grids and lists, lowest first.
      order: z.number().int(),
      // The game's slot in the home page grid: 1 and 4 are wide previews,
      // 2 and 3 small tiles. Leave it out to keep a game off that grid; the
      // featured game (the lowest `order`) has its own tile.
      homeSlot: z.number().int().min(1).max(4).optional(),
      started: z.number().int(),
      status: z.enum(["active", "finished"]),
      kind: z.enum(["card-game", "arcade", "prototype"]),
      // A few words for small tiles.
      tagline: z.string().max(48),
      // One or two sentences for cards, meta descriptions and link previews.
      summary: z.string().max(200),
      stack: z.array(z.string()).min(1),
      repo: z.url(),
      playLabel: z.string().default("Play"),
      // The game's own background color, used behind its tile.
      tint: z.string().regex(/^#[0-9a-f]{6}$/i),
      cover: image(),
      coverAlt: z.string().min(1),
      gallery: z
        .array(
          z.object({
            image: image(),
            alt: z.string().min(1),
            caption: z.string(),
          }),
        )
        .default([]),
    }),
});

// Work history, keyed by a short id. Highlights that start with "TODO" are
// placeholders: `yarn dev` shows them, production builds hide them.
const experience = defineCollection({
  loader: file("./src/content/experience.yaml"),
  schema: z.object({
    org: z.string(),
    role: z.string(),
    start: yearMonth,
    // Leave out for a current role.
    end: yearMonth.optional(),
    focus: z.string(),
    highlights: z.array(z.string()).default([]),
  }),
});

export const collections = { projects, experience };
