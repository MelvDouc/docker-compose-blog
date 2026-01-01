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
    }
  }
}

export type Result<Data, Err> =
  | { success: true; value: Data; }
  | { success: false; value: Err; };

export type AsyncResult<Data, Err> = Promise<Result<Data, Err>>;