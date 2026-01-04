import { defineConfig } from "vite";
import { join } from "node:path";

const root = import.meta.dirname;

export default defineConfig({
  server: {
    host: true // allows HTTP requests to server
  },
  resolve: {
    alias: {
      "$client": join(root, "src")
    }
  },
  envDir: join(root, "config")
});