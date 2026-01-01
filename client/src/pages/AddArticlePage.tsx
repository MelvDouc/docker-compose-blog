import ArticleForm from "$client/components/ArticleForm/ArticleForm.tsx";
import Page from "$client/components/Page/Page.tsx";
import type { Article } from "$client/types.ts";
import { addArticle } from "$client/utils/api.ts";
import { navigate } from "reactfree-jsx/extra/router";

export default function AddArticlePage() {
  return (
    <Page title="Add an article">
      <ArticleForm article={null} handleSubmit={handleSubmit} />
    </Page>
  );
}

async function handleSubmit(article: Article): Promise<void> {
  const result = await addArticle(article);

  if (!result.success) {
    console.log({ error: result.value });
    return;
  }

  const articleWithId = result.value;
  navigate(`/articles?id=${articleWithId.id}`, articleWithId);
}