import Article from "$server/entities/Article.js";
import Tag from "$server/entities/Tag.js";
import User from "$server/entities/User.js";
import { dirname, join as pathJoin } from "node:path";
import { DataSource } from "typeorm";

const isProduction = process.env.NODE_ENV === "production";

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: !isProduction,
  logging: false,
  entities: [Article, Tag, User],
  subscribers: [],
  migrations: [
    isProduction
      ? pathJoin(import.meta.dirname, "migrations")
      : pathJoin(dirname(import.meta.dirname), "migrations")
  ]
});

export default AppDataSource;