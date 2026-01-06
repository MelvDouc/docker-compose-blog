import AppDataSource from "$server/core/data-source.js";
import User from "$server/entities/User.js";
import type { PublicUser, Result } from "@blog/common";
import bcrypt from "bcryptjs";
import type { Context, Next } from "hono";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import jwt from "jsonwebtoken";

const AUTH_COOKIE_NAME = "blog_auth";
let loggedUser: PublicUser | null = null;

const checkCredentials = async (username: string, plainPassword: string): Promise<PublicUser | null> => {
  const repo = AppDataSource.getRepository(User);
  const user = await repo.findOneBy({ username });

  if (!user || !(await bcrypt.compare(plainPassword, user.password)))
    return null;

  const { password, ...publicUser } = user;
  return publicUser;
};

const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(password, salt);
};

const getLoggedUser = (ctx: Context): Result<PublicUser, string> => {
  if (loggedUser)
    return [loggedUser, null];

  const authToken = getCookie(ctx, AUTH_COOKIE_NAME);

  if (!authToken)
    return [null, "User not logged in."];

  const user = decodeAuthToken(authToken);

  if (!user)
    return [null, "User not found."];

  loggedUser = user;
  return [loggedUser, null];
};

const createAuthToken = (user: PublicUser): string => {
  return jwt.sign(user, process.env.JWT_KEY);
};

const decodeAuthToken = (token: string): PublicUser | null => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    return isPublicUser(decoded) ? decoded : null;
  } catch {
    return null;
  }
};

const requireAuth = async (ctx: Context, next: Next) => {
  if (!getLoggedUser(ctx))
    return ctx.newResponse(null, 401);

  await next();
};

const logIn = (ctx: Context, publicUser: PublicUser): void => {
  const token = createAuthToken(publicUser);
  setCookie(ctx, AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "Lax",
    path: "/",
    maxAge: 365 * 24 * 60 * 60
  });
};

const logOut = (ctx: Context): void => {
  deleteCookie(ctx, AUTH_COOKIE_NAME);
  loggedUser = null;
};

const isPublicUser = (arg: unknown): arg is PublicUser => {
  return typeof arg === "object" && arg !== null
    && "email" in arg && typeof arg.email === "string";
};

export default {
  requireAuth,
  hashPassword,
  getLoggedUser,
  checkCredentials,
  logIn,
  logOut
};