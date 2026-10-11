# Game builds work log

A running record of the work on how the games' builds get into this site:
what was decided, what is done, and exactly where to pick up. Newest log
entries go at the bottom of [Log](#log); update [Status](#status) whenever a
step finishes.

This is item 29 of the code health review: ship only the files each game
uses (short term), and choose where game builds should live (long term, see
[game-builds.md](game-builds.md)).

## Status

| Phase                                         | State      |
| --------------------------------------------- | ---------- |
| 1. Trim unused files from the game builds     | Done, live |
| 2. Option E: releases and a pinned manifest   | Done, live |
| 3. fSolitaire rules screenshots as WebP       | Done, live |
| 4. Minified vendor scripts in the older games | Done, live |

- **Working on:** confirming that Update games runs on its schedule (see the newest log entry). Otherwise every phase is done; the owner still needs to revoke the old token.
- **Pushing:** the owner approved pushing each step once it is verified
  (2026-10-10). Changes to how this repository builds go through a pull
  request first, so CI can build the Docker image; Docker isn't installed
  on the development machine.

## Decisions

Agreed with the owner on 2026-10-10.

| Topic           | Decision                                                                                                  |
| --------------- | --------------------------------------------------------------------------------------------------------- |
| Long-term model | Option E in game-builds.md: each game publishes a release asset; `frontend/games.json` pins one per game. |
| Releases        | One rolling release per game, not one per deploy.                                                         |
| Bumps           | Automatic, every 15 minutes, with no extra token. Merged without review once the build passes.            |
| WebP, minifying | Separate steps, after option E (so their new files never enter this repository's history).                |

## Design for option E

- **Release.** Each game repository has one release, tag `site-build`,
  never marked "latest". Every deploy uploads `<slug>-<short sha>.tar.gz`
  (its `dist/`, packed) and then replaces `latest.json`, which names that
  archive with its SHA-256 and commit. The tag moves to the deployed
  commit. The deploy job uses its own `GITHUB_TOKEN`; no token for this
  repository is involved.
- **Pins survive the rolling release.** A rolling release that kept only
  the newest archive would break any build of this repository between a
  game deploy and the next bump, and make rollback impossible. So each
  deploy keeps the ten newest archives plus whichever one `games.json` on
  this repository's `main` pins (read from raw.githubusercontent.com,
  which needs no token), and deletes the rest.
- **Manifest.** `frontend/games.json` maps each slug to its repository,
  commit, archive name and SHA-256. Download URLs are
  `https://github.com/<repo>/releases/download/site-build/<asset>`, which
  don't count against GitHub's API rate limit.
- **Fetching.** `frontend/tools/fetch-games.mjs` downloads each pinned
  archive into `node_modules/.cache/games/`, checks its SHA-256 and unpacks
  it into `public/projects/<slug>/play/` (git-ignored). It does nothing
  when `PLAY_ORIGIN` is set or when the installed copy already matches.
  `yarn dev` and `yarn build` run it first; Yarn 4 has no `pre` scripts.
  The Docker build needs no change, since it runs `yarn build`.
- **Bumping without a token.** A scheduled workflow here
  (`update-games.yml`, every 15 minutes) reads each game's `latest.json`,
  updates `games.json`, runs `yarn build`, and pushes the commit to `main`
  with its own `GITHUB_TOKEN`. A pull request opened with `GITHUB_TOKEN`
  would never get CI runs (GitHub doesn't start workflows from that
  token's events), so it couldn't auto-merge on passing checks; running
  the build inside the bump job is the check instead. Cloud Run still
  deploys the push, since its trigger is a GitHub App, not a workflow.
- **Failed bumps.** If the build fails, nothing is pushed and the job
  opens an issue named after the archive. Later runs skip any archive
  with an open issue, so a bad build doesn't fail every 15 minutes; the
  next good deploy, or closing the issue, retries.

### Commits on `main` (phase 1)

| Repository   | Commits                | What                                                          |
| ------------ | ---------------------- | ------------------------------------------------------------- |
| fuzzley      | `063efcc` to `c24957c` | This log, the long-term plan, the trimmed copies (`bd108a5`). |
| fMinesweeper | `247f16a`              | Deletes 21 unused files from `public/` (1.1 MiB).             |
| fPong        | `229f43b`              | Deletes 11 unused files from `public/` (2.0 MiB).             |
| fSpider      | `b984747`              | Deletes 8 unused files from `public/` (2.5 MiB).              |
| PATH         | `e346f36`              | Deletes 26 unused files from `public/` (1.4 MiB).             |
| fSolitaire   | none                   | Nothing to change: its build ships only what it loads.        |

## How to resume

1. Read the newest [Log](#log) entry and its "Next" line.
2. Check the [Checklist](#checklist) for the remaining work.
3. In each repository, `git status` and `git log --oneline origin/main..`
   show anything committed but not yet pushed.
4. `gh release view site-build --repo fuzzley/<game>` shows a game's
   release; `frontend/games.json` shows what the site pins.

The game repositories are cloned beside this one, in `~/Projects/`:
`fSolitaire`, `fSpider`, `fMinesweeper`, `fPong` and `PATH`.

## Checklist

Phase 2, option E (steps follow the migration plan in game-builds.md):

- [x] 1. fPong publishes a `site-build` release (sync kept for now)
- [x] 2. `games.json` and `fetch-games.mjs`, checked against the committed copy
- [x] 3. Pong switched: folder out of git, CI builds the Docker image, live check
- [x] 3b. fPong's sync step removed
- [x] 4. `update-games.yml` bumps the manifest; tried by hand
- [x] 5. fMinesweeper, fSpider, PATH, then fSolitaire moved over
- [x] 6. Delete `MAIN_REPO_DEPLOY_PAT` everywhere; README and docs updated
- [ ] Owner: revoke the personal access token behind `MAIN_REPO_DEPLOY_PAT`

Phase 3, fSolitaire WebP screenshots:

- [x] Rules screenshots served as WebP; its tools and specs updated

Phase 4, minified vendor scripts:

- [x] fPong, fMinesweeper, fSpider, PATH serve minified vendor scripts, each tested

Phase 1, trim (done):

- [x] Work out which files each game loads
- [x] fMinesweeper: delete the unused files from `public/`
- [x] fPong: delete the unused files from `public/`
- [x] fSpider: delete the unused files from `public/`
- [x] PATH: delete the unused files from `public/`
- [x] fSolitaire: confirm nothing unused ships
- [x] fuzzley: trim the deployed copies to match (`bd108a5`)
- [x] Check every game plays from a local build
- [x] Long-term plan in `docs/game-builds.md`
- [x] Push to `main` and delete the branches (see [Shipping](#shipping))
- [x] Owner: choose a long-term option and answer the open questions

## Shipping

Done on 2026-10-10, in this order:

1. This repository's `main` fast-forwarded to `c24957c` and pushed first,
   so the game deploys would find their trimmed folders already here.
   `deploy.yml` passed `verify` and the GitHub Pages deploy.
2. fMinesweeper, fPong, fSpider and PATH fast-forwarded and pushed. Each
   deploy job rebuilt its game and logged "No changes in ... production
   build. Skipping commit.", which confirms the trimmed copies here match
   what each game now builds.
3. The `trim-game-builds` branches deleted. They were never pushed.
4. Cloud Run rebuilt on its own; `https://fuzzley.info/version.json`
   reported `c24957c` about ten minutes after the push.

## Log

### 2026-10-10: setup

- Created `trim-game-builds` from `main` at `3f97037`.
- Cloned fSpider, fMinesweeper, fPong and PATH beside fSolitaire.
- How the games ship today: each game repository's `deploy.yml` builds with
  Vite on every push to its `main`, then clones this repository with the
  `MAIN_REPO_DEPLOY_PAT` secret, replaces
  `frontend/public/projects/<slug>/play/` with its `dist/`, and pushes a
  `chore(deploy): sync ...` commit to `main`. The four older games keep their
  vendor scripts, styles and fonts in `public/`, which Vite copies into
  `dist/` untouched, used or not.
- Measured: game builds are about 157 MiB of this repository's 160 MiB
  pack, and 92 of its 182 commits are syncs (80 from fSolitaire since
  2026-07-12).
- Next: trace which files each game loads.

### 2026-10-10: the short-term trim

Commits: fuzzley `bd108a5`; fMinesweeper `247f16a`, fPong `229f43b`,
fSpider `b984747`, PATH `e346f36`. Each commit message lists what it
removes and why.

- **How the files were found.** A throwaway Node script started at each
  game's `index.html` and followed `src`/`href`, CSS `url()` and
  `@import`, `sourceMappingURL` comments and path-like strings in scripts.
  Any file whose name appeared anywhere in a loaded file was kept, so paths
  built at runtime survive. Every leftover file was then checked by hand,
  and a final grep confirmed no kept file names a removed one.
- **What went.** The unused twin, minified or not, of each script and
  style that `index.html` loads (mostly the minified one), unused
  Bootstrap and Material themes, jQuery Validation, the Application
  Insights SDK, Visual Studio helpers (`_references.js`, `-vsdoc.js`,
  `.intellisense.js`), Font Awesome's IE7 stylesheets and desktop `.otf`
  files, Spider's source SVG for its card sheet, PATH's unused
  `simple_manual_step_3_02.jpg` and a LibreOffice lock file. 66 files,
  about 6.9 MiB.
- **What stayed on purpose.** Source maps of files that load (dev tools
  ask for them). All three Spider card sounds: howler gets `.ogg`, `.mp3`
  and `.wav` and plays the first the browser supports.
- **fSolitaire needed nothing.** Its `docs/screenshots/<id>/overview.png`
  files look like documentation but are the rules-page pictures
  (`src/ui/app/provider/game_documentation_data.ts`); `thumb.webp` and
  `preview.webp` feed the game browser. This corrects the code health
  review, which called the PNGs dead weight. They are, however, 20 MB of
  the game's 42 MB; see the long-term plan.
- **Checks.** Each game repository's `public/` matched its deployed copy
  here file for file before the change. After it, `yarn build` in each
  produced the same script bundle names as the deployed builds; only the
  line endings of `index.html` differ, from the Windows checkout. In
  Chrome, against `astro preview` of this repository: Minesweeper (started
  a game), Pong, Spider (dealt, card sound loaded) and PATH (browsed to a
  product, opened the simplified manual, paged to step 3) all loaded with
  every local request answered 200 and no console errors. `astro build`
  and `inject-analytics` still instrument all five games.
- **Not changed:** the games still load unminified vendor scripts
  (`phaser.js`, `knockout-*.debug.js`, `jquery-*.js`). Switching to the
  minified copies would cut what players download, but Knockout's debug
  and release builds expose different internals, so it needs testing game
  by game. Listed as a follow-up in the long-term plan.
- Next: the long-term plan.

### 2026-10-10: the long-term plan

- Wrote [game-builds.md](game-builds.md): how builds ship today and what
  it costs, the requirements any change must keep, nine options (keep
  committing with guard rails, a builds repository, Git LFS, submodules,
  GitHub Releases with a manifest, packages, a proxy, a bucket, a
  monorepo) with pros, cons and effort, a comparison table, a
  recommendation and a step-by-step migration.
- **Recommendation:** GitHub Releases plus a pinned, checksummed manifest
  here (option E), with a scheduled workflow opening auto-merging bump
  pull requests. Fallback: a separate builds repository with a pinned
  commit (option B). Leave the existing history alone.
- **Constraint found:** Solitaire, Spider and Minesweeper keep settings,
  statistics or saved games in `localStorage`, so the games must stay on
  fuzzley.info's origin. Any option that serves them from another host
  name needs a same-origin proxy.
- **Measured for the follow-ups:** fSolitaire's 41 `overview.png` files are
  19.8 MiB, about 7.3 MiB as WebP at quality 85. Minified vendor scripts
  would cut Pong's `phaser.js` from 409 KB to 140 KB gzipped. PATH's
  `sample/manual_01.pdf` alone is 23 MiB of its 26 MiB.
- Open questions for the owner are listed at the end of the migration
  plan.
- Next: the owner's review.

### 2026-10-10: shipped

- Pushed `main` in all five repositories (this one first) and deleted the
  `trim-game-builds` branches. See [Shipping](#shipping).
- Every game deploy logged "No changes ... Skipping commit", so no sync
  commits followed. This repository's `verify` and Pages deploy passed.
- Checked on fuzzley.info once it served `c24957c`: each game's page and a
  sample of the files it loads return 200 (Pong's `phaser.js`, Spider's
  card sound and minified Kinetic, PATH's step 3 picture, Minesweeper's
  Knockout); a sample of removed files return 404.
- Next: the owner chooses a long-term option in
  [game-builds.md](game-builds.md).

### 2026-10-10: option E, steps 1 and 2

- **fPong `76b68ce`** (pushed): the deploy job packs `dist/`, uploads
  `pong-<short sha>.tar.gz` and `latest.json` to the `site-build` release,
  moves the tag, and prunes old archives except the ten newest and the one
  `games.json` pins. Its first run created the release; the archive's
  SHA-256 in `latest.json` matched GitHub's own digest. The sync to this
  repository still ran ("No changes"). The prune step warned that
  `games.json` didn't exist yet, and deleted nothing, as designed.
- **This repository, branch `games-from-releases`** (not pushed yet):
  `6be48b1` adds `games.json`, `tools/games.mjs` and
  `tools/fetch-games.mjs`, runs the fetch from `yarn dev` (with
  `--optional`) and `yarn build`, lists pinned games in the sitemap, and
  takes `public/projects/pong/` out of git (ignored here and in the Docker
  context). `22cf3fa` adds a `docker` job to `deploy.yml` that builds the
  image, serves it, and checks every project's page, game and old
  redirect.
- **Checks:** fetching Pong over its committed folder gave the same 11
  files, byte for byte (git on Windows still lists 7 as modified, because
  the committed blobs have CRLF line endings and `core.autocrlf` is on).
  From a clean state, `yarn build` downloaded Pong, built, and instrumented
  all five games; a second fetch said "up to date". With `PLAY_ORIGIN` set
  the fetch was skipped, `dist/` had no game folders, and the sitemap
  still listed Pong. `yarn dev` served Pong's files. `astro check` and
  ESLint pass.
- **Seen, not changed:** Astro's dev server returns 404 for a folder URL in
  `public/`, such as `/projects/solitaire/play/`, but serves its
  `index.html`. This was already so before these changes; nginx handles
  folder URLs in production.
- Next: push the branch, open a pull request, wait for `verify` and
  `docker`, then fast-forward `main`, watch Cloud Run, and check Pong on
  fuzzley.info.

### 2026-10-10: option E, steps 3, 3b and 4

- **Step 3 live.** Pull request #1 (`games-from-releases`) passed `verify`
  and the new `docker` job, whose image build fetched Pong and served every
  project's page, game and old redirect. `main` was fast-forwarded to
  `056ec44` and the branch deleted. Cloud Run's own image build fetched
  Pong too: fuzzley.info served `056ec44`, with Pong's page, assets,
  analytics tag, `/project/pong/` redirect and sitemap entry all in place.
- **Step 3b.** fPong `6dfa7d0` drops the sync step and its token use; the
  workflow is now "Build and publish to fuzzley.info". Its run published
  `pong-6dfa7d0.tar.gz`, moved the tag, and kept `pong-76b68ce.tar.gz`
  because `games.json` pins it.
- **Step 4.** `57c127e` adds `tools/update-games.mjs` and
  `.github/workflows/update-games.yml`. Locally, the script found
  `pong-6dfa7d0.tar.gz`, wrote the expected outputs and commit message, and
  left the pin alone when that archive was in `SKIP_ASSETS`.
- **Seen, not changed:** Dependabot alert #23 (moderate) for
  `brace-expansion` in `frontend/yarn.lock`, open before this work.
- Next: push, run Update games by hand, and check that it pins
  `pong-6dfa7d0.tar.gz`, pushes, and that Cloud Run deploys it.

### 2026-10-10: option E, steps 4 (tried) and 5

- **Step 4 works end to end.** Run by hand, Update games moved Pong's pin
  to `pong-6dfa7d0.tar.gz`, built the site, and pushed `60de5f9` as
  `github-actions[bot]`. `deploy.yml` didn't run for it, as expected, and
  Cloud Run deployed it: fuzzley.info served `60de5f9`.
- **Game repositories switched to publishing** (pushed): fMinesweeper
  `2a2d1db`, fSpider `9379bb8`, PATH `58259ac` (workflow copied from
  fPong's, with their names), and fSolitaire `1c72dce` (its `verify` job
  kept; `build-and-sync` became `build-and-publish`; `.agents/AGENTS.md`
  updated; its own `yarn lint` passed). All four deploys created their
  releases. fSolitaire's ruleset blocks pushes to `main` except by an
  admin, so the push went through as a bypass, as its earlier deploy
  change did.
- **Found:** fSolitaire's `latest.json` answered 404 for about 40 seconds
  after its deploy finished. `9d997b9` makes `fetch-games.mjs` retry 404s
  for about 30 seconds and `update-games.mjs` wait until a build is two
  minutes old (and warn, not fail, when one game's `latest.json` can't be
  read).
- **This repository, branch `move-remaining-games`:** `0b60b86` pins the
  other four games and takes all of `public/projects/` out of git (238
  files); `af830a1` adds a Games section to the README. Release builds of
  Minesweeper, PATH and Spider were byte-identical to the committed copies;
  Solitaire's differed only in its main bundle (it embeds the commit) and
  the `index.html` line that loads it. From a clean state `yarn build`
  fetched all five games and instrumented them; the `PLAY_ORIGIN` build
  fetched nothing and still listed all five in the sitemap. `astro check`,
  ESLint and Prettier (ignoring the Windows checkout's CRLF) pass.
- **Seen, not changed:** Dependabot reports open alerts in fSpider (12)
  and fSolitaire (3), as well as #23 here.
- Next: pull request, `verify` and `docker`, fast-forward `main`, watch
  Cloud Run, check every game on fuzzley.info.

### 2026-10-10: option E, steps 5 and 6 done

- Pull request #2 (`move-remaining-games`) passed `verify`, `docker` (the
  image fetched all five games and served each one's page, game and old
  redirect) and a Cloud Build check. `main` fast-forwarded to `2ad9f82`;
  the branch is deleted. Cloud Run served `2ad9f82`, with all five games
  answering 200 and carrying the analytics tag. Solitaire, whose bundle
  changed, loaded in Chrome on fuzzley.info with no console errors or failed
  requests.
- `MAIN_REPO_DEPLOY_PAT` deleted from fSolitaire, fSpider, fMinesweeper,
  fPong and PATH; no workflow referred to it any more. This repository's
  own `MAIN_GITHUB_IO_REPO_DEPLOY_PAT` stays: `deploy.yml` uses it to start
  the GitHub Pages build.
- `docs/game-builds.md` now opens with the outcome and how the build
  differs from the plan, and records the owner's answers.
- **Still open for phase 2:** the owner revokes the token that was behind
  `MAIN_REPO_DEPLOY_PAT` (GitHub settings, developer settings, personal
  access tokens). A scheduled run of Update games hasn't been seen yet;
  GitHub can take a while to start a new schedule. Check with
  `gh run list --workflow update-games.yml --event schedule`.
- Next: phase 3, fSolitaire's rules screenshots as WebP.

### 2026-10-10: phase 3, WebP rules screenshots

- **fSolitaire `a9ece90`** (pushed, as an admin bypass of its ruleset like
  the earlier changes). The rules page displays its screenshot at no more
  than 800 CSS px wide, but served the 2880 × 1620 lossless PNG.
  `yarn build:thumbs` now also writes `overview.webp`, 1600 × 900 at
  quality 90 (4.4 MB for all 41, from 19.8 MB), and the rules pages point
  at it. The lossless originals moved to `docs/screenshots/`, outside
  `public/`, so they stay for making the images again but don't ship;
  `capture:screenshots` writes there. A new spec checks every rules
  page's screenshot exists. AGENTS.md and the add-solitaire-game skill
  describe the layout. `thumb.webp` and `preview.webp` came out byte for
  byte the same.
- **Checks:** fSolitaire's `yarn verify` (lint, tsc, build, 6940 tests)
  passed; its build went from 41 MB to 26 MB. In Chrome, against
  `vite preview`, Klondike's rules page loaded the 81 KB `overview.webp`
  and it looked as sharp as the PNG.
- Live after the bump below: `overview.webp` answers 200 on fuzzley.info
  and `overview.png` 404.

### 2026-10-10: phase 4, minified vendor scripts

- **Approach:** minify at build time rather than switch to the libraries'
  own `.min.js` files. Each game's `vite.config.js` gets a small plugin
  that, when the build finishes, minifies every `dist/vendor/**/*.js` not
  named `.min.js`, with the minifier Vite 8 ships (`minify` from `vite`,
  which is Oxc), as classic scripts (`module: false`, so top-level names
  stay global) and keeping license comments. No dependency is added, file
  names don't change, and Knockout's debug build stays the debug build, so
  the debug-versus-release API risk doesn't arise. CSS is left alone: its
  old IE hacks make Lightning CSS refuse it, and it's a small share.
- **Commits** (pushed): fPong `38325fa`, fMinesweeper `fbcfb06`, fSpider
  `b2138cd`, PATH `7b6fb31`.
- **Savings, gzipped:** Pong 472 KB to 165 KB (Phaser 400 to 136),
  Minesweeper 289 to 107, PATH 161 to 64, Spider 24 to 19 (its jQuery,
  Kinetic and Knockout were already minified).
- **Checks:** in Chrome against `vite preview` of each: Pong started and
  the ball and computer paddle moved; Minesweeper started, revealed cells,
  lost lives to mines, restarted, and flagged and unflagged a cell with
  the counter following; Spider dealt from the stock, played its sound and
  undid the deal; PATH deep-linked to a manual, paged, went back and home.
  No console errors except the standalone preview's missing favicon. The
  same games then loaded on fuzzley.info with no errors or failed requests.

### 2026-10-10: the schedule hasn't fired yet

- No scheduled run of Update games had started by 03:21 UTC, about 64
  minutes after the workflow was added, though it shows as active and
  Actions are enabled. GitHub documents that scheduled runs are delayed,
  and under load dropped, at busy times, the start of each hour most of
  all; a new schedule can also take a while to start.
- To ship phases 3 and 4, Update games was run by hand: `66997ae` pinned
  all five new builds after the site built, and Cloud Run deployed it.
- `fc7a802` moves the schedule to 4, 19, 34 and 49 past the hour, which
  avoids minute 0 and makes GitHub register the schedule again.
- **To check:** `gh run list --workflow update-games.yml --event schedule`
  should list runs. If it stays empty for a few hours, try disabling and
  re-enabling the workflow (`gh workflow disable update-games.yml`, then
  `enable`), which re-registers its schedule.

### 2026-10-10: Dependabot alerts

- 16 alerts were open: here #23 (`brace-expansion`), fSolitaire #405 to
  #407 (`sharp`, `source-map-js`, `brace-expansion`) and fSpider #16 to
  #29 (`undici` ten times, `source-map-js`, `brace-expansion`).
  fMinesweeper, fPong and PATH had none, but locked the same vulnerable
  versions. Every one is a development or build tool (ESLint's file
  matching, PostCSS source maps, node-gyp, the screenshot tool's image
  library); none ships to players. All were addressed rather than
  dismissed, since each had a patched version inside the range its parent
  already asks for, so no override or major upgrade was needed.
- `yarn up -R brace-expansion source-map-js undici` in all six
  repositories, and `sharp` to `^0.35.5` in fSolitaire. Commits (pushed):
  this repository `52c1347`, fSolitaire `a4d7808`, fSpider `46a1b50`,
  fMinesweeper `5c7234a`, fPong `fad3f3b`, PATH `128aa0a`.
- **Checks:** `yarn install --immutable`, then here `astro check`, ESLint
  and the build; in each older game lint and build (the minified output
  was the same size); in fSolitaire `yarn verify` (6940 tests) and
  `yarn build:thumbs`, whose images came out byte for byte the same with
  the new `sharp`. Every CI run passed. Dependabot closed all 16 alerts
  within a few minutes, leaving none open in any of the six repositories.
