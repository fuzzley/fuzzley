# Where the game builds live

The games under `/projects/<slug>/play/` are built in their own repositories
and copied into this one. This document lays out how that works today, what
it costs, the ways it could work instead, and a recommendation. It is item 29
of the code health review; the short-term trim of unused files is recorded in
[worklog.md](worklog.md).

Figures were measured on 2026-10-10.

## Summary

- **Today** each game repository builds on every push and commits its whole
  build into `frontend/public/projects/<slug>/play/` here, with a personal
  access token that can push to `main`. It works and is easy to follow, but
  game builds are now **about 157 MiB of this repository's 160 MiB** of
  history, growing by roughly 45 MiB a month at fSolitaire's current pace.
  Half of all commits here are those syncs, and five other repositories hold
  a token that can push to the branch Cloud Run deploys without checks.
- **Recommended:** publish each game's build as a **GitHub Release asset**
  in its own repository, and have this repository fetch pinned, checksummed
  versions listed in a small manifest at build time (option E). Bumping the
  manifest is a one-line pull request, which can be automated and
  auto-merged once checks pass. This stops the growth, removes the
  cross-repository write token, gives every game deploy a CI gate and makes
  rollback a one-line revert.
- **If that is more machinery than wanted,** a separate builds repository
  fetched with a shallow clone (option B) keeps today's workflow almost
  unchanged and still stops this repository growing.
