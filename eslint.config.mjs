import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

const config = [
  ...nextVitals,
  ...nextTypescript,
  {
    plugins: {
      prettier,
    },
    rules: {
      "prettier/prettier": "error",
      "no-unused-vars": "warn",
      "@typescript-eslint/no-unused-vars": ["warn"],
    },
  },
  prettierConfig,
];

export default config;
