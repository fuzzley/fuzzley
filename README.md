# fuzzley

Personal website for Andrey Gavel: https://fuzzley.info

## Project Structure

- `frontend/`: the site, a static [Astro](https://astro.build/) build with no
  client-side framework.
- `branding/`: the favicon set and the home page's link preview, with the
  scripts that draw them.

## Frontend Development

This project uses [Yarn](https://yarnpkg.com/) for dependency management and
[Astro](https://astro.build/) for the dev server and production build.

```sh
cd frontend

yarn install     # install dev dependencies
yarn dev         # fetch the games, then start the dev server on http://localhost:9000
yarn build       # fetch the games, then produce a production build in dist/
yarn games       # fetch the games pinned in games.json (--force to fetch them again)
yarn preview     # serve the production build locally
yarn stop        # stop a dev server started with `astro dev --background`
yarn force-stop  # stop every dev or preview server running from this checkout
                 #   (--dry-run lists them without stopping them)
yarn check       # type-check with astro check
yarn lint        # run ESLint
yarn prettier    # format the code with Prettier
yarn verify      # type-check, lint, check formatting and build
```

## Pages and Content

| Path                     | What it is                                                          |
| ------------------------ | ------------------------------------------------------------------- |
| `/`                      | The home page: a bento grid of tiles.                               |
| `/projects/`             | Every project.                                                      |
| `/projects/<slug>/`      | A page about one project.                                           |
| `/projects/<slug>/play/` | The game itself, built by its own repository (see [Games](#games)). |
| `/cv/`                   | The full work history, laid out to print as a resume.               |
| `/project/<slug>/`       | Old game addresses. They redirect to `/projects/<slug>/play/`.      |

The Solitaire Collection and Minesweeper are played on
[fuzzley.games](https://fuzzley.games) now, at
https://fuzzley.games/play/solitaire/ and
https://fuzzley.games/play/minesweeper/. Their project pages stay here, and
their old addresses, `/projects/<slug>/play/` and `/project/<slug>/`,
redirect there with every file under them (see [Games](#games)).

The words and pictures live in content files, not in the pages:

- `frontend/src/content/projects/<slug>.md`: one file per project. The front
  matter is checked against the schema in `frontend/src/content.config.ts`,
  and the body becomes the project page's write-up. The file name must match
  the game's key in `frontend/games.json`, unless the game is played on
  another site, which `playUrl` names.
- `frontend/src/content/experience.yaml`: the work history.
- `frontend/src/data/profile.ts`: name, bio, links and education.
- `frontend/src/assets/`: screenshots and the photo. The build resizes them
  and converts them to AVIF and WebP.

A highlight in `experience.yaml` that starts with `TODO` is a placeholder:
`yarn dev` shows it with a dashed outline, production builds leave it out, and
`yarn build` prints a warning while any remain.

## Games

Each game is built in its own repository (fSpider, fPong). Every push
to a game's `main` builds it and uploads the build to
that repository's `site-build` release as `<slug>-<short sha>.tar.gz`, then
replaces `latest.json` there, which names the newest archive. The release keeps
the ten newest archives and the one this site pins.

`frontend/games.json` pins one archive per game, by name and SHA-256.
`frontend/tools/fetch-games.mjs` downloads each pinned archive (cached in
`node_modules/.cache/games/`), checks its SHA-256 and unpacks it into
`frontend/public/projects/<slug>/play/`, which git ignores. `yarn dev` and
`yarn build` run it first, so the Docker build fetches the games too.

Every 15 minutes, `.github/workflows/update-games.yml` moves each pin to the
newest build, builds the site, and pushes the change to `main` if the build
passes; Cloud Run then deploys it. It uses only its own `GITHUB_TOKEN`, and
no game repository can push here. If the build fails, it opens a
"Game update failed" issue and skips that archive until the issue is closed or
a newer build appears. GitHub turns scheduled workflows off after 60 days
without activity, so if a game's update never arrives, check that Update games
is enabled under Actions.

- **Roll a game back:** set its entry in `games.json` to an older archive
  from its release (`gh release view site-build --repo fuzzley/<repo>`), with
  that archive's SHA-256 and commit, and push. The next scheduled run moves
  it forward again once the game has a newer build than that.
- **Add a game:** give its repository the same deploy job (copy one of the
  others), push once so its release exists, add its entry to `games.json`
  from its `latest.json`, and add `frontend/src/content/projects/<slug>.md`.

A game can move to another site. The Solitaire Collection (fSolitaire) and
Minesweeper (fMinesweeper) did, to fuzzley.games, which pins and fetches them
the same way. Such a game has no
entry in `games.json`, and its content file names its new address in
`playUrl`, which every play link uses. `fetch-games.mjs` deletes its old
folder from `public/projects/`. nginx answers its old addresses with a 301
(see `nginx.conf.template`); GitHub Pages can't, so the build also makes a
`/projects/<slug>/play/` page that forwards there, as the `/project/<slug>/`
pages do.

Why it works this way, and the options considered, are in
[docs/game-builds.md](docs/game-builds.md).

## Deployment

fuzzley.info is the site. Cloud Run serves it from the Docker image below, and
rebuilds and deploys that image on every push to `main` by itself, without
waiting for the checks that follow.

The images go to Artifact Registry (`cloud-run-source-deploy` in
`northamerica-northeast2`), whose cleanup policy keeps the 30 newest versions,
about ten builds since each build also stores two small provenance records,
and deletes any other once it is a week old. Cloud Run keeps its own copy of
the image a serving revision runs, so the policy never takes the site down; it
only limits how far back a rollback can go.

Pushes to `main` also run `.github/workflows/deploy.yml`, which type-checks,
lints and builds, then triggers the workflow in
[fuzzley/fuzzley.github.io](https://github.com/fuzzley/fuzzley.github.io) that
builds a copy of the site and publishes it at https://fuzzley.github.io/ with
GitHub Pages. GitHub Pages deploys from the repository its workflow runs in,
which is why the publishing job lives there. The run here waits for that
deploy to finish, so a failed deploy shows on the commit.

The GitHub Pages copy leaves out the games. Its workflow builds with
`PLAY_ORIGIN=https://fuzzley.info`, which deletes each fetched game's
`projects/<slug>/play/` from `dist/` and points every play link, and the old
`/project/<slug>/` redirects, at the games on fuzzley.info. A game with a
`playUrl` is linked there instead, from both copies. To see that build locally:

```sh
cd frontend
PLAY_ORIGIN=https://fuzzley.info yarn build && yarn preview
```

Without `PLAY_ORIGIN`, as in the Docker build and `yarn dev`, the games are
fetched and ship with the site.

Pushes made by Update games don't run `deploy.yml` (GitHub doesn't start
workflows from a workflow's own pushes), which is fine: the GitHub Pages copy
has no games. Cloud Run deploys them as usual.

## Docker Build & Run (Local Testing)

To test the containerized application locally, run these commands from the repository root directory:

1. **Build the Docker Image**:

   ```sh
   docker build -t fuzzley-site .
   ```

2. **Run the Container Locally**:

   ```sh
   docker run -d --name fuzzley-container -p 8080:8080 -e PORT=8080 fuzzley-site
   ```

3. **Verify**:
   Open [http://localhost:8080](http://localhost:8080) in your browser.

4. **Cleanup**:
   ```sh
   docker stop fuzzley-container
   docker rm fuzzley-container
   ```

## Runtime Configuration

The frontend is a static build, but a few values (currently the GA ID) are
injected at **container startup** rather than baked into the build. This keeps IDs
out of the repository and the image layers, and lets the same image run
anywhere with different configuration.

GitHub Pages has no startup step, so there the Pages workflow writes the same
`env.js` after the build, from the repository variable `GA_AG_MEASUREMENT_ID`
in fuzzley/fuzzley.github.io.

### How it works

1. `frontend/public/env.js` ships a placeholder `window.__ENV = { GA_ID: "" }`
   with no real values, which Astro copies into the build.
2. On startup, `docker-entrypoint.d/40-generate-env-config.sh` (run
   automatically by the nginx base image) overwrites the served `env.js` from
   the container's environment variables.
3. Every page loads `env.js` and then `analytics.js` (the tags are in
   `frontend/src/layouts/Base.astro`), the shared Google
   Analytics bootstrap, which initializes only when a measurement ID is present.
   With nothing set, the feature stays off — so local dev and unconfigured
   containers run with analytics disabled.
4. nginx serves `env.js` with `Cache-Control: no-store`, so a configuration
   change is never served from a stale cache. Rotating the ID therefore needs a
   container restart, not a rebuild.

### Games

The games under `/projects/<slug>/play/` are production builds of their own
repositories (see [Games](#games)), which carry no analytics code of their
own, so `yarn build` runs `frontend/tools/inject-analytics.mjs`, which adds the
`env.js` and `analytics.js` tags to each game's `index.html` **in `dist/`**,
never in the fetched files in `public/`.

Every page therefore reports to the same measurement ID, and Google Analytics
separates them by path. Every fetched game is instrumented at the next build;
the script fails the build if a game has no `</head>` to attach to, so a page
cannot go untracked silently. A build with `PLAY_ORIGIN` set has no games, so
there the script does nothing.

### Supported variables

| Environment variable   | Purpose                                                              | Example        |
| ---------------------- | -------------------------------------------------------------------- | -------------- |
| `GA_AG_MEASUREMENT_ID` | Google Analytics 4 measurement ID. Leave unset to disable analytics. | `G-XXXXXXXXXX` |

### Providing values

Set the variable however your host injects environment variables — a
`docker run -e` flag, a Docker Compose `environment:` block, a Kubernetes
`env`/secret, or a PaaS secret store (Cloud Run, Fly.io, Render, and similar).
Because the value is read at startup, it never appears in source control or the
image.

Local Docker example:

```sh
docker run -d --name fuzzley-container -p 8080:8080 \
  -e PORT=8080 \
  -e GA_AG_MEASUREMENT_ID=G-XXXXXXXXXX \
  fuzzley-site
```
