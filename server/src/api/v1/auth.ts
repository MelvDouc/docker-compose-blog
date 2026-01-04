import AppDataSource from "$server/core/data-source.js";
import User from "$server/entities/User.js";
import { validateLogin, validateSignup } from "$server/schemas/user.schema.js";
import authService from "$server/services/auth.service.js";
import { Hono as Router } from "hono";

export const authRouter = new Router();

authRouter.post("/sign-up", async (ctx) => {
  const body: unknown = await ctx.req.json();
  const [data, formErrors] = await validateSignup(body);
  console.log({ data, formErrors });

  if (formErrors)
    return ctx.json([null, formErrors]);

  const user = new User();
  user.email = data.email;
  user.username = data.username;
  user.password = await authService.hashPassword(data.password1);
  user.role = "user";
  user.verified = false;

  const repo = AppDataSource.getRepository(User);
  await repo.save(user);

  // TODO: email verification
  return ctx.json([true, null]);
});

authRouter.post("/log-in", async (ctx) => {
  const body: unknown = await ctx.req.json();
  const [data, formErrors] = validateLogin(body);

  if (formErrors)
    return ctx.json([null, formErrors]);

  const publicUser = await authService.checkCredentials(data.username, data.password);

  if (!publicUser)
    return ctx.json([null, { credentials: "Invalid credentials." }]);

  authService.logIn(ctx, publicUser);
  return ctx.json([publicUser, null]);
});

authRouter.post("/log-out", (ctx) => {
  authService.logOut(ctx);
  return ctx.json([true, null]);
});

authRouter.get("/logged-user", (ctx) => {
  const result = authService.getLoggedUser(ctx);
  return ctx.json(result);
});
