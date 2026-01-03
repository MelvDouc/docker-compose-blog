import type {
  AsyncResult,
  Result,
  FormErrorRecord,
  LoginData,
  SignupData
} from "$server/types.js";
import AppDataSource from "$server/core/data-source.js";
import User from "$server/entities/User.js";
import { z } from "zod";

const Errors = {
  EmailInvalid: "Invalid email address.",
  EmailUnavailable: "This email address cannot be used.",
  UsernameMissing: "Username required.",
  UsernameTooLong: "Your username shouldn't exceed 20 characters.",
  UsernameInvalidChars: "Your username should only contain letters, numbers, dashes and/or underscores.",
  UsernameUnavailable: "This username is already taken.",
  PasswordMissing: "Password required.",
  PasswordTooShort: "Your password should be at least 8 characters long.",
  PasswordTooLong: "Your password shouldn't exceed 50 characters.",
  PasswordMismatch: "Passwords don't match."
} as const;

const EmailSchema = z.email({ error: Errors.EmailInvalid, abort: true });
const UsernameSchema = z.string().min(1, { error: Errors.UsernameMissing, abort: true });

const SignupSchema = z
  .object({
    email: EmailSchema.refine(isUniqueEmail, { error: Errors.EmailUnavailable }),
    username: UsernameSchema
      .max(20, { error: Errors.UsernameTooLong, abort: true })
      .regex(/^[-\w]+$/, { error: Errors.UsernameInvalidChars, abort: true })
      .refine(isUniqueUsername, { error: Errors.UsernameUnavailable }),
    password1: z
      .string()
      .min(8, { error: Errors.PasswordTooShort, abort: true })
      .max(50, { error: Errors.PasswordTooLong }),
    password2: z.string()
  })
  .refine(
    ({ password1, password2 }) => password1 === password2,
    { error: Errors.PasswordMismatch }
  );

const LoginSchema = z.object({
  username: UsernameSchema,
  password: z.string().min(1, { error: Errors.PasswordMissing })
});

async function isUniqueEmail(email: string): Promise<boolean> {
  const user = await AppDataSource.getRepository(User).findOneBy({ email });
  return !user;
}

async function isUniqueUsername(username: string): Promise<boolean> {
  const user = await AppDataSource.getRepository(User).findOneBy({ username });
  return !user;
}

export async function validateSignup(data: unknown): AsyncResult<SignupData, FormErrorRecord<SignupData>> {
  const parsed = await SignupSchema.safeParseAsync(data);

  if (!parsed.success)
    return [null, z.flattenError(parsed.error).fieldErrors];

  return [parsed.data, null];
}

export function validateLogin(data: unknown): Result<LoginData, FormErrorRecord<LoginData>> {
  const parsed = LoginSchema.safeParse(data);

  if (!parsed.success)
    return [null, z.flattenError(parsed.error).fieldErrors];

  return [parsed.data, null];
}