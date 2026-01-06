import type {
  IArticle,
  ITag
} from "@blog/common";

export type WithId<T> = T & { id: number; };

export type Article = IArticle;
export type Tag = ITag;