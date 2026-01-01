import "reflect-metadata";
import { app } from "$server/core/Application.js";
import AppDataSource from "$server/core/data-source.js";
import { serve } from "@hono/node-server";

const port = +process.env.HONO_PORT;

await AppDataSource.initialize();
console.log("Data source initialized.");

serve({ fetch: app.fetch, port }, () => {
  console.log(
    process.env.NODE_ENV === "production"
      ? `App running port ${port}`
      : `App running at http://localhost:${port}`
  );
});