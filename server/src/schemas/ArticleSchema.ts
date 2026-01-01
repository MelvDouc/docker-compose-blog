import { z } from "zod";

const ArticleSchema = z.object({
  title: z.string({}).min(1).max(255),
  content: z.string().min(1),
  // TODO: tags
});

export function validateArticle(input: unknown): string[] | null {
  const parsed = ArticleSchema.safeParse(input);

  return parsed.success
    ? null
    : z.treeifyError(parsed.error).errors;
}