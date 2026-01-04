import ArticleElement from "$client/components/ArticleElement/ArticleElement.tsx";
import Page from "$client/components/Page/Page.tsx";
import type { Article, WithId } from "$client/types.ts";
import { getArticle as getArticleAPI } from "$client/utils/api.ts";
import type { AsyncResult } from "@blog/common";
import { pageNotFound } from "reactfree-jsx/extra/router";

export default async function ArticlePage({ id }: {
  id: string;
}) {
  const [article, error] = await getArticle(+id);

  if (error !== null)
    pageNotFound(error);

  return (
    <Page title={article.title}>
      <ArticleElement article={article} />
    </Page>
  );
}

async function getArticle(id: number): AsyncResult<WithId<Article>, string> {
  const state = history.state;

  if (state)
    return [state, null];

  return getArticleAPI(id);
}