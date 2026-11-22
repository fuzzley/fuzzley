# Repository size: the plan

Written 2026-11-21, against `main` at b45c184, before any change was made.
It follows fuzzley-games' own plan, `docs/repo-size/plan.md` there at
92f00d6b, and borrows its scripts and its runbook where they fit. It plans
three parts, in the order they should be built:

- **Part A: the screenshots.** Every space on the site draws its screenshot
  at its full width, and the site serves copies wide enough for 2× tablets
  and 3× phones. Each screenshot is committed no wider than its widest copy,
  as lossless WebP, and the content schema holds that rule and its shape. A
  retake then adds two thirds of what it adds today.
- **Part B: rewrite fuzzley's history once,** with `git filter-repo`, after A
  has landed. 96% of the history is game builds that the site stopped
  committing on 2026-10-10.
- **Part C: rewrite fuzzley.github.io's history,** the repository that
  publishes the GitHub Pages copy. Its tip is two small files, and its
  history is 137 MiB of old builds.

The user answered its seven decisions on 2026-11-21 (§2). Their answer to D2
asked for high image quality and no odd crops, which reshaped Part A.

What this plan rests on is in two research files beside it. Each has its
scripts in [`scripts/`](scripts/) and its data in [`data/`](data/):

- [`research/screenshots.md`](research/screenshots.md): what the site draws
  each screenshot at, the churn, what each encoding costs and changes, and
  how each space fits its screenshot (§5 and §6 there).
- [`research/history-rewrite.md`](research/history-rewrite.md): dry runs of
  three rewrites on mirrors, what a rewrite breaks, and the Pages
  repository.

Every figure here comes from one of those files, or from
[`scripts/history/08-after-plan.sh`](scripts/history/08-after-plan.sh)'s
output in [`data/history/after-plan.txt`](data/history/after-plan.txt). That
script dry-runs A and B together.

Paths are relative to the repository's root.

---

## 1. Summary

### What changes, and what it buys

fuzzley:

| Point                       | Clone (MiB) | GitHub's figure                | Source                                                                               |
| --------------------------- | ----------: | ------------------------------ | ------------------------------------------------------------------------------------ |
| Today                       |       154.7 | 166,874 KB                     | [`baseline.tsv`](data/history/baseline.tsv), [`github.txt`](data/history/github.txt) |
| After A, no rewrite         |   about 156 | grows by about the same 1.5    | today plus A's 1.54 MiB ([`after-plan.txt`](data/history/after-plan.txt))            |
| After B, if done today (r3) |         2.8 | about 156 MiB, kept as is (D1) | [`scenarios.tsv`](data/history/scenarios.tsv), [`github-after-push.tsv`][gap]        |
| **After A and B**           |    **2.00** | about 156 MiB, kept as is (D1) | [`after-plan.txt`](data/history/after-plan.txt)                                      |

fuzzley.github.io:

| Point       | Mirror (MiB) | GitHub's figure                        | Source                                          |
| ----------- | -----------: | -------------------------------------- | ----------------------------------------------- |
| Today       |       126.41 | 140,846 KB                             | [`pages-repo.txt`](data/history/pages-repo.txt) |
| **After C** |     **0.02** | should fall to almost nothing, in time | [`pages-repo.txt`](data/history/pages-repo.txt) |

The clone figures are a mirror repacked with `gc --aggressive`. A clone as
GitHub sends it today is 163 MiB.

[gap]: data/history/github-after-push.tsv

What each future change adds to history:

| Change                     | Today              | After A     | Source                                                                                     |
| -------------------------- | ------------------ | ----------- | ------------------------------------------------------------------------------------------ |
| Retaking all 8 screenshots | 2.29 MiB (5ab9795) | 1.54 MiB    | [`churn.tsv`](data/screenshots/churn.tsv), [`after-plan.txt`](data/history/after-plan.txt) |
| A Solitaire gallery image  | 241–431 KiB        | 136–192 KiB | [`encodings-plan.tsv`](data/screenshots/encodings-plan.tsv)                                |
| A cover such as Klondike's | 307 KiB            | 239 KiB     | [`encodings-plan.tsv`](data/screenshots/encodings-plan.tsv)                                |
| Update games moving a pin  | under 1 KiB        | the same    | `frontend/games.json`                                                                      |

What visitors get ([`research/screenshots.md`](research/screenshots.md) §5):

| On the site                                   | Today                                                           | After A                                                               |
| --------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------------- |
| A space narrower than its screenshot          | cuts its right side: up to 44% in the home tiles at 896–1180 px | shows its whole width, with the game's own color below                |
| The widest copy a 2× tablet or 3× phone needs | enlarged up to 1.5×, from copies of 640, 800 and 1280           | served, up to 1600, but for Pong's and Minesweeper's smaller captures |
| How close a served copy is to the capture     | today's                                                         | closer at the widest width, 0.11 of a level further on average        |

### The order of work

1. **P0. Commit this plan's folder** to `main` and push it (D7), and make
   the backups (D3).
2. **Part A, the screenshots.**
   - **A1:** one module holds the widths the site serves its screenshots at,
     now reaching 2× tablets and 3× phones, and the components read it.
     Every space draws its screenshot at its full width. The Solitaire
     Collection's tint follows its felt.
   - **A2:** `yarn screenshot` writes a screenshot as lossless WebP, no
     wider than its widest copy. The 8 screenshots are written again with
     it. The three PNGs become WebP, and the content schema fails a
     screenshot of the wrong width, form or shape.
   - **A3:** the rules, in `AGENTS.md` and `DEVELOPMENT.md`.
3. **Part B, fuzzley's history rewrite,** in one session on a day of its
   own, soon after A is live (D5). It runs r3's rule on the day's history,
   pushes `main`, rewrites the hashes the docs and the memory notes name,
   and then clones every local copy again.
4. **Part C, fuzzley.github.io's rewrite,** in the same session (D6). It
   keeps only the two paths at its tip, and pushes `main`.

A1 comes before A2, and A2 before A3. B needs A on `main` and live, since its
rule keeps only what the tip holds. C needs nothing else, and goes on B's day
so that one freeze and one round of backups cover both.

### Why this order

- **A adds little to history,** 1.54 MiB once, so it can go first.
- **A decides what B keeps.** B strips every old version of a site image,
  but keeps the tip's. After A, the tip's screenshots are 1.54 MiB rather
  than 2.31, and B strips today's large ones with the rest.
- **A1 before A2,** because A2's caps follow from A1's widths, and A1's
  checks show the spaces with today's files before A2 changes them.
- **B runs once.** Rewriting before A would leave today's screenshots at the
  tip. A would then turn them into old versions, which only a second rewrite,
  and a second round of cloning every copy again, would remove.
- **C is separate,** but it takes the same care: a backup, a leased push and
  a check that the Pages copy still deploys. So it rides on B's day.

### Who decides what

Most choices are this plan's to make, and §3 makes them so the build need
not stop. Seven were the user's (§2), and all seven are settled.

---

## 2. The user's decisions

Settled on 2026-11-21. Each gives the user's answer, then what the plan does
with it.

**D1. GitHub's own figure: kept as it is.** The user: "Keep GitHub".
GitHub keeps a read-only `refs/pull/<n>/head` for each of the 3 pull
requests, and between them they reach every old game build. So after the
rewrite clones shrink at once, but GitHub's `diskUsage` stays near 156 MiB
([`github-after-push.tsv`][gap]).

- The point of the work is what a clone holds, and what the repository adds
  from now on.
- Recreating the repository is not done. It would lose the 3 pull requests,
  the history of 338 workflow runs, and every old commit link at once, and
  Cloud Run's trigger would need connecting again
  ([`research/history-rewrite.md`](research/history-rewrite.md) §2).

**D2. The screenshots: high quality, and no odd crops.** The user: "We want
to maintain high image quality and we want to make sure aspect ratio of
images doesn't result in odd looking images when fit into different
sections of a page where they are used now, otherwise up to you".
[`research/screenshots.md`](research/screenshots.md) §5 and §6 measured what
that asks for, on the built site in a headless Chrome at 9 screens:

