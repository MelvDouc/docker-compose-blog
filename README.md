# Docker Compose Blog

A sample full-stack application to practice using Docker Compose.

## Services

### Database

- driver: PostgreSQL
- image: [postgres](https://hub.docker.com/_/postgres/)

### Server

- runtime: NodeJS
- framework: [Hono](https://hono.dev/)
- ORM: [TypeORM](https://typeorm.io/)

### Client

- bundler: Vite
  - set up environment variables: [doc](https://vite.dev/guide/env-and-mode#modes)
- JSX: [reactfree-jsx](https://www.npmjs.com/package/reactfree-jsx)
- production server: [Nginx](https://nginx.org/en/)

## Service config

Properties of `services.$service` in `docker-compose.yml` (referred to as *"config"* thereafter).

### build

- `context`: path to service files relative to *config*.
- `dockerfile`: if not called "Dockerfile", path to a Dockerfile relative to `context`.

### restart

- Set to `no` in development so that a service that crashed can be debugged without restarting automatically.
- Set to `always` in production — and pray the container fixes itself. 😑

### env_file

If a file called *exactly* `.env` is in the same directory as *config*, then its variables will be available in ***config***, not in the container.

The `env_file` property serves to load variables into the **container**.

To load environment variables into *config* from a file not called `.env`, use the command line option `--env-file`, e.g. `docker compose --env-file .env.dev up`.

### ports

Syntax: `($host_port:)$container_port`.

- database:
  - dev: 5432 — Postgres defaults to 5432 in the container.
  - prod: *blank*. Requests to the db container with the protocol `postgresql://` will default to 5432 if the port is omitted.
- server: Any available port on both the host and container can be safely used.
- client:
  - dev: **5173**:5173 — Vite's default, configurable port. The container port matters little unless requests are somehow made from another service to the Vite server.
  - prod: 5173:**80** — As a web server, [Nginx](#nginx) uses the default HTTP port.

### volumes

- Named volume: `$volume:$container_dir`.
  - Stores data that should persist across rebuilds, like database files.
  - Must be declared under the global `volumes` property.
- Bind mount: `./$host_dir:$container_dir`.
  - Mounts a local directory into the container, thus bypassing the need to copy any files.
  - Handy with source code in development.
  - Makes hot reloading possible.

### healthcheck

Run a command to test if a container is ready and operational.

Subsequent services may await a positive result before starting:

```yml
services:
  service1:
    healthcheck:
      test: echo I'm okay!
  service2:
    depends_on:
      service1:
        condition: service_healthy
```

## Nginx

Vite will build a static site out of the client service; the build can then be copied into an Nginx container which will serve it with little configuration.

Nginx furthermore enables redirecting certains requests to other services:

```nginx
server {
  #...

  location /api/ {
    proxy_pass http://server_container:5174/api/;
  }
}
```

- URL starts with `/api/` ⇒ redirected to the REST API service.
- otherwise ⇒ serve `index.html` or a static asset.
