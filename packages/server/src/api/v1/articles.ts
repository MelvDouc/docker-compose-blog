import type { PublicUser } from "@blog/common";
import AppDataSource from "$server/core/data-source.js";
import Article from "$server/entities/Article.js";
import { validateArticle } from "$server/schemas/article.schema.ts";
import { Hono as Router } from "hono";

export const articlesRouter = new Router<{
  Variables: { user: PublicUser; };
}>();

articlesRouter.use("/@/:id", async (ctx, next) => {
  const id = ctx.req.param("id");

  if (!/^[1-9][0-9]*/.test(id))
    return ctx.newResponse(null, 400);

  await next();
});

articlesRouter.post("/", async (ctx) => {
  const data = await ctx.req.json();
  const errors = validateArticle(data);

  if (errors)
    return ctx.json([null, errors]);

  const article = new Article();
  article.title = data.title;
  article.content = data.content;
  article.tags ??= [];

  const repo = AppDataSource.getRepository(Article);
  const savedArticle = await repo.save(article);
  return ctx.json([savedArticle, null]);
});

articlesRouter.get("/@/:id", async (ctx) => {
  const id = ctx.req.param("id");
  const repo = AppDataSource.getRepository(Article);

  const article = await repo.findOne({
    where: { id: +id },
    relations: { tags: true }
  });

  if (!article)
    return ctx.json([null, "Article not found."]);

  // FIXME
  article.tags ??= [];
  return ctx.json([article, null]);
});

articlesRouter.patch("/@/:id", async (ctx) => {
  const id = ctx.req.param("id");
  const repo = AppDataSource.getRepository(Article);
  const article = await repo.findOneBy({ id: +id });

  if (!article)
    return ctx.notFound();

  const data = await ctx.req.json();
  const errors = validateArticle(data);

  if (errors)
    return ctx.json([null, errors]);

  article.title = data.title;
  article.content = data.content;
  article.tags ??= [];

  const savedArticle = await repo.save(article);
  return ctx.json([savedArticle, null]);
});

articlesRouter.delete("/@/:id", async (ctx) => {
  const id = ctx.req.param("id");
  const repo = AppDataSource.getRepository(Article);
  const { affected } = await repo.delete({ id: +id });

  return ctx.json(
    typeof affected === "number" && affected === 1
      ? [true, null]
      : [null, `Article with id ${id} could not be deleted.`]
  );
});

articlesRouter.get("/last", async (ctx) => {
  const repo = AppDataSource.getRepository(Article);
  const lastId = await repo.maximum("id");

  if (lastId === null)
    return ctx.json([null, "Article not found."]);

  const article = await repo.findOne({
    where: { id: lastId },
    relations: { tags: true }
  }) as Article;
  article.tags ??= [];
  return ctx.json([article, null]);
});