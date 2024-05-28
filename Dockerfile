# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=20.11.1
FROM node:${NODE_VERSION}-slim as base

# Remix app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"

# необходимые переменные окружения (тестовые) для запуска remix app в продакшне
# @todo переделать по-нормальному
ENV SESSION_SECRET="some s3cr3t hash"
ENV DOMAIN_NAME="mrowenpak-fitls-demo-web-app-0cf5.twc1.net"

# Install pnpm
ARG PNPM_VERSION=9.1.3
RUN npm install -g pnpm@$PNPM_VERSION


# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

# Install node modules
COPY --link package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod=false

# Copy application code
COPY --link . .

# Build application
RUN pnpm run build

# Remove development dependencies
RUN pnpm prune --prod


# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app /app

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "pnpm", "run", "start" ]
