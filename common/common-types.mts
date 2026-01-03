import type { UserRole } from "./user-roles.mjs";

export type Result<Data, Err> = [data: Data, err: null] | [data: null, err: Err];
export type AsyncResult<Data, Err> = Promise<Result<Data, Err>>;

export type FormErrorRecord<T> = {
  [K in keyof T]?: string[];
};

export interface IUser {
  email: string;
  username: string;
  password: string;
  role: UserRole;
  verified: boolean;
}

export type PublicUser = Omit<IUser, "password">;
export type SignupData = Pick<IUser, "email" | "username"> & {
  password1: string;
  password2: string;
};
export type LoginData = Pick<IUser, "username" | "password">;

export interface IArticle {
  title: string;
  content: string;
  tags: ITag[];
}

export interface ITag {
  name: string;
}