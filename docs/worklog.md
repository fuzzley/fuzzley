# Game builds work log

A running record of the work on how the games' builds get into this site:
what was decided, what is done, and exactly where to pick up. Newest log
entries go at the bottom of [Log](#log); update [Status](#status) whenever a
step finishes.

This is item 29 of the code health review: ship only the files each game
uses (short term), and choose where game builds should live (long term, see
[game-builds.md](game-builds.md)).

## Status

- **Current branch:** `trim-game-builds` in every repository below.
- **Last step finished:** the short-term trim, in all five repositories,
  checked in Chrome; the long-term plan in
  [game-builds.md](game-builds.md).
- **Next step:** the owner reviews, follows [Shipping](#shipping) for the
  trim, and answers the open questions in game-builds.md before any
  long-term work starts.
- **Nothing has been pushed.** All work is in local commits.

### Branches

| Repository   | Branch             | Holds                                                          |
| ------------ | ------------------ | -------------------------------------------------------------- |
| fuzzley      | `trim-game-builds` | This log, the long-term plan, the trimmed copies of the games. |
| fMinesweeper | `trim-game-builds` | `247f16a`: deletes 21 unused files from `public/` (1.1 MiB).   |
| fPong        | `trim-game-builds` | `229f43b`: deletes 11 unused files from `public/` (2.0 MiB).   |
| fSpider      | `trim-game-builds` | `b984747`: deletes 8 unused files from `public/` (2.5 MiB).    |
| PATH         | `trim-game-builds` | `e346f36`: deletes 26 unused files from `public/` (1.4 MiB).   |
| fSolitaire   | none               | Nothing to change: its build ships only what it loads.         |

## How to resume

1. In each repository, `git switch trim-game-builds` and
   `git log --oneline main..` to see what is done.
2. Read the newest [Log](#log) entry and its "Next" line.
3. Check the [Checklist](#checklist) for the remaining work.

The game repositories are cloned beside this one, in `~/Projects/`:
`fSolitaire`, `fSpider`, `fMinesweeper`, `fPong` and `PATH`.

## Checklist

- [x] Work out which files each game loads
- [x] fMinesweeper: delete the unused files from `public/`
- [x] fPong: delete the unused files from `public/`
- [x] fSpider: delete the unused files from `public/`
- [x] PATH: delete the unused files from `public/`
- [x] fSolitaire: confirm nothing unused ships
- [x] fuzzley: trim the deployed copies to match (`bd108a5`)
- [x] Check every game plays from a local build
- [x] Long-term plan in `docs/game-builds.md`
- [ ] Owner: review and push (see [Shipping](#shipping))

## Shipping

Each step needs the owner's go-ahead; none has been done. Either order
works, because this repository's branch deletes exactly the files the next
sync from each game would delete.

1. **This repository.** `git switch main && git merge --ff-only
trim-game-builds && git push`. `deploy.yml` verifies and redeploys the
   GitHub Pages copy; Cloud Run rebuilds the image from `main` by itself.
   Afterwards, open each `/projects/<slug>/play/` on fuzzley.info.
2. **Each game repository** (fMinesweeper, fPong, fSpider, PATH):
   `git switch main && git merge --ff-only trim-game-builds && git push`.
   Its deploy job rebuilds and syncs. Expect the Actions log to say
   "No changes in ... production build. Skipping commit." If it pushes a
   sync commit instead, look at what it changed: the bundle names should
   match the ones here.
3. Delete the `trim-game-builds` branches.

Until step 2 is done for a game, any push to that game's `main` brings its
unused files back here.

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
