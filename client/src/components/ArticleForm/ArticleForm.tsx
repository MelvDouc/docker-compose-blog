import Button from "$client/components/Button/Button.tsx";
import type { Article } from "$client/types.ts";
import cssClasses from "./ArticleForm.module.scss";

export default function ArticleForm({ article, handleSubmit }: {
  article: Article | null;
  handleSubmit: (article: Article) => unknown;
}) {
  const onSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    const article = {
      title: data.get("title") as string,
      content: data.get("content") as string,
      tags: [] // TODO: handle tags
    };
    handleSubmit(article);
  };

  return (
    <form className={cssClasses.ArticleForm} on:submit={onSubmit}>
      <section className={cssClasses.TitleRow}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          maxLength={255}
          value={article?.title ?? ""}
          autofocus
          required
        />
      </section>
      <section className={cssClasses.ContentRow}>
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" required>{article?.content}</textarea>
      </section>
      <section>
        <Button type="submit">Submit</Button>
      </section>
    </form>
  );
}
