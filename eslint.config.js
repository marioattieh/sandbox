import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { globalIgnores } from "eslint/config";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import checkFile from "eslint-plugin-check-file";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
    ],
    plugins: {
      "simple-import-sort": simpleImportSort,
      "unused-imports": unusedImports,
      "check-file": checkFile,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "no-console": "error",
      quotes: ["error", "single"],
      semi: ["error", "always"],
      "comma-dangle": [2, "always-multiline"],
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "unused-imports/no-unused-imports": "warn",
      "@typescript-eslint/no-invalid-void-type": "off",
      // Files: Only Kebab Case with the specified exceptions (.test,.spec,.config,.d)
      "check-file/filename-naming-convention": [
        "error",
        {
          "**/*.{js,ts,jsx,tsx}":
            "+([a-z])*([a-z0-9])*(-+([a-z0-9]))?(.(test|spec|config|d))?",
        },
      ],
      // Folders: Only Kebab Case
      "check-file/folder-naming-convention": [
        "error",
        { "src/**/*": "KEBAB_CASE" },
      ],
    },
  },
  prettierRecommended,
]);
