export type {
  Result,
  AsyncResult
} from "$common/common-types.js";

export type WithId<T> = T & { id: number; };

export type Article = {
  title: string;
  content: string;
  tags: Tag[];
};

export type Tag = {
  name: string;
};