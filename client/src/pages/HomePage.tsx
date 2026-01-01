import ArticleElement from "$client/components/ArticleElement/ArticleElement.tsx";
import Page from "$client/components/Page/Page.tsx";
import { getLastArticle } from "$client/utils/api.ts";

export default async function HomePage() {
  const result = await getLastArticle();
  const lastArticle = result.success ? result.value : null;

  return (
    <Page title="Home">
      {lastArticle && (
        <ArticleElement article={lastArticle} />
      )}
    </Page>
  );
}