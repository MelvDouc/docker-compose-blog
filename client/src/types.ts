import type { IArticle, ITag } from "$common/common-types.ts";

export type WithId<T> = T & { id: number; };

export type Article = IArticle;
export type Tag = ITag;