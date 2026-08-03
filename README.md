# fuzzley

Personal/portfolio website for Andrey Gavel: http://fuzzley.info

## Project Structure

- `frontend/`: The client-side single-page application built using Vite, Yarn, ESLint, and Prettier.
- `backend/` (future): Placeholder for future backend components/services.

## Frontend Development

This project uses [yarn](https://yarnpkg.com/) for dependency management and
[Vite](https://vite.dev/) for the dev server and production build.

To develop the frontend, navigate to the `frontend/` directory and run:

```sh
cd frontend

yarn install     # install dev dependencies
yarn dev         # start the dev server on http://localhost:9000
yarn build       # produce a production build in dist/
yarn preview     # serve the production build locally
yarn lint        # run ESLint
yarn prettier    # format the code with Prettier
```

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

### How it works

1. `frontend/public/env.js` ships a placeholder `window.__ENV = { GA_ID: "" }`
   with no real values, which Vite copies into the build.
2. On startup, `docker-entrypoint.d/40-generate-env-config.sh` (run
   automatically by the nginx base image) overwrites the served `env.js` from
   the container's environment variables.
3. `index.html` loads `env.js` and then `analytics.js`, the shared Google
   Analytics bootstrap, which initializes only when a measurement ID is present.
   With nothing set, the feature stays off — so local dev and unconfigured
   containers run with analytics disabled.
4. nginx serves `env.js` with `Cache-Control: no-store`, so a configuration
   change is never served from a stale cache. Rotating the ID therefore needs a
   container restart, not a rebuild.

### Project sub-pages

The pages under `/project/<slug>/` are production builds pushed in by their own
repositories (fMinesweeper, fPong, fSolitaire, fSpider, PATH). Those
repositories carry no analytics code of their own, so `yarn build` runs
`frontend/tools/inject-analytics.mjs`, which adds the `env.js` and
`analytics.js` tags to each project's `index.html` **in `dist/`** — never in
`public/`, whose contents the next sync from a project repository overwrites.

Every page therefore reports to the same measurement ID, and Google Analytics
separates them by path. A new project dropped into `public/project/<slug>/` is
picked up automatically at the next build; the script fails the build if a
project page has no `</head>` to attach to, so a page cannot go untracked
silently.

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

