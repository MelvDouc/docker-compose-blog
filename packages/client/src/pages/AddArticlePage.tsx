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
  const [savedArticle, errors] = await addArticle(article);

  if (errors) {
    console.log({ errors });
    return;
  }

  navigate(`/articles?id=${savedArticle.id}`, savedArticle);
}