import type { PublicUser } from "@blog/common";
import { getLoggedUser } from "$client/utils/api.ts";
import { obs } from "reactfree-jsx";

const result = await getLoggedUser();
export const loggedUserObs = obs<PublicUser | null>(result[0]);

console.log(result);