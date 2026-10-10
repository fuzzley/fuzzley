# Redesign work log

A running record of the fuzzley.info redesign: what was decided, what is done,
and exactly where to pick up. Newest log entries go at the bottom of
[Log](#log); update [Status](#status) whenever a step finishes.

Plan, mocks and rationale: https://claude.ai/artifact/NpYyaw1fX9REPFMcC6i2sM
(private; open it signed in as the repo owner).

## Status

- **Current branch:** `redesign` (built on `quick-fixes`)
- **Last step finished:** deploy workflows for GitHub Pages
- **Next step:** point the five game repos at `public/projects/<slug>/play`
- **Nothing has been pushed.** All work is in local commits.

### Branches

| Repository          | Branch                 | Holds                                                         |
| ------------------- | ---------------------- | ------------------------------------------------------------- |
| fuzzley             | `quick-fixes`          | Phase 0 fixes to the old site. Can ship on its own.           |
| fuzzley             | `redesign`             | Everything in `quick-fixes`, plus the Astro rebuild.          |
| fuzzley.github.io   | `pages-actions-deploy` | The Pages workflow that builds and publishes fuzzley.info.    |

## How to resume

1. `git switch <current branch>` (see Status) and `git log --oneline main..` to
   see what is done.
2. Read the newest [Log](#log) entry and its "Next" line.
3. Check the [Checklist](#checklist) for the remaining work.
4. `cd frontend && yarn install` before running anything.

## Decisions

Agreed with the owner on 2026-10-10.

| Topic         | Decision                                                                                                  |
| ------------- | --------------------------------------------------------------------------------------------------------- |
| Design        | Bento grid. Game tiles take their colors from the games.                                                  |
| "Now" tile    | The Google tile spans the full grid row on its own. Fill it with more detail later if it looks empty.     |
| Structure     | Hybrid: one-page home, `/projects/<slug>/` project pages, games at `/projects/<slug>/play/`, `/cv`.       |
| Old URLs      | `/project/<slug>/` redirects to `/projects/<slug>/play/`. Old `#/projects` style hashes still land.       |
| Stack         | Astro, static output, no client framework.                                                                |
| Hosting       | Move to GitHub Pages (fuzzley.github.io), custom domain fuzzley.info. Other domains forward with a 301.   |
| Favicon       | The tiled f in `branding/favicon/`.                                                                       |
| Phone number  | Removed from the site.                                                                                    |
| Analytics     | Keep Google Analytics 4.                                                                                  |
| fPoker        | Not shown yet.                                                                                            |
| Google role   | Owner writes the outcomes later. Placeholders in the content file, hidden from production builds.         |
| Game loops    | Not now.                                                                                                  |

## Environment facts

Gathered with read-only `gcloud` and DNS lookups on 2026-10-10.

- **GCP project:** `agavel-personal` (account andrey.gavel@gmail.com).
- **Cloud Run service:** `fuzzley-git` in `us-central1` serves the site. A
  second `fuzzley-git` exists in `northamerica-northeast2` with no domain
  mappings.
- **Deploys:** the image is built from this repo on every push to `main` and
  tagged with the commit SHA
  (`northamerica-northeast2-docker.pkg.dev/agavel-personal/cloud-run-source-deploy/fuzzley-fuzzley/fuzzley-git:<sha>`).
  No Cloud Build trigger is visible to `gcloud builds triggers list`; Developer
  Connect is enabled, so it is most likely Cloud Run's "deploy from repository"
  setup. **Anything merged to `main` rebuilds the container**, so the
  Dockerfile build must keep working until Cloud Run is retired.
- **Analytics ID:** Secret Manager secret `ga-ag-measurement-id`, injected as
  `GA_AG_MEASUREMENT_ID`.
- **Domain mappings** (all to `fuzzley-git`, us-central1): fuzzley.info,
  andreygavel.com, andrey-gavel.com, fuzzley.net, fuzzley.org. Each uses the
  Cloud Run A records 216.239.32.21, .34.21, .36.21, .38.21 and AAAA
  2001:4860:4802:32::15, :34::15, :36::15, :38::15.
- **DNS:** all five domains use Porkbun nameservers
  (`*.ns.porkbun.com`). Cloud DNS and Cloud Domains are not enabled. No `www`
  records exist on any of them.
- **GitHub:** `fuzzley/fuzzley` and `fuzzley/fuzzley.github.io` are both
  public. fuzzley.github.io has no custom domain and ships the empty `env.js`
  placeholder, so analytics is off there today.

## Checklist

- [x] Phase 0: quick fixes on the current site (`quick-fixes` branch)
- [x] Phase 1: Astro foundation (`redesign` branch)
- [x] Phase 2: Bento pages and the `/projects` tree
- [x] Phase 3: hosting move, prepared (workflows written; cutover needs the owner)
- [ ] Phase 4: polish
- [ ] Game repos: point each deploy at `public/projects/<slug>/play`
- [ ] Cutover runbook carried out by the owner (see below)

## Checking pages

`yarn verify` runs `astro check`, ESLint, the Prettier check and the build.
To look at pages, `yarn build && yarn preview`, then screenshot with headless
Chrome using a throwaway profile:

```sh
chrome --headless=new --user-data-dir=<temp dir> --window-size=1280,1600 \
  --screenshot=out.png http://localhost:4321/
```

Add `--blink-settings=preferredColorScheme=1` for light mode or `=0` for
dark. For a phone width, load the page in a 390px-wide `<iframe>` inside a
page shot at 512px, then crop.

## Cutover runbook

Steps that change live systems. Each needs the owner's go-ahead; none has
been done.

_Filled in during Phase 3._

## Log

### 2026-10-10: setup

- Investigated GCP and DNS (see Environment facts).
- Created branch `quick-fixes` from `main` at `cf092ae`.
- Generated the favicon set in `branding/favicon/` (script, README, exports).
- Next: Phase 0 quick fixes.

### 2026-10-10: Phase 0 on `quick-fixes`

Commits `4d83cf4`, `513310e`.

- Added the viewport tag, title, description, canonical URL and Open Graph
  tags (with `public/images/og-home.jpg`, a 1200x630 crop of Klondike).
- Removed the phone number. Fixed typos. Added alt text to every image.
- Re-encoded screenshots and logos as WebP (766 KB to about 150 KB); deleted
  nine unused images.
- CSS for phones: project cards and logos shrink and stack below 799px.
- Wired in the tiled-f favicon set.
- nginx: gzip on; `/assets/` cached for a year.
- Checked at 390px with headless Chrome (see "Checking pages" below).
- Not checked: the Docker build. The Docker daemon wasn't running, and I
  didn't start it.

### 2026-10-10: Astro rebuild on `redesign`

Commits `90c7129`, `1e9a1be`.

- Astro 7.3.8, Vite 8, TypeScript 6.0 (typescript-eslint and
  `@astrojs/check` don't support TypeScript 7 yet). `@emnapi/core` and
  `@emnapi/runtime` are listed only because `@astrojs/check` needs them and
  Yarn doesn't install peer dependencies.
- Pages: `/`, `/projects/`, `/projects/<slug>/`, `/cv/`, `/404`, and
  `/project/<slug>/` redirect pages that keep the `#hash`.
- Games moved with `git mv` from `public/project/<slug>/` to
  `public/projects/<slug>/play/`. nginx 301s the old paths.
- Content: `src/content/projects/*.md`, `src/content/experience.yaml`,
  `src/data/profile.ts`. Google's outcomes are three `TODO:` placeholders:
  shown by `yarn dev`, hidden in builds, with a build warning.
- Images in `src/assets/`, restored at full size from `main` (Phase 0 had
  deleted the originals) plus the solitaire screenshots.
- `deploy.yml` verifies every push and PR; on main it dispatches
  `fuzzley-updated` to fuzzley.github.io. That repo's new `pages.yml`
  (branch `pages-actions-deploy`) builds and publishes, games included.
- Gotchas found:
  - Astro 7 scopes component CSS with attribute selectors, which add
    specificity. A scoped `.a > *` outranks a scoped `.b`; name elements
    explicitly.
  - Astro drops whitespace at a line break before an inline element.
    Prettier's Astro plugin inserts `{" "}` where needed, so run
    `yarn prettier` before committing.
  - Headless Chrome won't render narrower than 512px; check phone widths
    through an iframe (see below).
- Content note: fMinesweeper's README says "TypeScript and Angular", but
  the deployed build is JavaScript with Knockout and Bootstrap. The project
  page describes what ships.
- Next: game repos.
