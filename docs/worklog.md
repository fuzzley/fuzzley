# Redesign work log

A running record of the fuzzley.info redesign: what was decided, what is done,
and exactly where to pick up. Newest log entries go at the bottom of
[Log](#log); update [Status](#status) whenever a step finishes.

Plan, mocks and rationale: https://claude.ai/artifact/NpYyaw1fX9REPFMcC6i2sM
(private; open it signed in as the repo owner).

## Status

- **Current branch:** `redesign` (built on `quick-fixes`)
- **Last step finished:** all code work. Every branch below is committed.
- **Next step:** the owner reviews, then follows the
  [Cutover runbook](#cutover-runbook) from step 1.
- **Nothing has been pushed.** All work is in local commits.

### Branches

| Repository        | Branch                  | Holds                                                       |
| ----------------- | ----------------------- | ----------------------------------------------------------- |
| fuzzley           | `quick-fixes`           | Phase 0 fixes to the old site. Can ship on its own.         |
| fuzzley           | `redesign`              | Everything in `quick-fixes`, plus the Astro rebuild.        |
| fuzzley.github.io | `pages-actions-deploy`  | The Pages workflow that builds and publishes fuzzley.info.  |
| fSolitaire        | `move-to-projects-play` | Deploys to the new path; canonical and preview URLs moved.  |
| fSpider           | `move-to-projects-play` | Deploys to the new path; README link.                       |
| fMinesweeper      | `move-to-projects-play` | Deploys to the new path; README link.                       |
| fPong             | `move-to-projects-play` | Deploys to the new path; README link.                       |
| PATH              | `move-to-projects-play` | Deploys to the new path; README link.                       |

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
- [x] Phase 4: polish (link preview image, play events, view transitions)
- [x] Game repos: point each deploy at `public/projects/<slug>/play`
- [ ] Cutover runbook carried out by the owner (see below)
- [x] Google outcomes in `src/content/experience.yaml` (from the owner's text)

Ideas not started: game clips on the tiles (declined for now), fPoker's tile
(waits until it is playable), a Content Security Policy as a `<meta>` tag,
an automated accessibility check (axe) in CI.

## Checking pages

`yarn verify` runs `astro check`, ESLint, the Prettier check and the build.
`yarn stop --dry-run` lists any dev or preview servers left running from this
checkout, and `yarn stop` ends them. Use the dry run first: the owner may have
a server of their own running.
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

Order matters: each step assumes the ones before it. Steps 1 to 4 ship the
redesign on the current hosting (Cloud Run); steps 5 to 11 move hosting to
GitHub Pages and can wait.

**Ship the redesign**

1. **Test the container build.** Cloud Run rebuilds from `main` on every push,
   and the Docker build of the Astro site hasn't been run yet. Start Docker
   Desktop, then from the repo root:
   `docker build -t fuzzley-site . && docker run --rm -p 8080:8080 -e PORT=8080 fuzzley-site`
   and check http://localhost:8080/, `/projects/solitaire/play/`,
   `/project/solitaire/` (should 301) and a missing page (should 404).
2. **Optional, to ship the Phase 0 fixes first:** push `quick-fixes` to `main`
   (a fast-forward). It deploys to Cloud Run and to the current Pages copy.
3. **Merge `redesign` into `main` and push.** Cloud Run rebuilds with the new
   site. The new `deploy.yml` also sends a dispatch to fuzzley.github.io;
   until step 6 nothing there listens, which is harmless.
4. **Right after step 3, merge each game repo's `move-to-projects-play`
   branch and push.** Each push redeploys that game into
   `public/projects/<slug>/play/`. Don't let a game deploy from its old
   `main` after step 3: it would write the old `public/project/<slug>/`
   folder back, which clashes with the redirect pages Astro builds there.

**Move hosting to GitHub Pages**

5. **Give Pages the analytics ID.** Read it with
   `gcloud secrets versions access latest --secret=ga-ag-measurement-id --project=agavel-personal`
   and set it with
   `gh variable set GA_AG_MEASUREMENT_ID --repo fuzzley/fuzzley.github.io --body <id>`.
6. **Merge fuzzley.github.io's `pages-actions-deploy` into its `main` and
   push.** GitHub only runs `repository_dispatch` workflows from the default
   branch.
7. **Switch the Pages source.** fuzzley.github.io → Settings → Pages →
   Source: **GitHub Actions**. Then Actions → "Build and deploy fuzzley.info"
   → Run workflow. Check https://fuzzley.github.io/ shows the new site and
   the games play.
8. **Verify the domain with GitHub first** (prevents takeover):
   github.com/settings/pages → Add a domain → fuzzley.info, then add the TXT
   record it shows at Porkbun.
9. **Point fuzzley.info at Pages.** At Porkbun, delete the eight Cloud Run
   records (A 216.239.32.21, .34.21, .36.21, .38.21; AAAA
   2001:4860:4802:32::15, :34::15, :36::15, :38::15) and add:
   - A: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
   - AAAA: 2606:50c0:8000::153, 2606:50c0:8001::153, 2606:50c0:8002::153,
     2606:50c0:8003::153
   - CNAME `www` → `fuzzley.github.io` (optional; Pages then redirects www)

   Then in fuzzley.github.io → Settings → Pages, set the custom domain to
   fuzzley.info, wait for the certificate, and tick **Enforce HTTPS**.
   fuzzley.github.io starts redirecting to fuzzley.info by itself.
10. **Forward the other four domains** (andreygavel.com, andrey-gavel.com,
    fuzzley.net, fuzzley.org). At Porkbun, for each: delete its Cloud Run A
    and AAAA records, then add URL forwarding to `https://fuzzley.info` as a
    permanent (301) redirect, with the path included. Check that
    `https://` works on each afterwards. If Porkbun's forwarding can't serve
    HTTPS for one, keep that domain's Cloud Run mapping until it can.
11. **After a week with no problems, retire Cloud Run:** delete the five
    domain mappings (`gcloud beta run domain-mappings delete --domain <d>
    --region us-central1 --project agavel-personal`), both `fuzzley-git`
    services (us-central1 and northamerica-northeast2), and the
    deploy-from-repository connection. The old images in Artifact Registry
    can go too. The built files at the top of the fuzzley.github.io repo
    can be deleted; Pages ignores them once it deploys from Actions.

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

### 2026-10-10: game repos, polish, docs

- Game repos: each has a `move-to-projects-play` branch that deploys to
  `public/projects/<slug>/play` and updates README links. fSolitaire also
  moves its canonical, `og:url`, `og:image` and structured-data URLs and its
  agent docs; its `yarn lint` and `test/ui/index_html.spec.ts` pass.
- Checked in headless Chrome: `/project/solitaire/#klondike` ends at
  `/projects/solitaire/play/#/klondike` with Klondike open, and `/#/contact`
  ends at `/#contact`.
- Home page weight, measured from `dist/` for a 1280px screen: about
  149 KB (HTML 4 KB and CSS 2 KB gzipped, font 75 KB, images 67 KB). The
  only scripts are `env.js` and `analytics.js` plus two small inline ones.
- Commits on `redesign`: `44c80b6` (new link preview, drawn by
  `branding/og-image/make_og_home.py`), `2b2f026` (README), `2e0c544`
  (`play_game` analytics event for clicks into a game).
- Next: the owner's review and the Cutover runbook.

### 2026-10-10: Google outcomes and the Now tile

- LinkedIn's public profile is behind its sign-in wall and the Chrome
  extension wasn't connected, so the owner pasted the role description.
  `15981a3` turns it into five present-tense highlights: the team of eight,
  LLM training data and fine-tuning tooling, usage insights for leadership,
  Cloud documentation infrastructure, and the developer documentation CMS.
- `0980773`: Google's focus is now "Generative AI, usage insights and
  documentation infrastructure". The Now tile is one column (job and date,
  then Focus, then outcomes) and takes half the grid from 56rem up, with
  the four game tiles in a 2x2 block beside it. Checked at 1280px, 960px
  and 390px.
- Not changed: the `/cv` bio in `src/data/profile.ts` still describes the
  Google role as managing "a team of software engineers working on
  developer relations projects".
- Next: the owner's review and the Cutover runbook.
