# History rewrite: dry runs on a mirror

Written 2026-11-21, against `main` at d13a053. Everything here was run on
mirrors under `~/Projects/personal/repo-size-fuzzley-2026-11-21/`, with their
push URLs set to `DISABLED`. Nothing was pushed. The scripts are in
[`../scripts/history/`](../scripts/history/), and what they printed is in
[`../data/history/`](../data/history/).

## Summary

- **Almost all of the history is old game builds.** The site committed each
  game's production build until 2026-10-10, when the games moved to their
  own releases (`frontend/games.json`). Those builds are 148.30 of the
  154.44 MiB that history's blobs take on disk, 96%. Nothing at `main`'s tip
  is under their folders.
- **A rewrite takes a clone from 154.7 MiB to 2.8 MiB.** Three rules were
  dry-run, each one adding to the last. With all three, the history holds
  little more than the tip's own 2.6 MiB.
- **Every commit is kept, and the tip's tree is the same.** 238 commits
  before and after, 0 differences at `main`'s tip, `fsck` clean, and both of
  the commit messages that name a commit point to the right new one.
- **GitHub's own figure won't fall,** just as for fuzzley-games. The three
  merged pull requests keep read-only refs to the old commits, and those reach
  the whole old history. Clones shrink at once anyway.
- **Little names a fuzzley commit:** 27 references in 4 files. 24 are in
  `docs/worklog.md`, 2 in memory notes, and 1 in fuzzley-games' research on
  its own rewrite.
- **fuzzley.github.io, the GitHub Pages copy's repository, is the same
  story, only more so.** It is 137.5 MiB of old site builds behind a tip of
  two small files. It has no pull requests, so there a rewrite would lower
  GitHub's figure too.

## How the runs were made

- [`01-mirror.sh`](../scripts/history/01-mirror.sh) clones a mirror and
  repacks a copy of it with `gc --aggressive`, as every scenario is repacked.
  That copy is the baseline, 154.7 MiB. The mirror as GitHub sent it is
  163 MiB ([`mirror-as-cloned-count-objects.txt`][mac]). GitHub reports
  166,874 KB ([`github.txt`](../data/history/github.txt)).
- [`02-inventory.sh`](../scripts/history/02-inventory.sh) runs
  `git filter-repo --analyze` for every path a blob was ever stored under.
  Then [`inventory.mjs`](../scripts/history/inventory.mjs) sorts each blob by
  what it is, and by whether `main`'s tip holds it.
- [`03-scenario.sh`](../scripts/history/03-scenario.sh) runs one rule on its
  own copy of the mirror, twice:
  - once with filter-repo's default pruning, only to count the commits it
    would drop;
  - once with `--prune-empty never --prune-degenerate never`, which keeps
    every commit. This is the run that is measured.

  It then repacks the copy, runs `fsck`, and measures three things: the whole
  copy, the copy without `refs/pull/*` (what a clone fetches), and a clone
  at depth 1. [`verify.mjs`](../scripts/history/verify.mjs) checks the
  rewrite against the original.

- filter-repo is `a40bce548d2c`, at `~/.local/bin/git-filter-repo`.

[mac]: ../data/history/mirror-as-cloned-count-objects.txt

## What history holds

From [`inventory-kinds.tsv`](../data/history/inventory-kinds.tsv) and
[`inventory-folders.tsv`](../data/history/inventory-folders.tsv):

| Kind                    | Where         | Blobs | On disk (MiB) | Share |
| ----------------------- | ------------- | ----: | ------------: | ----: |
| Game builds             | old           |   783 |        148.30 | 96.0% |
| Site images             | at main's tip |    15 |          2.41 |  1.6% |
| Site images             | old           |    54 |          2.34 |  1.5% |
| The old site's packages | old           |    71 |          1.16 |  0.8% |
| Text and code           | at main's tip |    65 |          0.13 |  0.1% |
| Text and code           | old           |   266 |          0.10 |  0.1% |
| **All**                 |               | 1,254 |    **154.44** |  100% |

