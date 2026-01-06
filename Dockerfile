FROM node:22-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable pnpm

FROM base AS builder

WORKDIR /app

COPY package.json pnpm*.yaml ./
COPY packages/client/package.json ./packages/client/
COPY packages/server/package.json ./packages/server/
COPY packages/common ./packages/common/

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

COPY . ./
RUN pnpm run -r build
RUN pnpm deploy --filter=client --prod ./prod/client/
RUN pnpm deploy --filter=server --prod ./prod/server/

FROM nginx:stable-alpine3.23-perl AS client

COPY --from=builder /app/prod/client/dist /usr/share/nginx/html
COPY packages/client/config/nginx.conf /etc/nginx/conf.d/default.conf

CMD [ "nginx", "-g", "daemon off;" ]

FROM base AS server

WORKDIR /app

COPY --from=builder /app/prod/server/package.json ./
COPY --from=builder /app/prod/server/dist ./dist/
COPY --from=builder /app/prod/server/node_modules ./node_modules/

CMD [ "node", "dist/index.js" ]