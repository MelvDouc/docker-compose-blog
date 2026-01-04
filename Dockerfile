# ===== ===== ===== ===== =====
# Common builder
# ===== ===== ===== ===== =====

FROM node:lts-alpine3.23 AS builder

WORKDIR /app

RUN npm config set update-notifier false

COPY . .
RUN npm ci

RUN npm run -w @blog/client build

# Normally pruning deps in Docker is bad because it prevents the layer from being cached.
# It's however necessary in this case because of NPM workspaces.
# Installing dependencies in the final container will fail if not all workspaces are present
# no matter the fact that the @blog/common is a dev dep.
RUN npm run -w @blog/server build
RUN npm -w @blog/server prune --omit=dev

# ===== ===== ===== ===== =====
# Client
# ===== ===== ===== ===== =====

FROM nginx:stable-alpine3.23-perl AS client

COPY --from=builder /app/client/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]

# ===== ===== ===== ===== =====
# Server
# ===== ===== ===== ===== =====

FROM node:lts-alpine3.23 AS server

WORKDIR /app

RUN npm config set update-notifier false

COPY --from=builder /app/server/package.json .
COPY --from=builder /app/server/node_modules ./node_modules/
COPY --from=builder /app/server/dist ./dist/

CMD ["npm", "start"]