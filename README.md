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