- **Quality.** What looks soft today is not the committed files. The site's
  widths stop at 640, 800 and 1280 px, so a 2× tablet or a 3× phone gets a
  copy enlarged up to 1.5×. A1 adds widths up to 1600 for a cover and 1200
  for a gallery image, and the caps follow (S1).
- **Crops.** Every space fills its box, cutting a screenshot's right side
  where the box is narrower than the screenshot. On windows from 896 to
  about 1180 px, the home page stretches its tiles so far that Pong's shows
  one paddle. A1 draws every screenshot at its space's full width instead,
  so no space cuts its sides; where a space is taller, the game's own color
  shows below (S12, S13).
- **Form.** Lossless WebP at the caps, 66% of today's bytes (S2). At the
  widest width, which 2× and 3× screens get, it comes out closer to the
  capture than today; at the others, 0.11 of a level further on average.
  Lossless PNG would be closer on average, but at 98% of today's bytes a
  retake would save nothing.
- **Shape.** A cover is 4:3 to 16:10 and a gallery image 16:9, as all 8 are
  today, and the schema holds it (S3, S14).
- **Not done in A:** retaking Pong (1024 px) and Minesweeper (1200 px) at
  1600, which would sharpen them on 2× tablets. They are no softer than
  today. §4 offers it.

**D3. The backups: local git repositories on the devbox.** The user: yes.
They are for Parts B and C only.

- The rewrites replace every commit on GitHub, so a copy as it stood just
  before is the only way to undo them.
- Bare mirrors, `~/Projects/personal/fuzzley-backup.git` and
  `~/Projects/personal/fuzzley.github.io-backup.git`, made at P0 with their
  push URLs disabled. On the day, B2 and C1 bring them up to date, cut them
  off from GitHub, and write a bundle of each beside it.
- Part A needs no backup. Its commits are ordinary ones.

**D4. The memory notes: their hashes are rewritten, or removed.** The user:
"Same as fuzzley-games". Two notes name a fuzzley commit, once each
([`hash-refs-files.tsv`](data/history/hash-refs-files.tsv)). B8 removes a
hash a note doesn't need, and rewrites the rest from the commit map.

**D5. The day of Parts B and C: its own, soon after A is live.** The user:
"Don't wait for" fuzzley-games' Part C.

- **What is asked, once A is live:** the go-ahead for a time of about an
  hour, most of it waiting on Cloud Run and the Pages deploy.
- **What it needs from the user:** that nothing pushes to fuzzley or
  fuzzley.github.io from B1 to C4. That covers the user, every Claude
  session, and the Windows side. B1 turns Update games off, and B9 turns it
  on again.
- **Why:** every commit gets a new hash. Anything based on the old commits,
  such as an unpushed branch, a worktree or a stash, must be pushed or saved
  before, and moved across after. An old clone used after the push would
  bring the old history back.
- The two rewrites don't touch each other. Each rewrites only its own
  repository's hashes, and checks the other repository so as not to rewrite
  a hash that is ambiguous between them.

**D6. Part C: fuzzley.github.io is rewritten too.** The user: yes. It takes
about 20 minutes, and nothing names its commits. With no pull request refs
to hold the old objects, GitHub's own figure for it should fall as well.

**D7. This folder goes to `main` and is pushed.** The user: yes. That is
P0.

- The research, scripts and data are about 0.3 MiB of text, 0.09 MiB
  packed. Parts B and C
  run from these scripts, so they must be in a clone on the day.
- A push to `main` deploys the site at once. Cloud Run rebuilds an identical
  site under the new commit.

---

## 3. Settled by this plan

These are the plan's calls, so the build goes on without stopping to ask.

**S1. A screenshot is committed no wider than the widest copy the site
serves of it.**

- That is 1600 px for a cover, and 1200 for a gallery image. A capture that
  is narrower stays at its own width, as Pong's 1024 does.
- 1600 is what a wide cover needs on an 820 px tablet at 2× (1,576), and
  1200 what a card or a gallery image needs on a 430 px phone at 3×
  (1,194). Laptops at 2× and desktops need less.
- The site's `<Picture>` widths never ask for more, and Astro never
  enlarges. So a wider file only adds bytes to history.
- An image used both as a cover and in a gallery takes the cover's cap.

**S2. The form is lossless WebP, at effort 6.**

- It holds the same pixels as PNG in about two thirds of the bytes, and
  Minesweeper's 71 KiB PNG in 11 KiB.
- Effort 6 costs a second or two per image, once.
- sharp shrinks a WebP file on load when it resizes it, and Astro can't
  turn that off. That is the 0.11 of a level. PNG avoids it, at 98% of
  today's bytes ([`research/screenshots.md`](research/screenshots.md) §6).

**S3. The rule is held by the content schema, not a lint script.**

- Astro 7.4.7's content layer gives the schema the path a project file
  names, not the image's size, so the rule reads the file with Astro's
  `imageMetadata`. This plan first had `refine()` read them from `image()`,
  which A2 found doesn't work (§12).
- So `yarn dev`, `astro check` and `yarn build` all fail a screenshot of
  the wrong width, form or shape, with a message that names
  `yarn screenshot`. `yarn verify` runs two of those, and so does CI.

**S4. The widths live in one module, `frontend/src/lib/image-widths.ts`.**

- The components pass its lists to `<Picture>`, the schema reads its caps
  and shapes, and `tools/screenshot.mjs` imports it too.
- Node 26 runs TypeScript without a build step, which was checked on the
  devbox. So the script imports the `.ts` file as it is.
- A change to a width list then moves the cap with it. A wider list fails no
  screenshot, since Astro serves the committed width rather than enlarging
  it, so nothing says a retake is due. §10 lists that.

**S5. No originals are kept,** not even in an ignored folder. A layout that
draws a screenshot wider needs a new capture. Today's captures, the widest
there are, stay in history until Part B, and in the backup after.

**S6. No gate, unlike fuzzley-games' A1.** Nothing here retakes in bulk.
Each screenshot is written on purpose, for a change a visitor will see
([`research/screenshots.md`](research/screenshots.md) §4c).

**S7. The photo, the favicons and the link preview stay as they are.**

- They are 34 KiB, 25 KiB and 77 KiB.
- Since 2016 they and the old site's small images have added 235 KiB across
  8 commits ([`churn.tsv`](data/screenshots/churn.tsv)).
- The favicons and the link preview are drawn by the scripts in `branding/`.
- The link preview is drawn from the cover at 1200 px, whole, as today.

**S8. Part B's rewrite is r3's rule, run on the day's history.**

- It removes every path under the game builds' folders and the old site's
  packages' folders. `env.sh` holds them as `GAME_BUILDS` and `VENDORED`.
- It strips every old version of a site image that `main`'s tip doesn't
  hold, by blob id, from `inventory.mjs`'s list on the day.
- The run uses `--prune-empty never --prune-degenerate never`, so no commit
  is dropped. One of the 95 commits that would empty out, 6cf1149, is named
  3 times in `docs/worklog.md`.
- `main` is pushed leased to its old commit, by name, not with `--mirror`.

**S9. Which hashes are rewritten.**

- `rewrite-refs.mjs` rewrites every short hash in `docs/`, and in the
  memory notes (D4).
- It leaves out `docs/repo-size/data/history/` and
  `docs/repo-size/research/history-rewrite.md`, which record the old history
  on purpose.
- fuzzley-games' one reference, in its own
  `docs/repo-size/research/history-rewrite.md`, is a record as of
  2026-11-21 and is left alone. So fuzzley-games needs no commit.
- This file names old commits only as plain references, so it can be
  rewritten with the rest.

**S10. Part C keeps only the paths at fuzzley.github.io's tip:**
`.github/` and `README.md`, with every commit kept.

**S11. A Fuzzley Games gallery image starts from fuzzley-games' committed
`preview.webp`,** rather than a new capture. Those are 16:9, the gallery's
shape, and 2560 px wide, more than the cap. A cover is a capture of its
own, since 16:9 is wider than a cover may be (S14). A3 writes this down.

**S12. Every space draws its screenshot at its full width, from the top.**

- `.tile-media img` becomes `width: 100%; height: auto`, in place of
  `height: 100%; object-fit: cover; object-position: left top`.
