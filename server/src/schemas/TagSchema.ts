import AppDataSource from "$server/core/data-source.js";
import Tag from "$server/entities/Tag.js";
import { z } from "zod";

const TagSchema = z.object({
  name: z.string()
    .min(1, { error: "Tag name cannot be empty." })
    .max(50, { error: "Tag name max length: 50 characters." })
    .refine(async (name) => {
      const repo = AppDataSource.getRepository(Tag);
      const tags = await repo.find({ where: { name } });
      return tags.length === 0;
    }, { error: "A tag with this name already exists." })
});

export async function validateTag(input: unknown): Promise<string[] | null> {
  const parsed = await TagSchema.safeParseAsync(input);

  return parsed.success
    ? null
    : z.treeifyError(parsed.error).errors;
}