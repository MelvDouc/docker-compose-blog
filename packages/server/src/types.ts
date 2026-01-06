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
      readonly HONO_HOST: string;
      readonly JWT_KEY: string;
    }
  }
}