- A space wider than its screenshot cuts the bottom, as today. One taller
  shows the tile's tint below it: 17% of a 4:3 tile under a 16:10 cover,
  where the name and the Play button sit, and up to 43% in the home tiles
  squeezed at a 900 px window.
- No space cuts a screenshot's sides, at any window size. So Klondike keeps
  all seven columns in a 4:3 tile, and Pong both paddles.
- The `sizes` each page gives is then the width the screenshot is drawn at,
  so the browser picks the right copy. Today a screenshot cut at its sides
  is drawn up to 1.2× wider than `sizes` says.
- The home page's layout stays as it is. Moving its wide layout to start at
  1180 px would keep the tiles' shapes, but draw them at full width in two
  columns between 896 and 1180, which needs copies of 2,300 px and more on
  a landscape tablet.

**S13. A project's tint is the color of its cover's bottom edge,** since
that is where the tile shows it.

- Today four of five match. The Solitaire Collection's, `#135c2b`, is
  lighter than its felt, `#0e420e`, and A1 changes it.
- The tint is used for nothing else but the color behind a screenshot.
- `yarn screenshot` prints the bottom edge's commonest color for a cover,
  so the tint can be set with it.

**S14. A cover is 4:3 to 16:10, and a gallery image 16:9,** within 1% for
rounding.

- The covers' spaces run from 4:3 (the small tiles) to 16:9 (the wide
  tiles). In that range a cover loses at most its bottom quarter, or leaves
  at most a sixth of a 4:3 tile to the tint.
- Every gallery space is 16:9, so a gallery image fits it exactly.
- All 8 screenshots are within these today, Spider Solitaire's cover at
  1.607.

---

## 4. What isn't done, and why

[`research/screenshots.md`](research/screenshots.md) §4 has the detail.

- **Retaking Pong and Minesweeper at 1600 px.** Their captures are 1024 and
  1200 px wide, so an 820 px tablet at 2× enlarges them 1.54× and 1.31×,
  as it does today. A retake needs each game captured at 1600 × 1200, and
  Minesweeper's in a game under way, from fuzzley-games. Both are flat
  colors, so it would add a few tens of KiB. It is offered as a follow-up once A is live, not built in A.
- **Git LFS, or a separate store.** After A, a full retake adds about
  1.5 MiB. Cloud Run's build, and the Pages copy's build in another
  repository, would each need LFS credentials or a fetch step. A pull
  request would no longer show a screenshot's change.
- **Fetching Fuzzley Games' screenshots at build time.** fuzzley.games keeps
  no old versions, so a pinned hash breaks at its next retake. A pin on a
  fuzzley-games commit breaks once that repository's own rewrite changes its
  hashes. It would save about 0.5 MiB.
- **Lossy WebP.** At the captured size it is smaller than lossless WebP at
  the cap, but further from the capture at every measure: 1.74 at the widest
  width against 1.13 ([`research/screenshots.md`](research/screenshots.md)
  §6).
- **Lossless PNG.** 0.29 of a level closer than lossless WebP on average,
  at 98% of today's bytes. S2 has why it isn't chosen.
- **Speeding up CI or Cloud Run.** Both clone at depth 1, which is 2.6 MiB
  today and stays about that. The rewrite helps full clones only.

**When to look again:** if the gallery grows to many more images per
project, or a retake becomes weekly. Then a separate store, as
fuzzley-games' research lays out (its §4d), is the design to start from.

---

## 5. Contracts

These are the names and types that A's files share, fixed before code.

### `frontend/src/lib/image-widths.ts` (A1)

```ts
/** The widths of a cover on the home page's feature and wide tiles, and on its project page. */
export const WIDE_COVER_WIDTHS = [480, 720, 960, 1280, 1600];

/** The widths of a cover on the home page's small tiles. */
export const TILE_COVER_WIDTHS = [320, 480, 640, 800];

/** The widths of a cover on the Projects page's cards. */
export const CARD_COVER_WIDTHS = [400, 640, 800, 1200];

/** The widths of an image in a project page's gallery. */
export const GALLERY_WIDTHS = [400, 640, 800, 1200];

/** The width of a project page's link preview, drawn from its cover. */
export const PREVIEW_WIDTH = 1200;

/** The widest copy the site serves of a cover, and so the widest a committed cover may be. */
export const COVER_MAX_WIDTH = Math.max(
  ...WIDE_COVER_WIDTHS,
  ...TILE_COVER_WIDTHS,
  ...CARD_COVER_WIDTHS,
  PREVIEW_WIDTH,
);

/** The widest copy the site serves of a gallery image. */
export const GALLERY_MAX_WIDTH = Math.max(...GALLERY_WIDTHS);

/**
 * The shapes a cover may have, as width over height: from 4:3, the small
 * tiles' shape, to 16:10. A space draws a screenshot at its full width, so a
 * narrower cover loses more of its bottom in a 16:9 tile, and a wider one
 * leaves more of a 4:3 tile to the tint.
 */
export const COVER_RATIOS = { min: 4 / 3, max: 16 / 10 };

/** The shape of a gallery image, as every gallery space has it. */
export const GALLERY_RATIO = 16 / 9;

/** How far a screenshot's shape may stray from its bounds, for rounding. */
export const RATIO_TOLERANCE = 0.01;
```

- The lists are plain `number[]`, since `<Picture>`'s `widths` takes
  `number[]` and won't take a readonly array.
- The photo's `[80, 160]` stays in `index.astro`. It isn't a screenshot.

### How a space draws a screenshot (A1)

In `frontend/src/styles/global.css`:

```css
/* A screenshot fills its tile's width from the top. A tile taller than it
   shows the tint below, and one wider cuts its bottom: never its sides, so
   each page's `sizes` is the width it is drawn at. */
.tile-media img {
  width: 100%;
  height: auto;
}
```

### `yarn screenshot` (A2)

```text
yarn screenshot <capture> <name> [--gallery]
```

- Reads `<capture>`, any image sharp reads, into memory first, so it may be
  the very file it replaces.
- Refuses a capture whose shape is outside `COVER_RATIOS`, or with
  `--gallery` outside `GALLERY_RATIO`, each within `RATIO_TOLERANCE`. It
  prints the shape it found and the one wanted, and exits with 1, writing
  nothing.
- Decodes it in full, then resizes the pixels with lanczos3, never
  enlarging, to `COVER_MAX_WIDTH`, or to `GALLERY_MAX_WIDTH` with
  `--gallery`. Resizing straight from a WebP or JPEG file would let sharp
  shrink it on load, which blurs it
  ([`research/screenshots.md`](research/screenshots.md) §3).
- Writes `frontend/src/assets/projects/<name>.webp`: lossless WebP, effort 6. [`scripts/screenshots/fit.mjs`](scripts/screenshots/fit.mjs) does the
  same, and is the model for it.
- `<name>` is lowercase letters, digits and hyphens. Anything else, or a
  missing argument, prints the usage and exits with 2.
- Prints what it wrote, such as
  `src/assets/projects/solitaire-freecell.webp: 1200 × 675, 187.1 KiB`, and
  a reminder to name it in the project's content file if the name is new.
- For a cover, it also prints the commonest color along its bottom 2%, to 6
  bits a channel, such as `bottom edge: #0e420e (49%)`, and says that the
  project's `tint` should be it (S13).

### The schema (A2)

In `frontend/src/content.config.ts`, inside the projects schema, where
`image` is in scope:

```ts
// A screenshot is committed as WebP, no wider than the widest copy the site
// serves of it, since every version stays in history for good, and in a
// shape its spaces draw well.
const screenshot = (maxWidth: number, minRatio: number, maxRatio: number) =>
  image()
    .refine((img) => img.format === "webp", {
      message: "Write screenshots with yarn screenshot, as WebP",
    })
    .refine((img) => img.width <= maxWidth, {
      message: `Write screenshots with yarn screenshot: at most ${maxWidth} px wide here`,
    })
    .refine(
      (img) =>
        img.width / img.height >= minRatio * (1 - RATIO_TOLERANCE) &&
        img.width / img.height <= maxRatio * (1 + RATIO_TOLERANCE),
      { message: "A cover is 4:3 to 16:10, and a gallery image 16:9" },
    );
```

