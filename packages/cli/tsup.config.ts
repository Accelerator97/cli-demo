import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["lib/index.ts"],
  outDir: "dist",
  format: ["cjs"],
  clean: true,
  dts: true,
  outExtension() {
    return {
      js: `.js`,
    };
  },
});
