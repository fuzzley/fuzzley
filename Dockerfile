# Stage 1: Build the Vite application
FROM node:22-alpine AS build

WORKDIR /app

# Copy package files and lock files
COPY frontend/package.json frontend/yarn.lock* ./frontend/

# Install dependencies (using yarn since yarn.lock exists)
WORKDIR /app/frontend
RUN yarn install --frozen-lockfile

# Copy the rest of the frontend source code
WORKDIR /app
COPY frontend/ ./frontend/

# Build the application
WORKDIR /app/frontend
RUN yarn build

# Stage 2: Serve the application using Nginx
FROM nginx:alpine

# Copy the build output to Nginx's default public directory
COPY --from=build /app/frontend/dist /usr/share/nginx/html

# Copy our custom Nginx template that uses the PORT environment variable
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

# Generate runtime config (e.g. GA_AG_MEASUREMENT_ID) into env.js at container
# startup. The nginx image runs every /docker-entrypoint.d/*.sh before starting;
# chmod is required because git on Windows does not preserve the exec bit.
COPY docker-entrypoint.d/40-generate-env-config.sh /docker-entrypoint.d/40-generate-env-config.sh
RUN chmod +x /docker-entrypoint.d/40-generate-env-config.sh

# The official Nginx image automatically substitutes $PORT in
# /etc/nginx/templates/default.conf.template and outputs to
# /etc/nginx/conf.d/default.conf on startup.
EXPOSE 8080
