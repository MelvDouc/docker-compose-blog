declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly POSTGRES_HOST: string;
      readonly POSTGRES_DB: string;
      readonly POSTGRES_PASSWORD: string;
      readonly POSTGRES_PORT: string;
      readonly POSTGRES_USER: string;
      readonly NODE_ENV: "development" | "production";
      readonly HONO_PORT: string;
      readonly JWT_KEY: string;
    }
  }
}

export type {
  AsyncResult,
  Result,
  FormErrorRecord,
  IArticle,
  ITag,
  IUser,
  PublicUser,
  LoginData,
  SignupData
} from "$common/common-types.mts";