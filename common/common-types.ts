export type Result<Data, Err> = [data: Data, err: null] | [data: null, err: Err];
export type AsyncResult<Data, Err> = Promise<Result<Data, Err>>;