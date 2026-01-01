export type Result<Data, Err> =
  | { success: true; value: Data; }
  | { success: false; value: Err; };

export type AsyncResult<Data, Err> = Promise<Result<Data, Err>>;

export type WithId<T> = T & { id: number; };

export type Article = {
  title: string;
  content: string;
  tags: Tag[];
};

export type Tag = {
  name: string;
};