- **Game builds** are every path under `project/` at the root (the first
  site's games), and `frontend/public/project/` and
  `frontend/public/projects/` (from the move into `frontend/` on 2026-07-12
  until 2026-10-10). `env.sh` holds the rule as `GAME_BUILDS`.
  - The Solitaire Collection's builds are 129.02 MiB of it. Each build
    committed its own rules-page screenshots (`docs/screenshots/`, 86.7 MiB
    packed across both folders, by filter-repo's report) and card atlases
    (`assets/card_assets-*.png`, up to 1.8 MiB a page).
  - PATH's sample `manual_01.pdf` is 14.2 MiB on its own.
  - Of the 238 commits, 95 changed nothing but a game build. Most are
    "chore(deploy): sync … production build" commits by Update games.
- **The old site's packages** are Materialize, jQuery and a hasher, under
  `external/` and then `frontend/public/external/`. `env.sh` holds them as
  `VENDORED`. They went with the Astro rebuild on 2026-10-10.
- **Site images** are every other image: the project screenshots in
  `frontend/src/assets/projects/`, the photo, the favicons, the link
  preview, and the first site's `images/`. The tip holds 15, 2.41 MiB, of
  which the 8 screenshots are 2.31 MiB.
  [`inventory-old-site-images.tsv`][old] lists the 54 old versions.
- Some screenshots began as a game build's own picture. FreeCell's first
  gallery image was the build's `preview.webp`, for example. Those count as
  site images, since a site path holds them too.

[old]: ../data/history/inventory-old-site-images.tsv

## The scenarios

From [`scenarios.tsv`](../data/history/scenarios.tsv):

| Rule                        | Clone (MiB) | Depth 1 (MiB) | Main tip differences | Commits on main | Pruned by default | Message refs wrong |
| --------------------------- | ----------: | ------------: | -------------------: | --------------: | ----------------: | -----------------: |
| baseline                    |       154.7 |           2.6 |                    0 |             238 |                 0 |                  0 |
| r1: the game builds         |         6.3 |           2.6 |                    0 |             238 |                94 |                  0 |
| r2: r1 and the old packages |         5.1 |           2.6 |                    0 |             238 |                94 |                  0 |
| r3: r2 and old site images  |         2.8 |           2.6 |                    0 |             238 |                95 |                  0 |

- **r1** removes every path under the game builds' folders, from every
  commit (`--path-regex "$GAME_BUILDS" --invert-paths`).
- **r2** also removes the old site's packages' folders.
- **r3** also strips each old version of a site image, by blob id, from
  [`inventory.mjs`](../scripts/history/inventory.mjs)'s list. A version the
  tip still holds stays. So does any text: an old `README.md` or
  `yarn.lock` costs nothing worth having.

`fsck` passed on every copy. Each rewrite took under 0.3 s. Every commit's
hash changes, since the first commit, 7b3227d, already held `project/`.
Because the PR refs are rewritten in the mirror too, the clone figure is the
same with or without them. A clone at depth 1, as CI and Cloud Build make,
holds 2.6 MiB in every case, so the rewrite doesn't speed them up.

### After Part A, as the plan has it

[`08-after-plan.sh`](../scripts/history/08-after-plan.sh) puts Part A's
commit on top of r3's `main`: each screenshot as lossless WebP, no wider
than the widest copy the plan has the site serve of it, 1600 px for a cover
and 1200 for a gallery image. Then it runs r3's rule again, which strips the
8 versions that commit replaced
([`after-plan.txt`](../data/history/after-plan.txt)):

- Part A's commit adds 1.54 MiB packed.
- After both, a clone is **2.00 MiB**, and the tip's images are 1.69 MiB of
  it.
- At the site's widths today, with caps of 1280 and 800, the first run gave
  1.02 MiB and 1.49 MiB. The plan raised them once the user asked for high
  image quality ([`screenshots.md`](screenshots.md) §5).

## Pruning: keep the empty commits

With filter-repo's default `--prune-empty auto`, r3 would drop 95 commits on
`main` that only touched a game build or an old image. One of them, bd108a5
("chore(deploy): trim files the games never load"), is named 3 times in
`docs/worklog.md` ([`rewrite-refs-r3.txt`](../data/history/rewrite-refs-r3.txt)).

**Use `--prune-empty never` (and `--prune-degenerate never`).** Then each old
commit has a new one, and its message still says what was done. Any hash
named anywhere, such as an Actions run page or another repository's notes,
still maps to a commit. The empty commits cost a few kilobytes.

## Commit messages

filter-repo rewrites any 7–40 hex token in a message that names a commit of
the rewritten history. `verify.mjs` checked every token. Only two messages
name a commit of this repository, and both were rewritten to the right new
hash:

- 2a47525 names 8119ace.
- a5631ec names 4b38a1a.

Many messages name commits of other repositories, such as "sync fSolitaire
production build from fuzzley/fSolitaire@<sha>". Those don't resolve here,
so they stay as they are.

## Consequences

### 1. Every place that names a commit

From [`hash-refs-summary.tsv`](../data/history/hash-refs-summary.tsv) and
[`hash-refs-files.tsv`](../data/history/hash-refs-files.tsv), by
[`hash-refs.mjs`](../scripts/history/hash-refs.mjs). A reference is a 7–40
hex token standing alone that resolves, in the mirror, to a commit. Every
token was looked up in fuzzley-games too, and none resolves in both.

| Place                           | Files | References | Distinct commits |
| ------------------------------- | ----: | ---------: | ---------------: |
| fuzzley's `docs/worklog.md`     |     1 |         24 |               16 |
| Memory notes                    |     2 |          2 |                2 |
| fuzzley-games' `docs/`          |     1 |          1 |                1 |
| fuzzley's code, config, skills  |     0 |          0 |                0 |
| Pull request bodies, comments   |     0 |          0 |                0 |
| Commit messages (filter-repo's) |       |          2 |                  |

- **This plan's folder** names fuzzley commits too, about 16 when it was
  measured. They are rewritten with the rest, except in what records the
  old history on purpose: `data/history/` and this file.
- **fuzzley-games' one reference** is in its own
  `docs/repo-size/research/history-rewrite.md`. It cites 960f322 as an
  example of a fuzzley hash the notes name, as things stood on 2026-11-21.
  It is a record, so it is left alone, and fuzzley-games needs no commit.
- **The live site** names its commit in `version.json` (`"commit":
"d13a053"` today), and links to `github.com/fuzzley/fuzzley/commit/<short>`
  from the footer. The Dockerfile takes the commit as a build argument, so
  the first deploy after the push names the new hash.
- **Old links** keep working while GitHub keeps the old objects, which the
  pull request refs make sure of (§2).

**Rewriting them.** [`rewrite-refs.mjs`](../scripts/history/rewrite-refs.mjs)
is fuzzley-games' script, copied as it was at 92f00d6b.
[`09-rewrite-refs-dry-run.sh`](../scripts/history/09-rewrite-refs-dry-run.sh)
ran it with `--write` on copies of the rewritten `docs/`, fuzzley-games'
`docs/` and the memory notes ([`rewrite-refs-r3.txt`][rr]):

- **27 replacements in 4 files,** 18 distinct commits, all at the same
  length.
- **No ambiguity.** No token was ambiguous in the old mirror, none resolved in
  fuzzley-games too, and none needed lengthening in the new mirror.
- **A second pass** over the rewritten copies found nothing left to rewrite.

[rr]: ../data/history/rewrite-refs-r3.txt

### 2. The GitHub side

From [`github.txt`](../data/history/github.txt) and
[`github-after-push.tsv`](../data/history/github-after-push.tsv):

- **Pull request refs.** There are three pull requests, all the owner's and
  all merged: #1 and #2 on 2026-10-11, and #3 on 2026-10-25. GitHub keeps a
  read-only `refs/pull/<n>/head` for each, and a push can't change them.
  Between them they reach 225 old commits that the rewritten `main` doesn't
  hold, and every game build with them.
- **What GitHub would keep.** The r3 history with the three old refs kept,
  repacked like the rest, is 155.7 MiB, against the baseline's 154.7 MiB. So
  GitHub's `diskUsage` stays where it is, or grows a little.
- **Getting the figure down** takes one of two things, as fuzzley-games'
  research found:
  - Ask GitHub Support to remove the pull requests' refs. Their guide says
    they won't remove data that isn't sensitive.
  - Recreate the repository and push the rewritten `main` to it. This one is
    cheaper to recreate than fuzzley-games:
    - It has 1 star, no forks, no issues, no rulesets, no webhooks and no
      deploy keys.
    - It has one Actions secret, `MAIN_GITHUB_IO_REPO_DEPLOY_PAT`.
    - It would lose its 3 pull requests and the history of its 338 workflow
      runs, and every old commit link would answer 404 at once.
    - Cloud Run's continuous deployment reaches the repository through
      Google's GitHub app, and a new repository has a new id. Whether the
      trigger follows it couldn't be checked from here, as the devbox has
      no `gcloud`.
- **Branch protection:** none, and no rulesets. A force-push to `main` goes
  through without any bypass.
- **Signatures.** Two commits from 2024-10-20 carry signatures, made by
  GitHub's web editor. filter-repo drops them.

### 3. Deploys and CI

- **Cloud Run** builds `main` on every push, without waiting for checks. The
  force-push builds and deploys the same tree under the new hash. Its build
  clones only what it builds, so it doesn't get faster.
- **Verify and deploy** (`deploy.yml`) runs on the push as on any other. It
  runs `yarn verify`, builds and checks the Docker image, and asks
  fuzzley.github.io to publish its copy. Its checkouts are at depth 1.
- **Update games** (`update-games.yml`) runs every 15 minutes, and pushes to
  `main` when a game has a newer build. A run that checked out the old
  history and pushed after the rewrite would be rejected by its
  `git pull --rebase`, or would bring old commits back. So it is turned off
  for the rewrite (`gh workflow disable`), and on again after. Since
  2026-10-10 it has pushed 5 times, the last on 2026-10-26.
- **Actions caches:** none.

### 4. Local clones and worktrees

From [`local-clones.txt`](../data/history/local-clones.txt):

- One clone, `~/Projects/personal/fuzzley`, on `main`, clean.
- One worktree of it, `~/Projects/personal/fuzzley-repo-size`, on
  `repo-size-plan`, this plan's.
- No commits that no remote branch holds, and no stash entries.
- Any clone on the Windows side can't be seen from the devbox.

As for fuzzley-games, every copy is cloned again after the push. A clone that
fetches the new history keeps the old beside it, a `git pull` merges them, and
a later push would bring the old objects back.

### 5. Backup and rollback

[`10-backup-rehearsal.sh`](../scripts/history/10-backup-rehearsal.sh)
rehearsed both without a push ([`backup-rehearsal.txt`][br]):

- **The backup.** A bundle of the untouched mirror is 163 MiB and verifies.
  A mirror restored from it has every ref at the same commit, and passes
  `fsck`.
- **The rollback.** A copy of the r3 mirror stood in for GitHub after the
  push. Fetching `main` back from the bundle returned it to d13a053.

[br]: ../data/history/backup-rehearsal.txt

## fuzzley.github.io

From [`pages-repo.txt`](../data/history/pages-repo.txt), by
[`11-pages-repo.sh`](../scripts/history/11-pages-repo.sh).

This repository publishes the GitHub Pages copy of the site. Its workflow
checks out fuzzley at the commit it is asked to build, so it needs none of
its own history.

- **What it holds.** GitHub reports 140,846 KB. A repacked mirror is
  126.41 MiB, and its blobs are 137.47 MiB on disk.
  - Its tip is two files, `.github/workflows/pages.yml` and `README.md`.
  - The rest is the old site as it was copied in on 2024-10-20, then synced
    from fuzzley: `project/solitaire/` (115.36 MiB), `project/path/`
    (16.11 MiB), the other games and the old packages.
- **The dry run** kept only those two paths, with `--prune-empty never`. The
  mirror fell to 23.69 KiB, with all 117 commits kept, the same tree at
  `main`, and `fsck` clean.
- **GitHub's side.** It has one ref, `main`, and no pull requests. So once
  the push lands, nothing on GitHub reaches the old objects. Its figure
  should fall once GitHub collects them, though GitHub doesn't say when it
  does.
- **Other facts.** No rulesets, no signed commits, 138 workflow runs, the
  variable `GA_AG_MEASUREMENT_ID`, and the `github-pages` environment. The
  Pages site deploys from an Actions artifact, not from a branch's files.
- **What names its commits:** nothing that was found. Its runs are named by
  fuzzley's commit and run id, not by its own.

## What couldn't be verified

- How soon GitHub recomputes `diskUsage` after a force-push, and when it
  collects objects nothing reaches. This matters only for fuzzley.github.io.
- Whether Cloud Run's trigger would follow a recreated repository.
- Whether Cloud Build starts on a force-push. Its GitHub triggers fire on
  push events, and a force-push is one, but this wasn't tried here.
