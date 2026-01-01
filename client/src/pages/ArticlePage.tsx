import ArticleElement from "$client/components/ArticleElement/ArticleElement.tsx";
import Page from "$client/components/Page/Page.tsx";
import type { Article, AsyncResult, WithId } from "$client/types.ts";
import { getArticle as getArticleAPI } from "$client/utils/api.ts";
import { pageNotFound } from "reactfree-jsx/extra/router";

export default async function ArticlePage({ id }: {
  id: string;
}) {
  const result = await getArticle(+id);

  if (!result.success)
    pageNotFound(result.value);

  const article = result.value;

  return (
    <Page title={article.title}>
      <ArticleElement article={article} />
    </Page>
  );
}

async function getArticle(id: number): AsyncResult<WithId<Article>, string> {
  const state = history.state;

  if (state)
    return { success: true, value: state };

  return getArticleAPI(id);
}