`cover` becomes
`screenshot(COVER_MAX_WIDTH, COVER_RATIOS.min, COVER_RATIOS.max)`, and each
gallery `image` becomes
`screenshot(GALLERY_MAX_WIDTH, GALLERY_RATIO, GALLERY_RATIO)`.

**As built,** `img` here is a path marked for Astro to resolve later, not the
image's size, so every screenshot failed. The helper uses `superRefine`, reads
the file the path names with `imageMetadata` from `astro/assets/utils`, and
keeps the three messages (§12).

---

## 6. Work packages

Each package is one commit and passes `yarn verify` on its own. They are
built in the order A1, A2, A3. §6.0 is the routine every package follows.
Each package after it gives its edits file by file, its checks and its
commit's subject.

Line numbers are as of b45c184. An earlier package can move them, so find
each place by the name given with it.

### 6.0 How every package is built

**Once, before A1,** in the worktree `~/Projects/personal/fuzzley-repo-size`,
on the branch `repo-size-plan`:

1. `git fetch origin && git rebase origin/main`, so the branch starts from
   that day's `main`.
2. From `frontend/`, run `npx -y corepack yarn install --immutable`, if
   `node_modules` isn't there.

**For each package:**

1. Make its edits.
2. Run `npx -y corepack yarn verify` from `frontend/`. It runs
   `astro check`, ESLint, Prettier's check and `yarn build`, which fetches
   the pinned games first.
3. Commit the package's files by name: `git add` for new files and `git rm`
   for deletions first, then `git commit -F - -- <paths>`. Use the subject
   the package gives, in the repository's form, and no attribution lines.
4. Measure what the package adds to history (§9), and note it for §12.

**The space check,** which A1 and A2 run on a build:

```sh
node docs/repo-size/scripts/screenshots/slots.mjs <dist> \
  ~/Projects/personal/fuzzley-games/frontend/lib/dev/src/chrome.ts \
  docs/repo-size/data/screenshots/<name>.tsv --shots <scratch folder>
```

and once more with `--sweep`. `<dist>` is a copy of `frontend/dist/` made
aside after the package's `yarn build`. It needs fuzzley-games' checkout for
its headless Chrome helpers, and closes its Chrome itself.

**When A is done:**

1. Start one review agent in the background on the three commits
   (`git log -p origin/main..HEAD`). Its brief names this file's §5 and §6,
   what each commit does, and the rules from `AGENTS.md` that bear on it:
   "Run `yarn verify` … before you commit", and "Writing for visitors",
   since A3's lines are read by agents and the content files by visitors.
   Answer each finding in an `amend!` commit, then fold them in:

   ```sh
   before=$(git rev-parse HEAD) &&
     GIT_EDITOR=true git rebase --autosquash --keep-base origin/main &&
     git diff --stat "$before" HEAD &&  # prints nothing
     git log --oneline origin/main..HEAD  # shows no amend!
   ```

2. Build the Docker image and request its pages, as `deploy.yml`'s `docker`
   job does. Cloud Run deploys without waiting for that job, so this is the
   last check before the site changes. The devbox's Docker is on host
   `docker`, and the image answers 301 to any host but fuzzley.info, so
   request it with `-H 'Host: fuzzley.info'`.
3. Report to the user, with §12 filled in, and the space check's PNGs of
   the squeezed tiles and a 4:3 tile under a 16:10 cover on an Artifact
   page. **Nothing is pushed until they say so.**
4. On their word: `git fetch origin`; rebase onto `origin/main` if it has
   moved, and run `yarn verify` again; `git push origin HEAD:main`. Then
   watch Verify and deploy pass, and `fuzzley.info/version.json` name the
   commit. Fast-forward the main checkout if it is on `main` and clean.

### P0. This folder, and the backups

1. Commit `docs/repo-size/` as `docs(repo-size): plan the repository's size
down, with the research and dry runs it rests on`, and push it (D7).
2. Make the backups (D3):

   ```sh
   cd ~/Projects/personal
   git clone --mirror https://github.com/fuzzley/fuzzley.git fuzzley-backup.git
   git -C fuzzley-backup.git remote set-url --push origin DISABLED
   git clone --mirror https://github.com/fuzzley/fuzzley.github.io.git fuzzley.github.io-backup.git
   git -C fuzzley.github.io-backup.git remote set-url --push origin DISABLED
   ```

### A1. The spaces: copies for 2× and 3× screens, at the full width

**What it does:** S4, S12 and S13. The site serves wider copies of today's
screenshots, every space draws its screenshot at its full width, and the
Solitaire Collection's tint follows its felt. The committed screenshots
don't change.

**Edits:**

1. **New** `frontend/src/lib/image-widths.ts`, as §5 gives it.
2. The components take their lists from it:
   - `frontend/src/components/GameTile.astro`, line 35:
     `const widths = wide ? WIDE_COVER_WIDTHS : TILE_COVER_WIDTHS;`
   - `frontend/src/pages/index.astro`, line 110, the feature's `<Picture>`:
     `widths={WIDE_COVER_WIDTHS}`. The photo's `[80, 160]` (line 60) stays.
   - `frontend/src/pages/projects/index.astro`, line 39:
     `widths={CARD_COVER_WIDTHS}`.
   - `frontend/src/pages/projects/[slug]/index.astro`: the cover's
     `widths={WIDE_COVER_WIDTHS}` (line 117), the gallery's
     `widths={GALLERY_WIDTHS}` (line 161), and the link preview's
     `width: PREVIEW_WIDTH` (line 44).
   - Every `sizes` stays as it is. With S12 it is the drawn width.
3. `frontend/src/styles/global.css`, `.tile-media img` (lines 360–365), as
   §5 gives it.
4. `frontend/src/content/projects/solitaire.md`, line 14:
   `tint: "#0e420e"`.

**Checks:**

1. `yarn verify`.
2. **The space check** (§6.0) on b45c184's build and on A1's, kept as
   `data/screenshots/slots-a1.tsv` beside today's `slots.tsv`.
   - Every row shows 100% of the screenshot's width, on every screen and
     in the sweep.
   - "Enlarged" is 1.05 at most in every row, but for Pong's and
     Minesweeper's covers, whose captures are narrower than the cap.
   - "Tint shown" is 17% at most on every screen outside 896–1180 px, that
     is, all but the 900 px window and the 1024 px tablet.
3. **Look at the PNGs** of every screenshot in every space: no game is cut
   at its side, and no band of tint looks like a gap. The Solitaire
   Collection's band under Klondike is its felt's color.
4. **In a browser,** through the `chrome-devtools` MCP server, with
   `yarn preview` serving A1's build: on the home page, hovering a game tile
   still zooms its screenshot within the tile, and following a tile to its
   project page still carries the screenshot across in the view
   transition. Close the browser afterwards.

**Commit:**

```text
feat(frontend): the screenshots fill their spaces' width, uncut at the sides, in copies wide enough for 2× tablets and 3× phones
```

Its body gives the space check's figures before and after.

### A2. `yarn screenshot`, the screenshots, and the schema's rule

**What it does:** S1, S2, S3, S11 and S14. Each screenshot is written again
from the committed file, which is the best capture there is, and the schema
fails any that breaks the rule.

**Edits:**

1. **New** `frontend/tools/screenshot.mjs`, as §5 describes.
   - It imports the caps, the shapes and `RATIO_TOLERANCE` from
     `../src/lib/image-widths.ts`, and sharp, which is already a
     dependency.
   - It parses its arguments with `node:util`'s `parseArgs`.
   - It reads the capture with `readFile`, then resizes, encodes with
     `.toBuffer()` and writes with `writeFile`. That lets it replace the
     file it reads, which `sharp(path).toFile(path)` refuses.
   - Its header comment says what it writes and why: every version stays in
     history, so a screenshot is no wider than the widest copy served of it.
2. `frontend/package.json`: `"screenshot": "node tools/screenshot.mjs"`,
   after `"games"`.