- Rewriting history to reclaim the existing 157 MiB is a separate, optional
  decision with real costs. See [History](#the-existing-history).

## How it works today

```
fSolitaire / fSpider / fMinesweeper / fPong / PATH
  push to main
    -> deploy.yml: yarn build (Vite)
    -> git clone fuzzley/fuzzley  (secret MAIN_REPO_DEPLOY_PAT)
    -> rm -rf frontend/public/projects/<slug>/play
    -> cp -r dist/* there
    -> commit "chore(deploy): sync <game> production build ..." and push to main

fuzzley/fuzzley main
  -> Cloud Run: rebuilds the Docker image and deploys fuzzley.info
     (does not wait for checks)
  -> deploy.yml: verify, then dispatch to fuzzley/fuzzley.github.io
     -> pages.yml: builds with PLAY_ORIGIN=https://fuzzley.info (no games)
        and publishes https://fuzzley.github.io/
```

Inside this repository the games are ordinary files in `public/`, so
everything downstream treats them as part of the site:

- `astro build` copies them into `dist/`, and the `omitGames` integration
  deletes them again when `PLAY_ORIGIN` is set.
- `tools/inject-analytics.mjs` adds the analytics tags to each game's
  `index.html` in `dist/`.
- `astro.config.mjs` lists each `public/projects/<slug>/` folder in the
  sitemap.
- nginx caches each game's `assets/` folder for a year.
- Each game needs `src/content/projects/<slug>.md`, whose file name must
  match the folder.

### Sizes

| Game         | Build on the site | Syncs so far | Notes                                                                                                     |
| ------------ | ----------------- | ------------ | --------------------------------------------------------------------------------------------------------- |
| fSolitaire   | 41 MiB            | 80           | Deploys several times a day. 20 MiB is the rules-page screenshots (`docs/screenshots/<id>/overview.png`). |
| PATH         | 26 MiB            | 2            | 23 MiB of it is one file, the sample of an original manual (`sample/manual_01.pdf`).                      |
| fPong        | 3.0 MiB           | 3            | `phaser.js` alone is 2.3 MiB.                                                                             |
| fMinesweeper | 2.2 MiB           | 2            |                                                                                                           |
| fSpider      | 1.6 MiB           | 5            |                                                                                                           |

These are after the short-term trim. In this repository's history, blobs
under the game folders take about 157 MiB packed (fSolitaire 138 MiB, the
others 19 MiB); everything else takes about 2.5 MiB. fSolitaire's 80 syncs
since 2026-07-12 average about 1.7 MiB each. Git stores a new copy of every
file whose content changed: the main script bundle almost every time, and
the card sheets (`card_assets-*.png`) in 41 of the syncs. Minified scripts
and PNGs barely compress against their earlier versions, so each copy
costs close to its full size.

## What's wrong with it

In order of how much each matters:

1. **History grows without bound.** Git keeps every build ever synced.
   At about 45 MiB a month the repository passes 1 GB, the size GitHub
   suggests staying under, in about a year and a half. Every full clone
   (yours, any CI job without a shallow checkout, and possibly Cloud
   Build's) pays for it.
2. **Five repositories can push to production.** `MAIN_REPO_DEPLOY_PAT`
   can push anything to `main` here, and Cloud Run deploys `main` without
   waiting for checks. A mistake or a compromised dependency in any game's
   build reaches fuzzley.info directly, and the token sits in five places.
3. **Game deploys skip this site's checks.** The sync pushes straight to
   `main`. `verify` runs on that commit afterwards, but Cloud Run doesn't
   wait for it.
4. **Every game deploy redeploys everything.** Each sync rebuilds the
   Docker image and redeploys Cloud Run, runs CI here, and rebuilds the
   GitHub Pages copy, which doesn't even include the games.
5. **Noise.** 92 of 182 commits are bot syncs, which buries the site's own
   history.
6. **Nothing stops dead files coming back.** The trim removed them, but a
   game that adds files to `public/` ships them again.

What works well and should survive any change: the games are served from
fuzzley.info itself, a bad game deploy can be undone with `git revert`, the
site and its games build together offline once cloned, and each game repo
deploys on its own schedule.

## Requirements

Any replacement has to keep these:

1. **Same origin and paths.** Games stay at
   `https://fuzzley.info/projects/<slug>/play/`. Solitaire, Spider and
   Minesweeper keep settings, statistics or saved games in `localStorage`,
   which belongs to the origin: serving a game from another host name
   (a subdomain, `fuzzley.github.io`, a bucket's domain) silently wipes every
   player's data. The old `/project/<slug>/` redirects, analytics by path and
   search results depend on the paths too.
2. **The Docker build can get the games.** Cloud Run builds the
   `Dockerfile` from `main` with no other steps.
3. **The GitHub Pages copy needs no games.** It builds with `PLAY_ORIGIN`
   and must not depend on fetching them.
4. **The site build sees each game's `index.html`,** for analytics
   injection and the sitemap.
5. **Local `yarn dev` and `yarn build` still have the games,** or get them
   with one documented command.
6. **Game repositories deploy independently,** within minutes, without a
   change to this repository's code.
7. **Rollback is quick:** one revert or one changed line.

Nice to have: no long-lived token in the game repositories that can write
here; game deploys gated by this site's checks; no new paid service.

## Options

### A. Keep committing builds, with guard rails

Keep today's flow, and limit the damage:

- Stop the redundant work: have `deploy.yml` skip the Pages dispatch when a
  push only touches `frontend/public/projects/` (the Pages copy has no
  games), and narrow `MAIN_REPO_DEPLOY_PAT` to a fine-grained token with
  `contents: write` on this repository only.
- Add a check that fails a game's deploy when its build carries files
  nothing loads (the method in the work log).
- Shrink what each sync stores: WebP for fSolitaire's rules screenshots
  (19.8 MiB of PNG becomes about 7.3 MiB at quality 85, measured), and
  minified vendor scripts in the older games.

**Pros:** no new moving parts; everything still builds from one clone;
smallest effort.
**Cons:** history keeps growing, only more slowly; the write token and the
unchecked path to production remain; noise remains.
**Effort:** small (a day across repositories).
**Verdict:** worth doing parts of in any case (the token scope, the Pages
skip, the size fixes), but it doesn't solve the problem on its own.

### B. A separate builds repository, fetched with a shallow clone

Create `fuzzley/game-builds`. Game repositories push their `dist/` there
exactly as they do here today (same script, different target). This
repository stops tracking `frontend/public/projects/*/play/` (git-ignored)
and fetches the builds before building:

- `frontend/tools/fetch-games.mjs` runs
  `git clone --depth 1 https://github.com/fuzzley/game-builds` (optionally
  at a pinned commit listed in a file here) and copies each game into
  `public/projects/<slug>/play/`.
- The `Dockerfile` runs it before `yarn build`; `deploy.yml` too; local
  developers run it once (or `predev`/`prebuild` scripts run it when the
  folders are missing).
- The builds repository's history can be squashed to one commit whenever
  it gets large, because nothing depends on its old commits.

**Pros:** game repositories barely change; this repository stops growing at
once; old builds can be thrown away by squashing; a shallow clone is quick.
**Cons:** still a cross-repository write token (to `game-builds`); unless a
commit is pinned here, a game deploy changes the site without a commit here,
so Cloud Run doesn't redeploy until something else is pushed (the builds
repo would have to trigger a rebuild, for example by dispatching to this
repo's workflow, which commits a pin bump); two repositories to understand
instead of one; force-pushing the squash breaks any pin to an old commit.
**Effort:** small to medium.
**Verdict:** the cheapest way to stop the growth. Pinning plus a
pin-bump commit turns it into a lighter version of E.

### C. Git LFS

Track the game folders with Git LFS so the repository stores pointers and
LFS stores the files.

**Pros:** no change to how anything is laid out; game repositories keep
pushing here.
**Cons:** LFS storage and bandwidth count against GitHub's quotas, and
every Cloud Build, CI job and clone downloads the files through LFS; Cloud
Run's repository builds need LFS support configured, which isn't the
default; every old LFS object is kept, so storage still grows; the token
and the unchecked path to production remain. Fingerprinted file names
mean each build is new objects, which is the worst case for LFS.
**Effort:** small to start, ongoing quota attention.
**Verdict:** not recommended. It moves the growth somewhere with a meter
on it.

### D. Git submodules

Each game repository publishes its build to a `build` branch (orphan,
replaced on every deploy). This repository adds each as a submodule at
`frontend/public/projects/<slug>/play`, pinned to a commit.

**Pros:** pinned versions recorded in git; this repository stores only the
pins; native tooling; no write token needed here if a bot or a person bumps
the pins.
**Cons:** submodules are easy to get wrong (`git clone --recurse-submodules`,
detached heads, forgetting `git submodule update`); Cloud Build's
repository clone likely doesn't fetch submodules, so the `Dockerfile` would
have to fetch them itself, which needs the `.git` data the build context
doesn't have (unconfirmed, needs a test); the game repositories' histories
grow instead, unless their build branches are squashed, which breaks old
pins; still needs automation to bump pins.
**Effort:** medium, with ongoing friction.
**Verdict:** E gives the same pinning without the submodule friction.

### E. GitHub Releases and a pinned manifest (recommended)

Each game repository publishes its build as a release asset, and this
repository lists which release of each game it ships.

- **Game repositories:** `deploy.yml` builds, packs `dist/` into
  `<slug>-<short sha>.tar.gz`, and creates a release (tag such as
  `build-<short sha>` or a date) with that asset, using the repository's own
  `GITHUB_TOKEN`. No token for this repository is needed.
- **This repository:** a manifest, for example
  `frontend/games.json`:

  ```json
  {
    "solitaire": {
      "repo": "fuzzley/fSolitaire",
      "tag": "build-a44a084",
      "asset": "solitaire-a44a084.tar.gz",
      "sha256": "…"
    }
  }
  ```

  `frontend/tools/fetch-games.mjs` downloads each asset (cached under
  `node_modules/.cache/games/` by checksum), checks the SHA-256, and unpacks
  it into `public/projects/<slug>/play/`, which git ignores. Everything after
  that (analytics injection, the sitemap, `omitGames`, nginx) is unchanged.

- **Builds:** the `Dockerfile` runs the fetch before `yarn build`;
  `deploy.yml` runs it before `yarn verify`; the Pages copy skips it because
  `PLAY_ORIGIN` is set; locally, `yarn dev` and `yarn build` run it through
  `predev`/`prebuild` when anything is missing or out of date.
- **Bumping:** three ways to get a new release into the manifest, from least
  to most setup:
  1. A scheduled workflow here (say every 15 minutes) compares each game's
     latest release with the manifest and opens a pull request, set to
     auto-merge when checks pass. No token in the game repositories.
  2. Renovate's custom regex manager with the `github-releases` datasource
     opens the same pull requests.
  3. The game's deploy job sends a `repository_dispatch` here and a workflow
     here opens the pull request at once. This needs a fine-grained token in
     each game repository, limited to sending the dispatch.
- **Rollback:** revert the manifest line, or set an older tag by hand.

**Pros:** this repository stops growing (the manifest is a few hundred
bytes per bump); no game repository can push here; every game deploy goes
through `verify` before it reaches `main`, and so before Cloud Run; versions
are explicit, checksummed and reproducible; builds are stored by the
repository that made them; `deploy.yml` can skip the Pages rebuild for a
push that only changes the manifest, since the Pages copy has no games;
release assets cost nothing and don't expire (Actions artifacts, by
contrast, last 90 days at most).
**Cons:** new code to own (the fetch script, the bump workflow); builds
need network access to GitHub (the Docker build and CI have it; offline
local builds need the cache filled first); a game deploy takes a few
minutes longer (CI plus auto-merge); a release per deploy adds up for
fSolitaire, so old `build-*` releases may want pruning (or keep one rolling
release per game and use asset names for versions); GitHub API rate limits
apply to unauthenticated fetches, so CI should pass its token.
**Effort:** medium: a day or two including all five game repositories.
**Verdict:** recommended. It meets every requirement and both
nice-to-haves.

### F. Packages in a registry

Publish each build as an npm package (for example `@fuzzley/solitaire-build`)
and add them as dependencies here. An integration copies them from
`node_modules` into `public/` or `dist/`.

**Pros:** Yarn handles versions, the lockfile pins integrity hashes, and
Renovate or Dependabot open bump pull requests with no custom code.
**Cons:** GitHub Packages needs a token to install even public packages, so
the Dockerfile, CI and every local install need one; the public npm
registry avoids that but publishes builds of personal games to the world
under a scope that has to be owned; tens of megabytes per version go into
every `yarn install`; publishing needs an npm token in each game
repository.
**Effort:** medium.
**Verdict:** works, but E gives the same pinning with fewer credentials.

### G. Host the games elsewhere and proxy them

Each game deploys to its own static host (its own GitHub Pages site, a
Cloudflare Pages project, a bucket). nginx on Cloud Run proxies
`/projects/<slug>/play/` to that host, so players still see fuzzley.info.

**Pros:** fully independent game deploys, with no build or commit here; this
repository holds no game files at all.
**Cons:** fuzzley.info's games then depend on two hosts being up; every
request makes an extra hop unless cached; proxy and cache headers need care
(and nginx's `add_header` inheritance rules); the GitHub Pages copy can't
proxy, though it already links to fuzzley.info's games; a game deploy
skips this site's checks entirely; serving a game directly from its own host
would break requirement 1, so the proxy is mandatory, and moving off Cloud
Run later would mean finding another proxy.
**Effort:** medium, with ongoing operational care.
**Verdict:** not recommended while fuzzley.info is one static site.

### H. A storage bucket

Game repositories upload builds to versioned folders in a Google Cloud
Storage bucket. Either the site build downloads pinned versions (like E) or
nginx proxies to the bucket (like G).

**Pros:** cheap and fast; no git involvement.
**Cons:** cloud credentials in five repositories (Workload Identity
Federation helps); another piece of infrastructure to secure, pay for and
keep; ties the setup to GCP; the build-time variant is E with more setup,
and the proxy variant has G's problems.
**Effort:** medium to large.
**Verdict:** E gives the same result using what is already there.

### I. One repository for everything

Move all five games into this repository as workspaces and build them with
the site.

**Pros:** one place, atomic changes, one CI, no syncing at all.
**Cons:** five different toolchains (Angular 22 and Phaser 4 beside
jQuery-era code) in one install and one CI run; much slower builds for site
changes; the site links to each game's own repository as part of the
portfolio, which would have to change or be kept as mirrors; the games'
histories would have to be merged in.
**Effort:** large.
**Verdict:** not recommended.

## Comparison

| Option              | Stops growth here | Write token in game repos | Game deploys checked here | Pinned and reversible | New infrastructure | Effort       |
| ------------------- | ----------------- | ------------------------- | ------------------------- | --------------------- | ------------------ | ------------ |
| A. Keep, with rails | Slows it          | Yes                       | No                        | Yes (revert)          | None               | Small        |
| B. Builds repo      | Yes               | Yes (to builds repo)      | Only if pinned            | If pinned             | One repo           | Small–medium |
| C. Git LFS          | Moves it to LFS   | Yes                       | No                        | Yes                   | LFS quotas         | Small        |
| D. Submodules       | Yes               | No                        | Yes                       | Yes                   | Build branches     | Medium       |
| E. Releases         | Yes               | No                        | Yes                       | Yes                   | None               | Medium       |
| F. Packages         | Yes               | npm token                 | Yes                       | Yes                   | Registry tokens    | Medium       |
| G. Proxy            | Yes               | No                        | No                        | Per host              | Hosts, proxy       | Medium       |
| H. Bucket           | Yes               | Cloud credentials         | Depends                   | Yes                   | Bucket, IAM        | Medium–large |
| I. Monorepo         | No, worse         | No                        | Yes                       | Yes                   | None               | Large        |

## Recommendation

Do **E**, and fold in the parts of **A** that help regardless:

- Narrow `MAIN_REPO_DEPLOY_PAT` now, while it still exists, and delete it
  when E is in place.
- Convert fSolitaire's rules screenshots to WebP and switch the older games
  to minified vendor scripts after testing each one. Measured with gzip:
  Pong's `phaser.js` goes from 409 KB to 140 KB, the Knockout debug
  builds from about 65 KB to about 21 KB, and jQuery from about 75 KB to
  about 30 KB.

If E's fetch script and bump workflow feel like too much to own, **B with a
pinned commit** is the fallback: smaller to build, and it still stops the
growth.

## Migration plan for E

Each step leaves the site working, so it can stop between any two.

1. **Publish releases from one game.** In fPong (small, rarely deployed),
   add a release job beside the existing sync: pack `dist/`, create a
   release with the asset. Keep syncing here as well.
2. **Fetch script and manifest.** Add `frontend/games.json` and
   `frontend/tools/fetch-games.mjs` (download, cache, verify SHA-256,
   unpack; a clear error naming the game and tag on any failure; does
   nothing when `PLAY_ORIGIN` is set). Start with Pong only and check
   that the unpacked folder matches the committed one file for file.
3. **Switch Pong over.** Delete `frontend/public/projects/pong/play/` from
   git, ignore `frontend/public/projects/*/play/`, run the fetch from the
   `Dockerfile`, `deploy.yml` and `predev`/`prebuild`. Test the Docker build
   locally (`docker build` and `docker run`, then open the game, the old
   `/project/pong/` redirect and a missing page). Remove the sync step from
   fPong's `deploy.yml`.
4. **Automate bumps.** Add the scheduled workflow that opens a manifest pull
   request for any newer release, with auto-merge on. Try it with a
   harmless fPong change.
5. **Move the other four games,** fSolitaire last since it deploys most.
   For each: add the release job, add it to the manifest, delete its folder
   from git, remove its sync step.
6. **Clean up.** Delete `MAIN_REPO_DEPLOY_PAT` from all five repositories
   and revoke the token. Update the README's Games section and this
   document. Decide whether to prune old releases (fSolitaire will make
   several a day).

Open questions for the owner before starting:

- One release per deploy, or one rolling release per game whose asset is
  replaced? Per-deploy is simpler to pin and roll back; rolling avoids
  hundreds of releases.
- Auto-merge game bumps, or review each one? Auto-merge keeps deploys hands
  off; review gives a manual gate for a site that changes rarely.
- How quickly must a game deploy go live? A 15-minute schedule is simplest;
  a dispatch is near-instant but needs a token per game repository.

## The existing history

Moving to any option stops the growth, but the 157 MiB already in history
stays. Choices:

- **Leave it.** Nothing breaks, and a shallow clone (as CI already does)
  never downloads it. Recommended unless clone size becomes a real problem.
- **Rewrite history** with `git filter-repo` to drop every path under
  `frontend/public/projects/*/play/` and the old `public/project/`, then
  force-push. Every commit hash changes: existing clones and forks break,
  the footer's "Built from" links and Cloud Run's image tags point at
  commits that no longer exist, and GitHub keeps the old objects reachable
  through pull request refs until support removes them. Only worth doing
  once, after the migration, and only deliberately.
- **Start a new repository** from a squashed snapshot and archive this one.
  Clean, but loses the site's history and links to it.

## Related follow-ups

These help whichever option is chosen:

- **Guard against dead files** in each game's CI: fail when `dist/`
  contains a file no loaded file mentions (the method is in the work log).
- **WebP rules screenshots in fSolitaire:** about 12 MiB less per copy, and
  less for players to download on the rules pages. Its screenshot tool
  (`tools/build-screenshot-thumbs.mjs`) and the spec that checks the
  screenshots would change with it.
- **Minified vendor scripts** in fMinesweeper, fPong, fSpider and PATH,
  tested game by game (Knockout's debug and release builds expose different
  internals).
- **PATH's sample manual PDF** is 23 MiB, nearly all of PATH's size. It is
  a download link, not something the prototype displays, so re-saving it at
  screen resolution, or linking to the manufacturer's copy, would cut most
  of it.
- **Verify steps** in the four older games' `deploy.yml`, as fSolitaire has:
  today they deploy whatever builds.
