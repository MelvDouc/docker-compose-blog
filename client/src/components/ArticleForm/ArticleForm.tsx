import Button from "$client/components/Button/Button.tsx";
import Form from "$client/components/Form/Form.tsx";
import type { Article } from "$client/types.ts";

export default function ArticleForm({ article, handleSubmit: _handleSubmit }: {
  article: Article | null;
  handleSubmit: (article: Article) => unknown;
}) {
  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    const article = {
      title: data.get("title") as string,
      content: data.get("content") as string,
      tags: [] // TODO: handle tags
    };
    _handleSubmit(article);
  };

  return (
    <Form handleSubmit={handleSubmit}>
      <Form.Row>
        <Form.Label htmlFor="title" text="Title" required />
        <input
          type="text"
          id="title"
          name="title"
          maxLength={255}
          value={article?.title ?? ""}
          autofocus
          required
        />
      </Form.Row>
      <Form.Row fillHeight>
        <Form.Label htmlFor="content" text="Content" required />
        <textarea
          id="content"
          name="content"
          required
        >{article?.content}</textarea>
      </Form.Row>
      <Form.Row>
        <div><Button type="submit">Submit</Button></div>
      </Form.Row>
    </Form>
  ) as HTMLFormElement;
}
