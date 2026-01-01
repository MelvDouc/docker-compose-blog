import type { Article, WithId } from "$client/types.ts";
import cssClasses from "./ArticleElement.module.scss";

export default function ArticleElement({ article }: {
  article: WithId<Article>;
}) {
  return (
    <div className={cssClasses.ArticleElement}>
      <h1>{article.title}</h1>
      <div>{article.content}</div>

      <h2>Tags</h2>
      <ul>
        {article.tags.map(({ name }) => (
          <li>{name}</li>
        ))}
      </ul>
    </div>
  );
}