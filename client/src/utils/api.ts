import type { Article, WithId } from "$client/types.ts";
import type { FormErrorRecord, Result, SignupData } from "$common/common-types.mts";

const API_URL = import.meta.env.VITE_API_URL;

async function api<T>(params: ApiParams<T>) {
  try {
    const requestInit = createRequestInit(params.method, "body" in params ? params.body : null);
    const response = await fetch(API_URL + params.path, requestInit);
    const result = await response.json();
    return result as T;
  } catch (error) {
    return params.fallback(error);
  }
}

function createRequestInit(method: HttpVerb, body: unknown): RequestInit {
  const requestInit: RequestInit = {
    method,
    credentials: "include"
  };

  if (method === "POST" || method === "PUT" || method === "PATCH")
    requestInit.headers = { "Content-Type": "application/json" };

  if (body)
    requestInit.body = JSON.stringify(body);

  return requestInit;
}

export const getArticle = (id: number) => {
  return api<Result<WithId<Article>, string>>({
    path: `/articles/@/${id}`,
    method: "GET",
    fallback: (error) => [null, String(error)]
  });
};

export const getLastArticle = () => {
  return api<Result<WithId<Article>, string>>({
    path: "/articles/last",
    method: "GET",
    fallback: (error) => [null, String(error)]
  });
};

export const addArticle = (data: Article) => {
  return api<Result<WithId<Article>, string[]>>({
    path: "/articles",
    method: "POST",
    body: data,
    fallback: () => [null, ["Error adding article."]]
  });
};

export const signUp = (data: SignupData) => {
  return api<Result<true, FormErrorRecord<SignupData> & { $all?: string; }>>({
    path: "/auth/sign-up",
    method: "POST",
    body: data,
    fallback: () => [null, { $all: "" }]
  });
};

// ===== ===== ===== ===== =====
// TYPES
// ===== ===== ===== ===== =====

type Path = `/${string}`;
type HttpVerb = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type BodilessApiParams<T> = {
  method: "GET" | "DELETE";
  path: Path;
  fallback: (error: unknown) => T;
};

type WithBodyApiParams<T> = {
  method: "POST" | "PUT" | "PATCH";
  path: Path;
  fallback: (error: unknown) => T;
  body: unknown;
};

type ApiParams<T> = BodilessApiParams<T> | WithBodyApiParams<T>;