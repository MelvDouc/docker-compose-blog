import { articlesRouter } from "$server/api/v1/articles.js";
import { authRouter } from "$server/api/v1/auth.js";
import { Hono as Router } from "hono";

export const apiRouter = new Router();

apiRouter.route("/auth", authRouter);
apiRouter.route("/articles", articlesRouter);