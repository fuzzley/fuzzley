import { readFile } from "node:fs/promises";
import { defineCollection } from "astro:content";
import { imageMetadata } from "astro/assets/utils";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";
import {
  COVER_MAX_WIDTH,
  COVER_RATIOS,
  GALLERY_MAX_WIDTH,
  GALLERY_RATIO,
  RATIO_TOLERANCE,
} from "./lib/image-widths";

const yearMonth = z.string().regex(/^\d{4}-\d{2}$/, "Use YYYY-MM");

const projectsDir = new URL("./content/projects/", import.meta.url);

type Screenshot = { width: number; height: number; format: string };

/**
 * A screenshot's form and size. `image()` is typed as giving them, but the
 * content layer gives the schema the path a project file names, marked for
 * Astro to resolve later, so this reads the file. "elsewhere" for a path that
 * isn't relative to the project file, which it can't follow, and undefined
 * for a relative one that names no file, which Astro reports itself.
 */
async function screenshotMetadata(
  img: Screenshot | string,
): Promise<Screenshot | "elsewhere" | undefined> {
  if (typeof img !== "string") return img;
  const relative = img.replace(/^__ASTRO_IMAGE_/, "");
  if (!/^\.\.?\//.test(relative)) return "elsewhere";
  let bytes;
  try {
    bytes = await readFile(new URL(relative, projectsDir));
  } catch {
    return undefined;
  }
  return imageMetadata(bytes, relative);
}

// One Markdown file per project. The file name is the slug: it sets both the
// project page (/projects/<slug>/) and the game (/projects/<slug>/play/), so
// it must match the game's key in games.json, unless the game is played on
// another site (`playUrl`).
const projects = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/projects" }),
  schema: ({ image }) => {
    // A screenshot is committed as WebP, no wider than the widest copy the
    // site serves of it, since every version stays in history for good, and in
    // a shape its spaces draw well.
    const screenshot = (maxWidth: number, minRatio: number, maxRatio: number) =>
      image().superRefine(async (value, ctx) => {
        const img = await screenshotMetadata(value);
        const failed = (message: string) =>
          ctx.addIssue({ code: "custom", message });
        if (img === "elsewhere") {
          failed(
            "Name a screenshot by its path from the project file, as ../../assets/projects/<name>.webp",
          );
          return;
        }
        if (!img) return;
        const ratio = img.width / img.height;
        if (img.format !== "webp") {
          failed("Write screenshots with yarn screenshot, as WebP");
        }
        if (img.width > maxWidth) {
          failed(
            `Write screenshots with yarn screenshot: at most ${maxWidth} px wide here`,
          );
        }
        if (
          ratio < minRatio * (1 - RATIO_TOLERANCE) ||
          ratio > maxRatio * (1 + RATIO_TOLERANCE)
        ) {
          failed("A cover is 4:3 to 16:10, and a gallery image 16:9");
        }
      });
    return z.object({
      title: z.string(),
      // Position in grids and lists, lowest first.
      order: z.number().int(),
      // The game's slot in the home page grid: 1 and 2 are small tiles, 3
      // and 4 wide previews. Leave it out to keep a game off that grid; the
      // featured project (the lowest `order`) has its own tile.
      homeSlot: z.number().int().min(1).max(4).optional(),
      started: z.number().int(),
      status: z.enum(["active", "finished"]),
      kind: z.enum(["card-game", "arcade", "website"]),
      // A few words for small tiles.
      tagline: z.string().max(48),
      // One or two sentences for cards, meta descriptions and link previews.
      summary: z.string().max(200),
      stack: z.array(z.string()).min(1),
      repo: z.url(),
      // Where the game is played, when that is another site rather than this
      // one. Such a game has no entry in games.json, and nothing here but its
      // project page: its old addresses answer 404. A website's own address
      // goes here too.
      playUrl: z.url().optional(),
      playLabel: z.string().default("Play"),
      // The game's own background color, used behind its tile: the color
      // along its cover's bottom edge, which `yarn screenshot` prints, since a
      // tile taller than its cover shows the tint below it.
      tint: z.string().regex(/^#[0-9a-f]{6}$/i),
      cover: screenshot(COVER_MAX_WIDTH, COVER_RATIOS.min, COVER_RATIOS.max),
      coverAlt: z.string().min(1),
      gallery: z
        .array(
          z.object({
            image: screenshot(GALLERY_MAX_WIDTH, GALLERY_RATIO, GALLERY_RATIO),
            alt: z.string().min(1),
            caption: z.string(),
          }),
        )
        .default([]),
    });
  },
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
