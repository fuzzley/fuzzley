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
3. `index.html` loads `env.js` and initializes each feature only when its value
   is present. With nothing set, the feature stays off — so local dev and
   unconfigured containers run with analytics disabled.
4. nginx serves `env.js` with `Cache-Control: no-store`, so a configuration
   change is never served from a stale cache.

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

