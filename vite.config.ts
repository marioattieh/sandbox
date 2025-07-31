import react from "@vitejs/plugin-react-swc";
import path from "path";
import { configDefaults, defineConfig } from "vitest/config";

import { compilerOptions } from "./tsconfig.app.json";

const getAlias = () =>
  Object.entries(compilerOptions.paths).reduce(
    (acc: Record<string, string>, [key, value]) => {
      const newKey = key.replace("/*", "");
      const newValue = `./${value[0].replace("/*", "")}`;

      acc[newKey] = path.resolve(__dirname, newValue);

      return acc;
    },
    {},
  );

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: { alias: getAlias() },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setup-tests.ts",
    include: ["**/*.test.tsx"],
    coverage: {
      reporter: ["text", "lcov"],
      exclude: [...(configDefaults.coverage.exclude ?? []), "**/main.tsx"],
    },
  },
});
