import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"], // Apply rules to JS/JSX files
    languageOptions: {
      ecmaVersion: "latest", // Use the latest ECMAScript version
      sourceType: "module", // Enable ES modules (import/export)
      globals: { ...globals.browser }, // Ensure globals are properly spread
    },
    plugins: {
      react: pluginReact,
    },
    rules: {
      "no-unused-vars": "warn", // Warn on unused variables
      "no-console": "warn", // Warn on console.log
      "eqeqeq": "error", // Enforce strict equality (=== instead of ==)
    },
  },
  pluginJs.configs.recommended, // ESLint recommended JavaScript rules
  pluginReact.configs.flat.recommended, // React recommended rules
];