3. From `frontend/`, write each screenshot again:

   ```sh
   for name in fuzzley-games solitaire-klondike; do
     npx -y corepack yarn screenshot "src/assets/projects/$name.webp" "$name"
   done
   for name in solitaire-freecell solitaire-pyramid solitaire-spider; do
     npx -y corepack yarn screenshot "src/assets/projects/$name.webp" "$name" --gallery
   done
   for name in minesweeper pong spider; do
     npx -y corepack yarn screenshot "src/assets/projects/$name.png" "$name"
   done
   git rm src/assets/projects/minesweeper.png src/assets/projects/pong.png src/assets/projects/spider.png
   ```

   The 8 files should come to about 1.54 MiB, as in
   [`after-plan.txt`](data/history/after-plan.txt): 1600 wide for
   Fuzzley Games, Klondike and Spider Solitaire, 1200 for the three gallery
   images, and Minesweeper's 1200 and Pong's 1024 as they are. The bottom
   edges it prints should match the tints, the Solitaire Collection's as A1
   set it.

4. The content files name the new files: `cover:` in
   `frontend/src/content/projects/minesweeper.md` (line 15), `pong.md`
   (line 13) and `spider.md` (line 13) ends `.webp`.
5. `frontend/src/content.config.ts`: the `screenshot()` helper, as §5 gives
   it, and `cover` and the gallery's `image` use it. It imports the caps,
   the shapes and the tolerance from `./lib/image-widths`.
6. `DEVELOPMENT.md`, under Pages and Content: the line on
   `frontend/src/assets/` says the screenshots are WebP, written with
   `yarn screenshot`, and that the build makes the AVIF and WebP it serves.

**Checks:**

1. `yarn verify`.
2. **The schema holds.** Point `pong.md`'s cover back at a PNG (any of the
   deleted ones, restored to a scratch path under `src/assets/`), and
   `astro check` fails with the format's message. Then a WebP 1601 px wide,
   which fails with the width's, and a 2:1 WebP, which fails with the
   shape's. Undo all three.
3. **The tool works.** `yarn screenshot src/assets/projects/pong.webp
pong-check` writes `src/assets/projects/pong-check.webp` at 1024 × 768,
   about 1.4 KiB, and prints a bottom edge near `#726256`. A 2:1 capture is
   refused with exit 1, and nothing written. `yarn screenshot` alone, and
   `yarn screenshot a.png Bad/Name`, print the usage and exit 2. Delete
   what the checks wrote.
4. **The real build's pictures are as measured.** Write
   `docs/repo-size/scripts/screenshots/compare-builds.mjs`. It decodes each
   AVIF file in a `dist/_astro/` folder and finds its screenshot by name.
   Then it gives the error against the reference, as `encodings.mjs` does:
   the committed screenshot at b45c184, decoded in full and resized to the
   same size with lanczos3 alone.
   - Run it on A1's `dist/` and A2's, and keep its output as
     `data/screenshots/compare-builds.txt`.
   - At the widest width, A2's five former WebP screenshots come out closer
     than A1's, and the three former PNGs the same.
   - At the other widths, both builds come out close to what
     [`encodings-plan-widths.tsv`](data/screenshots/encodings-plan-widths.tsv)
     measured, for "today" and for lossless WebP.
5. **The space check** (§6.0) on A2's build gives the same as A1's, kept as
   `data/screenshots/slots-a2.tsv`.
6. **In a browser,** through the `chrome-devtools` MCP server, with
   `yarn preview` serving A2's build, and the live site beside it:
   - Open the home page, `/projects/`, `/projects/solitaire/` and
     `/projects/spider/`.
   - Look at each at 1440 × 900, at a device pixel ratio of 1 and of 2, as
     an 820 px tablet at 2, and as a phone (390 × 844, ratio 3). The covers
     and gallery look at least as sharp as on the live site, and no image is
     missing.
   - The network panel shows each image's AVIF at the width expected: 1600
     for a cover on the tablet, and 1200 for a gallery image on the phone.
   - Close the browser afterwards.
7. Measure the commit (§9): about 1.54 MiB packed.

**Commit:**

```text
perf(frontend): the project screenshots are lossless WebP no wider than the site serves them, two thirds of the bytes, and the schema holds their width, form and shape
```

Its body gives the measured sizes before and after, and what
`compare-builds.txt` found.

### A3. The rules

**Edits:**

1. `AGENTS.md` gains a section after Checks:

   > ## Images
   >
   > - **Add or retake a screenshot with `yarn screenshot`.** Every version
   >   stays in history for good, so retake one only for a change a visitor
   >   will see. The content schema fails a screenshot it didn't write.
   > - **A cover is 4:3 to 16:10, with what matters in its top three
   >   quarters,** since a 16:9 tile cuts a 4:3 cover's bottom. Set the
   >   project's `tint` to the bottom edge's color that `yarn screenshot`
   >   prints: the tile shows it below the cover.
   > - **A gallery image is 16:9.** A Fuzzley Games one starts from
   >   fuzzley-games' committed `preview.webp` rather than a new capture.
   > - **A picture kept with a plan under `docs/` is WebP,** lossless only
   >   where it must be exact. A "before" picture copies the committed
   >   screenshot.

2. `DEVELOPMENT.md`'s command list gains
   `yarn screenshot <capture> <name> [--gallery]  # add or retake a project screenshot (WebP, sized for the site)`.

**Checks:** `yarn verify`, and Prettier on the two files
(`frontend/node_modules/.bin/prettier --check AGENTS.md DEVELOPMENT.md`),
since `yarn verify` checks only `frontend/`.

**Commit:**

```text
docs(agents): screenshots go in with yarn screenshot, in the shapes the site draws well, and a plan's pictures are WebP
```

---

## 7. Running the build

- **One session builds A,** in §6's order, on `repo-size-plan`. The three
  packages are a dozen files, and most of the time goes into the checks.
  One review agent runs once A is done. No workflow is needed.
- **Another session may be working in fuzzley at the same time.** It works
  in its own worktree, and A's push waits for the user's word.
- **Where the build stops for the user:**
  1. After A1–A3: the report and the push.
  2. Once A is live: the go-ahead for B and C's hour (D5).
- **No push without the user's word.** A push to `main` deploys at once.
  P0's push had it, under D7.

---

## 8. Parts B and C: the history rewrites

**These parts force-push `main` in two repositories.** They do it once each,
in the steps below, and nowhere else.

This is fuzzley-games' runbook (its §8), cut down to a repository with
`main` alone, and rehearsed on mirrors except for the pushes.

### Before the day

1. **A is live.** `fuzzley.info/version.json` names `main`'s tip.
2. **No pull request is open, and `main` is the only branch:**
   `gh pr list -R fuzzley/fuzzley --state open` lists none, and
   `git ls-remote --heads https://github.com/fuzzley/fuzzley.git` shows
   `main` alone.
3. **The user has given the go-ahead** for the day (D5), and the freeze
   around it.
4. **Rehearse it the day before,** into a scratch folder, so the real
   figures are known:

   ```sh
   export WORK=~/Projects/personal/repo-rewrite-fuzzley-rehearsal
   export DATA=$WORK/data
   cd docs/repo-size/scripts/history
   ./01-mirror.sh fresh && ./02-inventory.sh && ./03-scenario.sh r3 && ./09-rewrite-refs-dry-run.sh r3
   ./11-pages-repo.sh
   ```

   The clone's figure in `$DATA/scenarios.tsv` should be about 2.0 MiB, as
   `08-after-plan.sh` projected. The verify file should show 0 tree
   differences, every commit kept, and 0 message references wrong. Delete
   `$WORK` afterwards.

5. **Freeze.** Every session finishes, pushes or saves its work. Then
   `./04-local-clones.sh` shows no commits that no remote holds, and no
   stash. This plan's worktree has its work on `main`, and is removed
   (`git worktree remove`).

### On the day

Run from `docs/repo-size/scripts/history/` in the main checkout, pulled to
B1's commit, with:

```sh
export WORK=~/Projects/personal/repo-rewrite-fuzzley-$(date +%F)
export DATA=$WORK/data
```

so the dry runs' records in the repository stay as they are.

**B1. Stop Update games, and check that nothing is moving.**

```sh
gh workflow disable update-games.yml -R fuzzley/fuzzley
gh run list -R fuzzley/fuzzley -L 5
git ls-remote https://github.com/fuzzley/fuzzley.git refs/heads/main
curl -s https://fuzzley.info/version.json | jq -r .commit
```

