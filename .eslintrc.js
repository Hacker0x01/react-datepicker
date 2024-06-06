//@ts-check
/**
 * ESlint Configuration
 * @type {import('eslint').ESLint.ConfigData}
 */
const config = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "import", "unused-imports"],
  parserOptions: {
    project: ["./tsconfig.json"],
  },
  rules: {
    "no-unused-vars": "off", // Duplicate with unused-import/no-unused-vars
    "no-param-reassign": "warn",

    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-misused-promises": [
      "error",
      { checksVoidReturn: false },
    ],
    "@typescript-eslint/no-floating-promises": [
      "warn",
      {
        ignoreIIFE: true,
      },
    ],

    // Import Rules
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "error",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
          "type",
        ],
        "newlines-between": "always",
        pathGroups: [
          {
            pattern: "~/**",
            group: "parent",
            position: "before",
          },
        ],
        alphabetize: { order: "asc", caseInsensitive: true },
      },
    ],
    "@typescript-eslint/consistent-type-imports": [
      "error",
      { prefer: "type-imports" },
    ],
    "import/no-duplicates": ["error", { considerQueryString: true }],

    // React
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  overrides: [
    {
      files: ["**/*.test.tsx", "**/*.test.ts"],
      plugins: ["jest"],
      env: {
        "jest/globals": true,
      },
      extends: ["plugin:jest/recommended"],
    },
  ],
  ignorePatterns: ["*.js", "*.jsx"],
};

module.exports = config;
