import { defineConfig } from "tsup";

export default defineConfig(({ watch }) => ({
  entry: ["src/index.ts", "src/core/data-source.ts"],
  outDir: "dist",
  platform: "node",
  target: "node18",
  format: "esm",
  minify: !watch,
  treeshake: true,
  noExternal: ["@blog/common"],
  onSuccess: watch ? "npm start" : void 0
}));