No run may be in progress, the last Verify and deploy run must have passed,
and the site must serve `main`'s tip.

**B2. Back up** (D3). First the work mirror the scripts read, then the backup
repository, brought up to the same refs and cut off from GitHub.

```sh
./01-mirror.sh fresh
backup=~/Projects/personal/fuzzley-backup.git
git -C "$backup" fetch --prune origin
diff <(git -C "$backup" for-each-ref) <(git -C "$WORK/fuzzley.git" for-each-ref)
git -C "$backup" remote remove origin
git -C "$backup" fsck --full
git -C "$backup" bundle create ~/Projects/personal/fuzzley-pre-rewrite.bundle --all
git bundle verify ~/Projects/personal/fuzzley-pre-rewrite.bundle
git -C "$backup" for-each-ref > ~/Projects/personal/fuzzley-backup.refs.txt
```

- The `diff` must print nothing: both hold `main` and the 3 pull request
  refs at B1's commits.
- `fsck` must pass.

**B3. Rewrite a copy.**

```sh
./02-inventory.sh
./03-scenario.sh r3
```

The rewritten mirror is `$WORK/r3.git`, with filter-repo's commit map and
ref map in `$WORK/r3.git/filter-repo/`.

**B4. Check it.**

- `$DATA/scenario-r3-verify.txt` shows 0 tree differences for `main`, every
  commit on `main` kept (the day's count), and 0 message references wrong.
- `$DATA/scenario-r3-fsck.txt` ends in `exit: ok`.
- The clone's size in `$DATA/scenarios.tsv` is close to the rehearsal's.

**B5. Dry-run the docs' hashes.** Run `./09-rewrite-refs-dry-run.sh r3`.
`$DATA/rewrite-refs-r3.txt` must show nothing ambiguous, nothing lengthened,
and no replacements in its second pass.

**B6. Push `main`,** leased to the commit it had at B1.

```sh
old_main=$(git -C "$WORK/fuzzley.git" rev-parse refs/heads/main)
git -C "$WORK/r3.git" push \
  --force-with-lease=refs/heads/main:"$old_main" \
  https://github.com/fuzzley/fuzzley.git \
  refs/heads/main:refs/heads/main
```

There are no rulesets and no branch protection, so nothing has to be
bypassed.

**B7. Watch it land.**

- `git ls-remote` shows the commit map's new `main`.
- Verify and deploy runs on the push and passes: `yarn verify`, the Docker
  image and its pages, and the Pages copy's deploy.
- Cloud Run builds `main`. `curl -s https://fuzzley.info/version.json | jq
-r .commit` gives the new short hash, and the footer's link opens it on
  GitHub.
- If Cloud Run doesn't start within a few minutes, the site keeps serving
  the last revision. The user then checks the trigger in the console.

**B8. Rewrite the hashes the docs name.**

```sh
git clone https://github.com/fuzzley/fuzzley.git "$WORK/after"
cd "$WORK/after"
(cd frontend && npx -y corepack yarn install --immutable)
node docs/repo-size/scripts/history/rewrite-refs.mjs \
  --map "$WORK/r3.git/filter-repo/commit-map" \
  --old "$WORK/fuzzley.git" --new "$WORK/r3.git" \
  --other ~/Projects/personal/fuzzley-games \
  --exclude docs/repo-size/data/history \
  --exclude docs/repo-size/research/history-rewrite.md \
  docs
```

- Check the counts against B5's, then run it again with `--write`.
- Run `npx -y corepack yarn verify` from `frontend/`.
- Commit as `docs: name the commits as the rewritten history has them`, and
  push it to `main`. It changes only Markdown and text, and the site is
  rebuilt the same.
- **The memory notes (D4).** Run the same command with
  `~/.claude/projects/-home-dev-Projects-personal/memory` in place of
  `docs`, without `--write`, and read the list.
  - Where a note's point stands without the commit, remove the hash from the
    note by hand.
  - Then run it with `--write` for the rest.
  - The notes aren't in the repository, so nothing is committed.

**B9. Turn Update games on again,** and run it once by hand:

```sh
gh workflow enable update-games.yml -R fuzzley/fuzzley
gh workflow run update-games.yml -R fuzzley/fuzzley
```

Watch the run pass. It pushes only if a game has a newer build.

**B10. GitHub's figure** is kept as it is (D1), so there is nothing to do.
Record `gh api repos/fuzzley/fuzzley --jq .size` for §12. It should stay near
the 166,874 KB it was.

**B11. Clone every local copy again.**

```sh
mv ~/Projects/personal/fuzzley ~/Projects/personal/fuzzley-old
git clone https://github.com/fuzzley/fuzzley.git ~/Projects/personal/fuzzley
cd ~/Projects/personal/fuzzley/frontend && npx -y corepack yarn install --immutable
```

- Copy any untracked files across.
- An unpushed branch moves with `git rebase --onto <new base> <old base>
<branch>`, the new base taken from the commit map.
- Any clone on the Windows side must be cloned again too. The devbox can't
  see it, so the user does this.
- Keep `fuzzley-old` until nothing in it is wanted, then delete it.

**C1. Back up fuzzley.github.io** (D3), as B2 did, with
`~/Projects/personal/fuzzley.github.io-backup.git`, writing
`fuzzley.github.io-pre-rewrite.bundle` and `fuzzley.github.io-backup.refs.txt`
beside it.

**C2. Rewrite a copy, and check it.** Run `./11-pages-repo.sh`.
`$DATA/pages-repo.txt` must say the tree at `main` is the same, `fsck: ok`,
and that every commit is kept. The rewritten mirror is
`$WORK/fuzzley.github.io-rewritten.git`.

**C3. Push its `main`,** leased:

```sh
old=$(git -C "$WORK/fuzzley.github.io.git" rev-parse refs/heads/main)
git -C "$WORK/fuzzley.github.io-rewritten.git" push \
  --force-with-lease=refs/heads/main:"$old" \
  https://github.com/fuzzley/fuzzley.github.io.git \
  refs/heads/main:refs/heads/main
```

**C4. Check the Pages copy still deploys.**
`gh workflow run pages.yml -R fuzzley/fuzzley.github.io` builds fuzzley's
`main`. Watch it pass, then check that
`curl -s https://fuzzley.github.io/version.json | jq -r .commit` names
fuzzley's new tip. The freeze ends here.

**C5. Record its figure** for §12: `gh api repos/fuzzley/fuzzley.github.io
--jq .size` on the day, the day after and a week after. GitHub doesn't say
when it collects objects that nothing reaches.

**B12. Keep the backups** (both mirrors and their bundles) for at least three
months. Delete them only once nothing names the old commits. Delete the dry
runs' 0.9 GB in `~/Projects/personal/repo-size-fuzzley-2026-11-21/`, and
`$WORK`, once B4 and C2 have passed.

### Rollback

- **fuzzley, before anything new lands on the rewritten `main`:** push the
  old commit back from the backup repository, leased to the new one. Cloud
  Run then deploys the old `main` again.

  ```sh
  git -C ~/Projects/personal/fuzzley-backup.git push \
    --force-with-lease=refs/heads/main:"$(git -C "$WORK/r3.git" rev-parse refs/heads/main)" \
    https://github.com/fuzzley/fuzzley.git refs/heads/main:refs/heads/main
  ```

  If the backup repository is gone, `git clone --mirror
~/Projects/personal/fuzzley-pre-rewrite.bundle restored.git` gives it back
  with every ref. `10-backup-rehearsal.sh` checked this
  ([`backup-rehearsal.txt`](data/history/backup-rehearsal.txt)).

- **fuzzley, after new commits land** (B8's at least): as fuzzley-games'
  runbook does, in a clone of the rewritten repository. Rebase the new
  commits onto the old `main` from the backup
  (`git rebase --onto refs/old/main <main as B6 pushed it> rollback`), run
  `rewrite-refs.mjs` with the commit map reversed and `--old` and `--new`
  swapped, and push leased to the current `main`. The trees match, so the
  rebase applies cleanly.
- **fuzzley.github.io:** push the backup's `main` back, leased to the
  rewritten one. Nothing but its two files lands on it after, unless someone
  edits them.

---

## 9. Checks and budgets

**Before each push:** `yarn verify`, each package's own checks in §6, and
for A the Docker image.

**What each package adds to history** is measured on its branch, before the
push, two ways:

```sh
# What a push sends, compressed and as deltas: near enough what history
# grows by.
printf '%s\n' HEAD ^origin/main | git pack-objects --revs --thin --stdout -q \
  | wc -c | awk '{ printf "%.2f MiB packed\n", $1 / 1048576 }'
# Every new blob at its full size, before compression.
git rev-list --objects origin/main..HEAD \
  | git cat-file --batch-check='%(objecttype) %(objectsize) %(rest)' \
  | awk '$1 == "blob" { s += $2 } END { printf "%.2f MiB raw\n", s / 1048576 }'
```

For a single commit, use `<sha> ^<sha>~1` in the first command and
`<sha>~1..<sha>` in the second.

| Package | Packed (MiB) |  Raw (MiB) | What it is                                                                    |
| ------- | -----------: | ---------: | ----------------------------------------------------------------------------- |
| P0      |         0.09 |        0.3 | text                                                                          |
| A1      |   under 0.01 | under 0.01 | one new file and seven small edits                                            |
| A2      |   about 1.54 | about 1.54 | the 8 screenshots, which barely compress, and the tool; deletions add nothing |
| A3      |   under 0.01 | under 0.01 | two Markdown files                                                            |

**After B:** a fresh clone's `git count-objects -vH` shows `size-pack` near
2.0 MiB. GitHub's figure is recorded the day after and a week after.

**Kept in mind throughout:**

- The schema runs on every build, so a screenshot that breaks the rule fails
  `yarn dev` too, not only `yarn verify`.
- `yarn build` fetches the pinned games, so a check that builds needs the
  network, or `node_modules/.cache/games/` from an earlier build.

---

## 10. Risks

| Risk                                                          | Where  | Likelihood | What limits it                                                                                                                                                |
| ------------------------------------------------------------- | ------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| In-between widths come out a little further from the capture  | A2     | certain    | 0.11 of a level on average, while the widest width, and every copy enlarged today, come out sharper; A2's checks 4 and 6                                      |
| A band of tint looks like a gap rather than the game's color  | A1     | low        | Four tints match their covers' bottom edges, and A1 sets the fifth; A1's check 3 looks at every space; A3's rule and the tool keep new ones matched           |
| A squeezed tile shows much of its tint                        | A1     | certain    | Up to 43% at a 900 px window, rather than cutting the game; only between 896 and 1180 px                                                                      |
| 2× and 3× screens download more                               | A1     | certain    | Only they fetch the new widest copies, and they are the screens that were enlarging                                                                           |
| A later layout draws a screenshot wider than it was committed | A      | low        | Astro serves the committed width rather than enlarging, so nothing breaks; the cap moves with the width lists, and a retake fixes it. The schema doesn't warn |
| A later Astro hands the schema something else for `image()`   | A2     | low        | The rule takes the image's size if given it, and reads the file if given a path; one it can't read passes, so re-run A2's check 2 after an Astro upgrade      |
| Node stops running `.ts` imports without a flag               | A1     | very low   | Node 26 does so by default; the Docker image and CI run Node 26                                                                                               |
| Someone pushes during the rewrite                             | B6     | low        | The freeze, Update games off, and the lease: the push fails rather than overwrite                                                                             |
| Cloud Run doesn't build the force-pushed `main`               | B7     | low        | The site keeps the last revision; the user checks the trigger                                                                                                 |
| GitHub's figure for fuzzley doesn't fall                      | B10    | certain    | Accepted (D1): clones shrink regardless, and A slows what GitHub adds                                                                                         |
| An old commit doesn't build                                   | B      | certain    | Commits before 2026-10-10 lose their game builds, and older screenshots go too; only `git bisect` or an old checkout would notice                             |
| An old clone pushes the old history back                      | B11    | medium     | Every local copy is cloned again, and the old one renamed; Windows-side copies are the user's to clone again                                                  |
| 2 signed commits lose their signatures                        | B      | certain    | Accepted; filter-repo can't keep them, and GitHub's web editor made them                                                                                      |
| Old commit links break                                        | B      | low now    | GitHub serves old objects while the pull request refs hold them, which D1 keeps                                                                               |
| The Pages copy stops deploying                                | C4     | very low   | Its workflow builds from fuzzley, not its own history; C4 runs it; rollback pushes the old `main` back                                                        |
| The backups are on the devbox alone                           | B2, C1 | low        | Bare mirrors and bundles, checked with `fsck`; a bundle is one file to copy elsewhere if wanted                                                               |

---

## 11. Finishing

1. Fill in §12 as each package lands: its commits, its measured figures, and
   anything that differed from this plan.
2. After B and C, record the figures: each fresh clone's `size-pack`, and
   GitHub's figure for both repositories, on the day, the day after and a
   week after.
3. Move the folder to `docs/archive/repo-size/` once C is done. Its scripts'
   paths name `docs/repo-size/`, so leave them.
4. Update the memory notes: the one for this plan, and any that names a
   deleted path.
5. Offer the user the retakes of Pong and Minesweeper at 1600 px (§4).

---

## 12. As built

**P0, 2026-11-21.** This folder was committed to `main` and pushed, as the
commit that adds it, under D7. It adds 0.09 MiB packed. The backups (D3),
`~/Projects/personal/fuzzley-backup.git` and
`~/Projects/personal/fuzzley.github.io-backup.git`, were mirrored from
GitHub right after, with their push URLs disabled.

**A, 2026-11-22.** Built on `repo-size-plan` as three commits, not pushed:
aecde12 (A1), f9a74ca (A2) and 0ea96fc (A3). Together they add 1.56 MiB
packed: A1 0.01 (its raw 0.10 MiB is the space check's tables), A2 1.55, A3
under 0.01.

What the checks found:

- **The spaces (A1, A2).** Of 378 rows on 9 screens, 153 were cut at the
  side before, down to 57% of the width shown. None are now. 111 rows were
  enlarged by more than 5%, by up to 1.48×. None are now, except Pong's and
  Minesweeper's covers, whose captures are narrower than the 2× screens want
  (up to 1.54×, as before). The tint shows on 17% of a space at most, except
  at 896 to 1080 px windows (up to 44%), on the 1024 px tablet (26%), and on
  the 360 px phone (18%), where Spider Solitaire's 1600 × 996 is 0.4% wider
  than 16:10. A2's build gives the same rows as A1's.
- **The pictures (A1).** No game is cut at its side, and Pong keeps both
  paddles in every tile. The band below Klondike is the felt's color. At a
  900 px window a faint line shows where the felt's shading ends and the
  flat tint begins.
- **In a browser (A1).** Hovering a tile still zooms its screenshot within
  the tile. Following a tile to its project page still carries the cover
  across. That transition was frozen at 25, 50 and 75% in a headless Chrome
  and compared with the live site's.
- **The schema (A2).** Pong's cover pointed at a PNG, at a WebP 1601 px wide,
  at a 2:1 WebP and at `/src/assets/…`, a path from the project's root,
  each failed with its own message. A gallery image pointed at the 16:10
  Fuzzley Games cover failed on width and shape. A 2:1 file put in place of
  `pong.webp`, with `pong.md` untouched, passed `astro check` and failed
  `astro sync --force`.
- **The tool (A2).** `pong-check` came out 1024 × 768, 1.4 KiB, with a
  bottom edge of `#736357`. A 2:1 capture, and a 16:10 one with `--gallery`,
  were refused with exit 1 and nothing written, and a missing one exited 1
  with a line saying so. No arguments, `Bad/Name` and an unknown option each
  printed the usage and exited 2. Through `yarn` from `frontend/src/`, it
  read a capture by a path relative to there. Run again on the committed
  files, it wrote them byte for byte as they were.
- **The 8 screenshots (A2)** came to 1,570 KiB (1.53 MiB), from 2,365 KiB.
  The bottom edges printed: Fuzzley Games `#0e1a2b` (32%), Klondike
  `#0d410c` (49%), Minesweeper `#0e1a2b`, Pong `#736357`, Spider Solitaire
  `#104e0f` (55%). Each is within 3 of its tint in every channel, so the
  tool says to keep each, and no tint changed beyond A1's.
- **The real build's pictures (A2),**
  [`compare-builds.txt`](data/screenshots/compare-builds.txt). At each
  screenshot's widest copy, the five former WebP ones come out closer than
  A1's (Klondike 1.37 to 1.07), Minesweeper and Pong the same, and Spider
  Solitaire closer (1.62 to 1.44). At narrower widths, lossless WebP comes
  out further off, by up to 0.55, as the research measured. Every copy
  matches
  [`encodings-plan-widths.tsv`](data/screenshots/encodings-plan-widths.tsv)
  to the hundredth, but Spider Solitaire's: A1's at 400, 480, 800, 1200,
  1280 and 1600, and A2's at 960. Astro asks sharp for a rounded height
  there, and sharp crops to it, so the copy sits a fraction of a pixel off
  the stretched reference. At 960 px A2's measures 4.36 against A1's 2.09,
  but side by side at 3× the two look the same.
- **In a browser (A2).** On the home page, the Projects page, the Solitaire
  Collection's and Spider Solitaire's pages, at 1440 × 900 at 1× and 2×, an
  820 px tablet at 2× and a 390 px phone at 3×, every image loads. The
  tablet fetches a cover's 1600 px copy and the phone a gallery image's 1200
  px copy, where the live site stops at 1280 and 800. Side by side with the
  live site, they look at least as sharp.
- **The Docker image** built from 0ea96fc, and every request in
  `deploy.yml`'s `docker` job got the status, redirect and cache header it
  expects.

Where it differs from this plan:

1. **The Projects page's cards had the wrong `sizes`** (A1). It said one
   column below 56rem and 24rem above, but the grid fits two columns from
   about 43rem and three from about 64rem. A 900 px window drew a card 7%
   wider than its copy, and an 820 px tablet fetched one twice as wide as
   needed. `sizes` now switches at 44rem and 65rem, just past where a
   desktop scrollbar moves the grid's own switches. Between the two it asks
   for too wide a copy rather than too narrow: a 1024 px tablet's cards
   fetch 1200 px copies where 800 would do. The sweep covers the Projects
   page too.
2. **The cover's view transition moved to the `<picture>`** (A1). It named
   the `<img>`, which is now taller than a 16:9 tile, and a transition draws
   a named element without its ancestors' clip. So the cut-off bottom of a
   cover showed while it moved, then vanished. `.tile-media` now clips its
   screenshot and has the tint behind it, and carries the name.
3. **The schema reads the file** (A2). In Astro 7.4.7 the content layer
   gives `image()` a path marked `__ASTRO_IMAGE_`, not the image's size, so
   the `refine()` calls of §5 failed every screenshot. The helper uses
   `superRefine` and Astro's `imageMetadata`. §3, §5 and §10 now say so.
4. **The bottom edge is the mean of its commonest color's pixels,** not the
   6-bit bin's middle, so Pong's reads `#736357` rather than `#726256`. And
   rather than only print it, the tool compares it with the project's tint:
   within 4 in every channel it says to keep the tint, and otherwise what to
   set it to. Without that, AGENTS.md's rule would have had the next agent
   change three tints no one can tell apart.
5. **[`compare-builds.mjs`](scripts/screenshots/compare-builds.mjs) lists
   the reference with `git ls-tree --full-tree`.** Without it, run from
   `frontend/`, git lists nothing.
6. **`yarn check` and `yarn verify` run `astro sync --force` first** (A2).
   Astro checks a project file against the schema again only when the file
   changes, and keeps the result in `node_modules/.astro`. So a screenshot
   retaken in place, or a cap raised in `image-widths.ts`, passed a local
   check. CI and the Docker build start without that cache, so they would
   have failed, but only after the push that deploys.
7. **The schema fails a path that isn't relative to the project file,**
   which it can't read, rather than passing it.

**The review** read the three commits against §5 and §6 and found nothing
that breaks the site or the tool. Each finding was taken, in `fixup!` and
`amend!` commits folded in before the report: items 1, 4, 6 and 7 above;
the tool's capture path, which an `INIT_CWD` left by an outer process could
send astray when run as `node tools/screenshot.mjs`; DEVELOPMENT.md and
AGENTS.md saying the schema fails any screenshot the tool didn't write,
where it checks form, width and shape; a stale comment in `slots.mjs`; and
a figure in A2's message. The space check was then run again on both
commits' builds, and the Docker image built again.

**Not pushed.** A push to `main` deploys at once, so it waits for the
user's word (§7).

**B and C, 2026-11-22,** run on the user's word ("Do it now") straight after
A went live, from the main checkout's scripts at A's tip, with
`WORK=~/Projects/personal/repo-rewrite-fuzzley-2026-11-22`.

- **Before.** No pull request was open and `main` was the only branch.
  `04-local-clones.sh` found no commits that no remote held and no stash in
  the two local copies. The plan's worktree was removed and its branch
  deleted, as its work was on `main`. There was no separate rehearsal the
  day before: B3 to B5 ran the same checks on the day's mirror before the
  push.
- **B1.** Update games was disabled. No run was in progress, the last Verify
  and deploy had passed, and fuzzley.info served `main`'s tip, c11b0db, a
  hash only the backup holds now.
- **B2.** The backup was fetched to the same 4 refs as the fresh mirror
  (`main` and 3 pull request refs), cut off from GitHub, and passed
  `fsck --full`. `~/Projects/personal/fuzzley-pre-rewrite.bundle` (164 MiB)
  records the complete history, and `fuzzley-backup.refs.txt` its refs.
- **B3 and B4.** The r3 rewrite left `main`'s tree with 0 differences, kept
  all 243 commits, and got 0 message references wrong. fsck ok. Its
  `size-pack` is 2.1 MiB, against the 2.00 that `08-after-plan.sh`
  projected before P0 and A were committed.
- **B5.** 160 commits named across docs/, fuzzley-games' docs and the
  memory notes, none ambiguous or lengthened, and a second pass found
  nothing to replace.
- **B6 and B7.** `main` went from c11b0db to f9ebd34, leased. Verify and
  deploy passed, and fuzzley.info and the Pages copy served f9ebd34.
- **B8.** 66 hashes in 6 files under docs/, as B5 counted for them, now name
  the new commits, in e2ee899. `yarn verify` passed and the site deployed
  it. In the memory notes, 12 hashes in 4 files were rewritten. None was
  removed by hand: each says where work landed.
- **B9.** Update games was enabled again, and its run by hand passed. Both
  games were up to date, so it pushed nothing.
- **B10.** GitHub's figure for fuzzley was 168,573 KB on the day, as before.
- **B11.** `~/Projects/personal/fuzzley` was moved to `fuzzley-old` and
  cloned again: `size-pack` 2.21 MiB, at e2ee899. The old copy held nothing
  that wasn't pushed, and its local config only the remote. It is kept until
  the user says otherwise. Any clone on the Windows side is the user's to
  clone again.
- **C1.** The Pages repository's backup was fetched to `main`, d1f81f2, cut
  off from GitHub, and passed `fsck --full`. Its bundle is
  `fuzzley.github.io-pre-rewrite.bundle` (138 MiB).
- **C2 and C3.** The rewrite kept `main`'s tree the same and all 117
  commits, fsck ok, and took a repack from 126.41 MiB to 23.69 KiB. `main`
  went from d1f81f2 to 2b304d5, leased.
- **C4.** The Pages deploy, run by hand, passed, and fuzzley.github.io
  served e2ee899. The freeze ended there.
- **C5.** GitHub's figure for fuzzley.github.io was 140,846 KB on the day,
  as before. A fresh clone is 23.69 KiB. GitHub's figures for both are still
  to be read on 2026-11-23 and 2026-11-29.
- **B12.** The two backup repositories and their bundles are kept until at
  least 2027-02-22. The dry runs' folder and `$WORK` were deleted. The day's
  records and both commit maps, which a rollback after new commits needs,
  are kept in `~/Projects/personal/fuzzley-rewrite-records-2026-11-22/`.

Left: GitHub's figures on 2026-11-23 and 2026-11-29, then moving this folder
to `docs/archive/repo-size/` (§11).
