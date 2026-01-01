import type { Result } from "$server/types.js";

export function createResult<Data, Err>(success: boolean, data: Data, err: Err): Result<Data, Err> {
  return success
    ? { success: true, value: data }
    : { success: false, value: err };
}