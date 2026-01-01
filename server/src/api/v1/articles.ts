import AppDataSource from "$server/core/data-source.js";
import Article from "$server/entities/Article.js";
import { validateArticle } from "$server/schemas/ArticleSchema.js";
import { Hono as Router } from "hono";

// TODO: auth middleware

export const articlesRouter = new Router();

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
    return ctx.json({ success: false, value: errors });

  const article = new Article();
  article.title = data.title;
  article.content = data.content;
  article.tags ??= [];

  const repo = AppDataSource.getRepository(Article);
  const value = await repo.save(article);
  return ctx.json({ success: true, value });
});

articlesRouter.get("/@/:id", async (ctx) => {
  const id = ctx.req.param("id");
  const repo = AppDataSource.getRepository(Article);

  const article = await repo.findOne({
    where: { id: +id },
    relations: { tags: true }
  });

  if (!article)
    return ctx.json({ success: false, value: "Article not found." });

  article.tags ??= [];
  return ctx.json({ success: true, value: article });
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
    return ctx.json({ success: false, value: errors });

  article.title = data.title;
  article.content = data.content;
  article.tags ??= [];

  const value = await repo.save(article);
  return ctx.json({ success: true, value });
});

articlesRouter.delete("/@/:id", async (ctx) => {
  const id = ctx.req.param("id");
  const repo = AppDataSource.getRepository(Article);
  const { affected } = await repo.delete({ id: +id });

  return ctx.json(
    typeof affected === "number" && affected === 1
      ? { success: true, value: null }
      : { success: false, value: `Article with id ${id} could not be deleted.` }
  );
});

articlesRouter.get("/last", async (ctx) => {
  const repo = AppDataSource.getRepository(Article);
  const lastId = await repo.maximum("id");

  if (lastId === null)
    return ctx.json({ success: false, value: "Article not found." });

  const article = await repo.findOne({
    where: { id: lastId },
    relations: { tags: true }
  }) as Article;
  article.tags ??= [];
  return ctx.json({ success: true, value: article });
});