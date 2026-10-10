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
yarn dev         # start the dev server on http://localhost:9000
yarn build       # produce a production build in dist/
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

| Path                        | What it is                                                     |
| --------------------------- | -------------------------------------------------------------- |
| `/`                         | The home page: a bento grid of tiles.                          |
| `/projects/`                | Every project.                                                 |
| `/projects/<slug>/`         | A page about one project.                                      |
| `/projects/<slug>/play/`    | The game itself, built and pushed in by its own repository.    |
| `/cv/`                      | The full work history, laid out to print as a resume.          |
| `/project/<slug>/`          | Old game addresses. They redirect to `/projects/<slug>/play/`. |

The words and pictures live in content files, not in the pages:

- `frontend/src/content/projects/<slug>.md`: one file per project. The front
  matter is checked against the schema in `frontend/src/content.config.ts`,
  and the body becomes the project page's write-up. The file name must match
  the game's folder in `frontend/public/projects/`.
- `frontend/src/content/experience.yaml`: the work history.
- `frontend/src/data/profile.ts`: name, bio, links and education.
- `frontend/src/assets/`: screenshots and the photo. The build resizes them
  and converts them to AVIF and WebP.

A highlight in `experience.yaml` that starts with `TODO` is a placeholder:
`yarn dev` shows it with a dashed outline, production builds leave it out, and
`yarn build` prints a warning while any remain.

## Deployment

Pushes to `main` run `.github/workflows/deploy.yml`, which type-checks, lints
and builds, then triggers the workflow in
[fuzzley/fuzzley.github.io](https://github.com/fuzzley/fuzzley.github.io) that
builds the site again and publishes it with GitHub Pages. GitHub Pages deploys
from the repository its workflow runs in, which is why the publishing job lives
there.

The Docker image below is the older way the site was served, on Cloud Run. It
still builds and works.

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

The games under `/projects/<slug>/play/` are production builds pushed in by their own
repositories (fMinesweeper, fPong, fSolitaire, fSpider, PATH). Those
repositories carry no analytics code of their own, so `yarn build` runs
`frontend/tools/inject-analytics.mjs`, which adds the `env.js` and
`analytics.js` tags to each project's `index.html` **in `dist/`** — never in
`public/`, whose contents the next sync from a project repository overwrites.

Every page therefore reports to the same measurement ID, and Google Analytics
separates them by path. A new game dropped into `public/projects/<slug>/play/`
is picked up automatically at the next build; the script fails the build if a
game has no `</head>` to attach to, so a page cannot go untracked silently. A
new game also needs `src/content/projects/<slug>.md` for its tile and page.

### Supported variables

| Environment variable   | Purpose                                                                  | Example        |
| ---------------------- | ------------------------------------------------------------------------ | -------------- |
| `GA_AG_MEASUREMENT_ID` | Google Analytics 4 measurement ID. Leave unset to disable analytics.     | `G-XXXXXXXXXX` |

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

