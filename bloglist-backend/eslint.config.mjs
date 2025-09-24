import globals from "globals"
import { defineConfig } from "eslint/config"

export default defineConfig([
  {
    files: ["**/*.js", "**/*.cjs"],
    languageOptions: {
      sourceType: "commonjs",
      globals: globals.node,
    },
    rules: {
      "no-unused-vars": ["warn"],
      "no-console": "off",
      "no-undef": "error",
    },
    ignores: ["tests/"],
  },
])
