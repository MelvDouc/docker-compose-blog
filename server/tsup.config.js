import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/core/data-source.ts"],
  outDir: "dist",
  platform: "node",
  target: "node18",
  format: "esm",
  minify: true,
  treeshake: true
});