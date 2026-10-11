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
- **Last step finished:** branch created, work log started.
- **Next step:** trim the unused files from each game repository.
- **Nothing has been pushed.** All work is in local commits.

### Branches

| Repository   | Branch             | Holds |
| ------------ | ------------------ | ----- |
| fuzzley      | `trim-game-builds` | This log, the long-term plan, the trimmed copies of the games. |

## How to resume

1. In each repository, `git switch trim-game-builds` and
   `git log --oneline main..` to see what is done.
2. Read the newest [Log](#log) entry and its "Next" line.
3. Check the [Checklist](#checklist) for the remaining work.

The game repositories are cloned beside this one, in `~/Projects/`:
`fSolitaire`, `fSpider`, `fMinesweeper`, `fPong` and `PATH`.

## Checklist

- [ ] Work out which files each game loads
- [ ] fMinesweeper: delete the unused files from `public/`
- [ ] fPong: delete the unused files from `public/`
- [ ] fSpider: delete the unused files from `public/`
- [ ] PATH: delete the unused files from `public/`
- [ ] fSolitaire: confirm nothing unused ships
- [ ] fuzzley: trim the deployed copies to match
- [ ] Check every game plays from a local build
- [ ] Long-term plan in `docs/game-builds.md`
- [ ] Owner: review and push (see [Shipping](#shipping))

## Shipping

Not done yet. Filled in once the branches are ready.

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
