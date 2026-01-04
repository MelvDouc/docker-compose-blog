FROM node:22-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable


FROM base AS builder

WORKDIR /app

COPY . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

RUN pnpm run -r build
RUN pnpm deploy --filter=client --prod ./client-prod
RUN pnpm deploy --filter=server --prod ./server-prod

# Normally pruning deps in Docker is bad because it prevents the layer from being cached.
# It's however necessary in this case because of NPM workspaces.
# Installing dependencies in the final container will fail if not all workspaces are present
# no matter the fact that the @blog/common is a dev dep.


FROM nginx:stable-alpine3.23-perl AS client

COPY --from=builder /app/client-prod/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]


FROM base AS server

WORKDIR /app

COPY --from=builder /app/server-prod/package.json .
COPY --from=builder /app/server-prod/dist ./dist/
COPY --from=builder /app/server-prod/node_modules ./node_modules/

CMD ["npm", "start"]