import { articlesRouter } from "$server/api/v1/articles.js";
import { Hono as Router } from "hono";

export const apiRouter = new Router();

apiRouter.route("/articles", articlesRouter);