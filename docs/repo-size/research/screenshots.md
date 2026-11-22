# Screenshots: what they cost history, and how to make each retake cheaper

Written 2026-11-21, against `main` at d13a053. The scripts are in
[`../scripts/screenshots/`](../scripts/screenshots/), and what they printed
is in [`../data/screenshots/`](../data/screenshots/). sharp is 0.35.5, the
version Astro uses here, with libvips 8.18.7 and libwebp 1.6.0.

## Summary

§1 to §4 were measured at the site's widths today. Once the user answered
the plan's D2, §5 and §6 measured how the pages fit the screenshots and
what wider copies would need, and the last two points below are the
result.

- **The site's images are small next to the old game builds,** but they are
  what keeps growing. Since 2016, 15 commits brought new site images into
  history, 5.19 MiB packed. The largest, ca4e5fc on 2026-10-25 ("sharpen the
  project screenshots"), added 2.29 MiB on its own.
- **Lossless WebP neither compresses nor deltas in git.** A retake adds its
  full size, every time.
- **Each screenshot is committed larger than the site ever draws it.** The
  site draws a cover at 1280 px at most, and a gallery image at 800, but the
  committed files are up to 2880 px wide.
- **Committed at that widest size, as lossless WebP, the 8 screenshots are
  44% of today's bytes:** 1.02 MiB rather than 2.31.
  - At the widest size, which the site sends to every 2× and 3× screen,
    what a visitor gets is closer to the capture than today's.
  - At the widths in between, it is 10% further from the capture than
    today's on average, and 1.7 times as far at worst.
- **As lossless PNG at the same size, they are 65% of today's bytes,** and
  8% closer to the capture than today's on average. sharp decodes a WebP
  file at a reduced size before it resizes it, and a PNG file at full size.
- **Lossy WebP at the captured size is no use:** 50% of today's bytes,
  larger than lossless WebP at the cap, and further from the capture on
  average and at the widest width.
- **What a visitor can see is elsewhere** (§5, added once the user answered
  D2). Every space cuts its screenshot to fill its box, and on windows from
  896 to about 1180 px the home page stretches its tiles so far that Pong's
  shows one paddle. And the site's widths stop short of 2× tablets and 3×
  phones, so their browsers enlarge a copy by up to 1.5×.
- **So the plan fills each space's width, and widens the widths** to 1600
  for a cover and 1200 for a gallery image. Lossless WebP at those caps is
  66% of today's bytes, closer to the capture than today at the widest
  width, and 0.11 of a level further on average (§6).

## 1. What the site draws, and from what

The screenshots are in `frontend/src/assets/projects/`. Each is named in a
project's content file, as its `cover` or as an image in its `gallery`.
Astro's `<Picture>` makes AVIF images at each width it is given, with a WebP
fallback. Its sharp service resizes with sharp's defaults: lanczos3, never
enlarged, and with shrink-on-load for a JPEG or WebP source (below). It
encodes at sharp's defaults, AVIF at 50 and WebP at 80, since no quality is
given.

| Where                                | Drawn from       | Widths (px)         |
| ------------------------------------ | ---------------- | ------------------- |
| Home page's feature and wide tiles   | cover            | 480, 720, 960, 1280 |
| Home page's small tiles              | cover            | 320, 480, 640       |
| Projects page's cards                | cover            | 400, 640, 800       |
| A project page's cover               | cover            | 480, 720, 960, 1280 |
| A project page's link preview (JPEG) | cover            | 1200                |
| A project page's gallery             | a gallery image  | 400, 640, 800       |
| Home page's photo                    | `profile/me.jpg` | 80, 160             |

So no visitor is ever sent a cover wider than 1280 px, or a gallery image
wider than 800. The browser picks from those widths by the `sizes` the page
gives. On a 2× or 3× screen it picks the widest, for a phone or a laptop
alike. A 1× screen gets 720 for a wide cover and 400 for a gallery image.

What is committed today ([`encodings.tsv`](../data/screenshots/encodings.tsv)):

| File                      | Size (px)   | Form          |         KiB | Used as |
| ------------------------- | ----------- | ------------- | ----------: | ------- |
| `fuzzley-games.webp`      | 1920 × 1200 | lossless WebP |       367.5 | cover   |
| `minesweeper.png`         | 1200 × 900  | PNG           |        71.2 | cover   |
| `pong.png`                | 1024 × 768  | PNG           |         5.4 | cover   |
| `solitaire-klondike.webp` | 2560 × 1600 | lossless WebP |       307.4 | cover   |
| `solitaire-freecell.webp` | 2880 × 1620 | lossless WebP |       431.5 | gallery |
| `solitaire-pyramid.webp`  | 2880 × 1620 | lossless WebP |       424.9 | gallery |
| `solitaire-spider.webp`   | 2880 × 1620 | lossless WebP |       241.5 | gallery |
| `spider.png`              | 1684 × 1048 | PNG           |       515.1 | cover   |
| **All 8**                 |             |               | **2,364.5** |         |

ca4e5fc's message says why they are this size. The covers had been lossy 1x
shots, and looked soft once a 16:9 shot filled a 16:10 box. So they were
retaken as lossless captures at twice the size. The three gallery images are
fuzzley-games' lossless PNG originals (`docs/screenshots/<id>/overview.png`),
which fuzzley-games' own plan deletes in its step A3.

## 2. Churn

From [`churn.tsv`](../data/screenshots/churn.tsv), by
[`churn.sh`](../scripts/screenshots/churn.sh). Each row counts only the
image blobs a commit brought into history, those none of its ancestors had.
So a file moved by the move into `frontend/` counts once.

| Commit  | Date       | Images | Packed (KiB) | What                                                   |
| ------- | ---------- | -----: | -----------: | ------------------------------------------------------ |
| 7b3227d | 2016-08-28 |     20 |      1,070.4 | the first site                                         |
| 28949f4 | 2026-07-12 |      1 |        431.6 | the Solitaire Collection's first screenshot            |
| 4d83cf4 | 2026-10-10 |     14 |        216.1 | the old site's images as WebP                          |
| 90c7129 | 2026-10-10 |      4 |        700.3 | the Astro rebuild's screenshots                        |
| 47bda53 | 2026-10-25 |      1 |         57.8 | Fuzzley Games' screenshot                              |
| aa8a510 | 2026-10-25 |      5 |        317.5 | Minesweeper and the Solitaire Collection, retaken      |
| ca4e5fc | 2026-10-25 |      7 |      2,289.3 | every screenshot retaken at 2×, lossless               |
| 8 more  |            |     17 |        234.7 | the photo, the favicons, the link preview, small icons |
| **All** |            | **69** |  **5,317.7** |                                                        |

- **Packed is almost the same as raw** (5,494.6 KiB raw). WebP, PNG and JPEG
  are already compressed, and git finds no deltas between two captures.
- **Retakes follow changes:** the Astro rebuild (90c7129), the games' new
  look on fuzzley.games (aa8a510), and a fix for soft covers (ca4e5fc). More
  will come while Fuzzley Games keeps changing how its games look.
- **The photo, the favicons, the link preview and the old site's icons**
  are 235 KiB across 8 commits since 2016. They aren't worth a rule.

## 3. Encodings

_Measured at the site's widths today. §6 measures the forms at the plan's._

From [`encodings.tsv`](../data/screenshots/encodings.tsv) and
[`encodings-widths.tsv`](../data/screenshots/encodings-widths.tsv), by
[`encodings.mjs`](../scripts/screenshots/encodings.mjs). The cap is the
widest picture drawn from the image: 1280 for a cover, 800 for a gallery
image, or the image's own width if that is less.

**How each form was judged.** For each width the site draws, the script
makes what a visitor gets from the form:

1. sharp resizes the form's file with its defaults, as Astro does.
2. It encodes the result as AVIF at sharp's default quality.
3. It decodes it again.

It compares that with a **reference**: the capture's own pixels, decoded in
full and resized to the same size with lanczos3 alone. That is the best any
form could give back. The **error** is the mean change in a channel, of 255.
Today's committed files have an error too, from the resize and from the AVIF
encode, so they are a row of their own, not the reference.

**Shrink-on-load.** sharp decodes a JPEG or WebP file at a reduced size when
it is to be resized, then finishes with lanczos3. This saves time, and costs
some sharpness. It is on by default, and Astro gives no way to turn it off. A
PNG is decoded in full. So the same pixels resize a little better from a PNG
than from a WebP. Minesweeper shows it plainly: the same 1200 × 900 pixels
are 1.28 from today's PNG, and 1.55 as lossless WebP.

| The 8 screenshots as  |   KiB | Of today | Error, every width | Error, the widest width |
| --------------------- | ----: | -------: | -----------------: | ----------------------: |
| Today                 | 2,365 |     100% |               1.96 |                    1.53 |
| Lossless WebP, capped | 1,046 |      44% |               2.15 |                    1.36 |
| Lossless PNG, capped  | 1,548 |      65% |               1.80 |                    1.36 |
| q90 WebP, full size   | 1,171 |      50% |               2.27 |                    1.88 |

Some widths, from the widths file:

| Image                       | Width | Today | Lossless WebP, capped | Lossless PNG, capped | q90 WebP, full size |
| --------------------------- | ----: | ----: | --------------------: | -------------------: | ------------------: |
| Klondike, cover (cap 1280)  |  1280 |  1.41 |                  1.22 |                 1.22 |                1.70 |
|                             |   960 |  1.78 |                  2.08 |                 1.58 |                2.06 |
|                             |   720 |  2.04 |                  2.23 |                 1.80 |                2.29 |
| FreeCell, gallery (cap 800) |   800 |  2.43 |                  2.02 |                 2.02 |                2.67 |
|                             |   640 |  2.76 |                  3.67 |                 2.67 |                2.97 |
|                             |   400 |  3.71 |                  3.91 |                 3.17 |                3.89 |
| Spider Solitaire, cover     |  1280 |  1.78 |                  1.78 |                 1.78 |                2.55 |
|                             |  1200 |  1.56 |                  2.62 |                 1.77 |                2.57 |
|                             |   640 |  2.19 |                  2.44 |                 3.16 |                2.82 |

What the figures say:

- **At the widest width, both lossless forms beat today's 5 WebP files,**
  and match the 3 PNGs. At that width nothing is resized, so the visitor gets
  the capped copy, which was made from the capture decoded in full. Today's
  WebP files, 1920 to 2880 px wide, are shrunk on load first. The widest
  width is what 2× and 3× screens get.
- **At the widths in between, lossless WebP pays for shrink-on-load.** It is
  10% further from the capture than today on average, and 1.7 times as far
  at worst (Spider Solitaire at 1200). These are the widths a 1× or 1.5×
  screen gets.
- **Lossless PNG is as close as today, or closer, at 47 of the 54
  widths,** and 8% closer on average. Its worst is Spider Solitaire at 640, 1.4 times as far
  as today. Spider Solitaire's capture, at 1684 px, is too close to its cap
  for a second resize to come out clean.
- **Lossy WebP at full size is no use.** It is larger than lossless WebP at
  the cap, and further from the capture than lossless PNG at 53 of the 54
  widths, and than lossless WebP at 41. WebP's lossy form
  always halves color resolution, and the red and black suits on green show
  it most.

None of these errors was looked at by eye. A mean of 2 or 3 levels in 255 is
small beside what the AVIF encode already does, but the gallery is the
site's shop window. So the choice is the user's (the plan's D2), and they
may want to see samples first.

## 4. Options

_Measured at the site's widths today. §6 measures the forms at the plan's._

All of these are about what new retakes add. What is already in history
goes only with a rewrite, which [`history-rewrite.md`](history-rewrite.md)
covers. Its rule keeps the tip's images and strips every older version, so
the smaller the tip's, the smaller the result.

### (a) Commit each screenshot at the widest size the site draws it

Lossless WebP, at the cap. A full retake of all 8 then adds 1.02 MiB at
most, against 2.29 MiB for ca4e5fc. A Solitaire gallery image adds 82 to
113 KiB, against 241 to 431.

- _Work:_ small.
  - One module holds the widths that the components, the content schema and a
    script share.
  - The schema fails a cover wider than 1280 px, a gallery image wider than
    800, or one in the wrong format. Astro's `image()` gives each image's
    width and format to `refine()`.
  - A script, `yarn screenshot`, writes an image in that form. It decodes the
    capture in full before resizing it, so shrink-on-load doesn't blur the
    copy.
- _Risk:_
  - A layout that later draws a screenshot wider needs it retaken. Nothing
    fails when that happens: Astro serves the committed width.
  - The small loss at the widths in between, measured above.

### (b) The same, as lossless PNG

The same cap, and 1.51 MiB for a full retake: half again as much as (a), and
still 65% of today. It is the choice if no width should come out worse than
today's on average.

### (c) A gate, as fuzzley-games has

fuzzley-games' capture scripts retake every game's images at once. A gate
there keeps a committed image whose pixels moved by 48 levels at most.
Nothing here retakes in bulk: each screenshot is taken by hand, for a reason.
So a gate would catch nothing, and isn't built.

### (d) Take Fuzzley Games' screenshots from fuzzley.games

The Solitaire Collection's and Minesweeper's pictures come from
fuzzley-games. Two ways to share them:

- **Fetch them at build time,** as the games are fetched. But fuzzley.games
  keeps no old versions, so a pinned hash breaks at its next retake. A pin
  on a fuzzley-games commit's raw file breaks once that repository's own
  history rewrite changes its hashes. Either way the build would depend on
  another site for about 0.5 MiB.
- **Copy its committed `preview.webp`,** 2560 × 1440 at q80, rather than
  making a new capture. This costs nothing and keeps the two sites alike,
  but it only fits where the framing does. The Klondike cover is a 16:10
  capture at a size of its own. Kept as a rule: a "where it fits", not a
  must.

### (e) Git LFS, or a separate store

fuzzley-games' research weighed both ([`research/screenshots.md`][fgs] §4
there). Here the case is weaker still:

- After (a), a full retake adds about 1 MiB.
- Cloud Run's build would need LFS credentials, or a fetch step.
- The GitHub Pages copy builds in another repository's workflow, which would
  need the same.
- A pull request would no longer show a screenshot's change.

[fgs]: https://github.com/fuzzley/fuzzley-games/blob/main/docs/repo-size/research/screenshots.md

### Recommendation

**Do (a). Choose (b) instead if the in-between widths matter more than the
bytes. Copy Fuzzley Games' `preview.webp` where its framing fits. Don't do
(c) or (e), or (d)'s fetch.**

That was the recommendation at today's widths. After the user's answer to
D2, §5 and §6 change it: fill each space's width, extend the widths to 2×
tablets and 3× phones, and do (a) at the caps that follow, 1600 and 1200.
(b) at those caps costs as much as today. A `preview.webp` from
fuzzley-games is 16:9, so it fits the gallery, and not a cover.

## 5. How the pages fit them

Added on 2026-11-21, after the user answered D2: "We want to maintain high
image quality and we want to make sure aspect ratio of images doesn't result
in odd looking images when fit into different sections of a page where they
are used now".

From [`slots.tsv`](../data/screenshots/slots.tsv), by
[`slots.mjs`](../scripts/screenshots/slots.mjs). It opens the built site in a
headless Chrome, makes every image load, and records each screenshot's space,
how much of the screenshot it shows, and the copy the browser picked. It
does so at 9 screens: desktops at 2560 and 1920 px, laptops at 1440 (2×)
and 1280, a 900 px window, tablets at 1024 and 820 (2×), and phones at 390
and 360 (3×). With `--sweep`, it opens the home page and the Solitaire
Collection's page at each window width from 896 to 1366
([`home-stretch.tsv`](../data/screenshots/home-stretch.tsv)). With
`--shots`, it writes a PNG of every space, which is how the crops below were
looked at.

### How a space draws a screenshot today

Every space fills its box with the screenshot, with `object-fit: cover` from
the top left (`.tile-media img` in `global.css`). A screenshot wider than
its box loses its right side, and one narrower loses its bottom.

| Space                                           | Its box                                                      | Drawn there                  |
| ----------------------------------------------- | ------------------------------------------------------------ | ---------------------------- |
| Home page's small tiles, More projects, the 404 | 4:3                                                          | any cover                    |
| Home page's wide tiles (slots 3 and 4)          | 16:9                                                         | Klondike's and Spider's      |
| Home page's feature                             | 1.32 to 1.57 on wide screens; 4:3 below 56rem                | Fuzzley Games'               |
| Projects page's cards                           | 16:10                                                        | every cover                  |
| A project page's cover                          | 16:10 below 56rem; above, as tall as the intro: 1.39 to 1.69 | its own cover                |
| A project page's gallery                        | 16:9                                                         | the gallery images, all 16:9 |

Three covers are 16:10 (Fuzzley Games, Klondike, and Spider Solitaire at
1.607), and two are 4:3 (Minesweeper and Pong). On most screens:

- A 16:10 cover in a 4:3 tile loses its right sixth. Klondike's seventh
  column is cut in half, and Spider Solitaire's tenth.
- A 4:3 cover in a 16:10 card loses its bottom sixth, and in a project
  page's cover on a desktop its bottom fifth.
- A 16:10 cover in a 16:9 tile loses its bottom tenth.
- The gallery fits exactly.

### Squeezed spaces, from 896 to about 1180 px

On wide screens the home page sets its game tiles beside the Now card, and
stretches them to the card's height "where the card beside them is a little
taller" (`index.astro`). From 896 px, where that layout starts, to about
1180, the card is much taller. So the tiles stretch well past their shape,
and the project page's cover, beside a tall intro, does too
([`home-stretch.tsv`](../data/screenshots/home-stretch.tsv)):

| Window | Small tile's shape | Pong's width shown | Klondike's wide tile | Its width shown | Klondike's project cover | Its width shown |
| -----: | -----------------: | -----------------: | -------------------: | --------------: | -----------------------: | --------------: |
|    896 |               0.75 |                56% |                 1.18 |             74% |                     1.02 |             64% |
|   1024 |               0.98 |                74% |                 1.44 |             90% |                     1.38 |             86% |
|   1120 |               1.15 |                86% |                 1.61 |            100% |                     1.50 |             94% |
|   1180 |               1.33 |               100% |                 1.78 |            100% |                     1.61 |            100% |

At 1024, a landscape iPad's width, Pong's tile shows one paddle and
Minesweeper's board loses its right edge. These are the odd crops.

### Copies too small for the screen

The browser picks a copy by the `sizes` the page gives, which is the box's
width ([`slots.tsv`](../data/screenshots/slots.tsv), the "enlarged" column).
Two things make it enlarge the copy it picks:

- **The widths stop short of 2× tablets and 3× phones.** On an 820 px tablet
  at 2×, a wide cover is drawn 1,576 device pixels wide from a 1280 copy
  (1.23×), and on a 390 px phone at 3×, a card or a gallery image 1,076 wide
  from an 800 copy (1.35×).
- **A screenshot cut at its sides is drawn wider than its box,** which
  `sizes` doesn't know. On that tablet the feature is drawn 1,893 pixels
  wide from a 1280 copy (1.48×), and a small tile 942 from a 640 (1.47×).

Pong's and Minesweeper's captures are only 1024 and 1200 px wide, so they
are enlarged on that tablet whatever the widths: Pong's cover 1.54×. This
enlarging is the softness a visitor can see. The differences between forms
in §3 are a fraction of a level in 255.

### Filling the width instead

A prototype build drew every screenshot at its space's full width, from the
top, with its height following:

```css
.tile-media img {
  width: 100%;
  height: auto;
}
```

in place of `height: 100%; object-fit: cover; object-position: left top`.
[`slots-fill-width.tsv`](../data/screenshots/slots-fill-width.tsv) has its
figures:

- **No space cuts a screenshot's sides,** on any screen or window measured.
- **A space taller than the screenshot shows the tile's tint below it.**
  Under a 16:10 cover in a 4:3 tile that is 17% of the tile, where the name
  and the Play button sit. In the squeezed spaces it is up to 43% (a small
  tile at 900 px), and 36% under Klondike's project cover.
- **A space wider than the screenshot cuts its bottom,** as today.
- **`sizes` is then the drawn width,** so the feature on the 820 px tablet
  needs 1,576 pixels rather than 1,893.

Looked at in the PNGs: Klondike shows all seven columns in every space,
Pong both paddles even in a 0.75 tile, and Fuzzley Games' page its whole
width.

### The tint's seam

The tint then shows where the screenshot doesn't reach. It reads as part of
the picture only if it is the color of the screenshot's bottom edge. The
commonest color along each cover's bottom 2%:

| Cover            | Bottom edge, mostly | Tint      |
| ---------------- | ------------------- | --------- |
| Pong             | `#726256`           | `#74665a` |
| Minesweeper      | `#0e1a2a`           | `#0e1a2b` |
| Fuzzley Games    | `#0e1a2a`, 33%      | `#0e1a2b` |
| Klondike         | `#0e420e`           | `#135c2b` |
| Spider Solitaire | `#124e0e`           | `#0f4d0e` |

Only the Solitaire Collection's tint is far enough off to show as a lighter
band. The tint is used for nothing but the color behind a screenshot, so it
can follow the felt. Fuzzley Games' bottom edge is a row of thumbnails on
its page's color, which is the tint.

### Widths that reach 2× tablets and 3× phones

With the width filled, each space needs, at most, over the 9 screens
([`slots-fill-width.tsv`](../data/screenshots/slots-fill-width.tsv), the
"needed" column):

| Space                                       | Needs (device px)    | Widths today        | The plan's                |
| ------------------------------------------- | -------------------- | ------------------- | ------------------------- |
| Home page's feature and wide tiles, a cover | 1,576 (820 px at 2×) | 480, 720, 960, 1280 | 480, 720, 960, 1280, 1600 |
| Home page's small tiles                     | 778 (820 px at 2×)   | 320, 480, 640       | 320, 480, 640, 800        |
| Projects page's cards                       | 1,074 (390 px at 3×) | 400, 640, 800       | 400, 640, 800, 1200       |
| A project page's gallery                    | 1,074 (390 px at 3×) | 400, 640, 800       | 400, 640, 800, 1200       |

1200 rather than 1080 covers a 430 px phone at 3× too, which needs 1,194.
So the caps become 1600 for a cover and 1200 for a gallery image.

## 6. The forms at the plan's widths

From [`encodings-plan.tsv`](../data/screenshots/encodings-plan.tsv) and
[`encodings-plan-widths.tsv`](../data/screenshots/encodings-plan-widths.tsv),
by `encodings.mjs` with `plan`: the same measure as §3, at the plan's widths
and caps. "Today" is today's files served at those widths.

| The 8 screenshots as  |   KiB | Of today | Error, every width | Error, the widest width |
| --------------------- | ----: | -------: | -----------------: | ----------------------: |
| Today                 | 2,365 |     100% |               1.85 |                    1.30 |
| Lossless WebP, capped | 1,571 |      66% |               1.96 |                    1.13 |
| Lossless PNG, capped  | 2,309 |      98% |               1.67 |                    1.13 |
| q90 WebP, full size   | 1,171 |      50% |               2.17 |                    1.74 |

- **Lossless WebP** is closer than today at the widest width, which 2×
  and 3× screens get, and 6% further on average: 0.11 of a level.
- **Lossless PNG** is closer everywhere, but costs 98% of today's bytes, so
  a retake would save nothing.
- **A gallery image** is 136 to 192 KiB as lossless WebP, against 241 to 431
  today, and **Klondike's cover** 239 KiB against 307.
- **Fuzzley Games' cover comes out larger at 1600 px than today at 1920**
  (380 KiB against 367). It is a page of flat colors, and resizing it
  blends them into many more, which lossless compression pays for.
- [`08-after-plan.sh`](../scripts/history/08-after-plan.sh), run again at
  these caps: Part A adds 1.54 MiB, and after A and B a clone is 2.00 MiB
  ([`after-plan.txt`](../data/history/after-plan.txt)).

## What couldn't be verified

- **How the forms look.** The errors are measured, not judged by eye, and
  only as AVIF. The WebP fallback, which only browsers without AVIF get, was
  not measured.
- **The filled width at every window size.** The prototype was measured at
  9 screens and looked at in their PNGs, not at every width between them,
  and not with the plan's widths, which it didn't have.
- **Astro's own output** was not compared. The script resizes and encodes as
  Astro's sharp service does, but it doesn't run Astro. Part A's checks
  compare the real build's images.
- **Other ways around shrink-on-load.** sharp's `fastShrinkOnLoad: false`
  would help a WebP source, but Astro's sharp service doesn't pass it, and
  the plan doesn't patch Astro.
