//@ts-check
/**
 * ESlint Configuration
 * @type {import('eslint').Linter.Config}
 */
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const react = require("eslint-plugin-react");
const reactHooks = require("eslint-plugin-react-hooks");
const jestPlugin = require("eslint-plugin-jest");

module.exports = [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["src/**/*.{js,jsx,ts,tsx}"],
    ignores: ["src/examples/**"],
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      react,
      "react-hooks": reactHooks,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: ["./tsconfig.json"],
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  {
    files: ["src/examples/**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react,
    },
    rules: {
      "no-unused-expressions": "off",
      "react/react-in-jsx-scope": "off",
      "react/jsx-no-undef": [
        "error",
        {
          allowGlobals: true,
        },
      ],
      "@typescript-eslint/no-empty-object-type": "off",
    },
    languageOptions: {
      globals: {
        useState: "readonly",
        render: "readonly",
        DatePicker: "readonly",
        getHours: "readonly",
        setHours: "readonly",
        setSeconds: "readonly",
        setMinutes: "readonly",
        getDate: "readonly",
        addDays: "readonly",
        subDays: "readonly",
        addMonths: "readonly",
        fi: "readonly",
        getDay: "readonly",
        isValid: "readonly",
        format: "readonly",
        range: "readonly",
        getYear: "readonly",
        getMonth: "readonly",
        PropTypes: "readonly",
        CalendarContainer: "readonly",
        subMonths: "readonly",
        forwardRef: "readonly",
      },
    },
  },
  // New configuration for test files
  {
    files: ["src/**/*.test.{js,jsx,ts,tsx}", "src/**/*.spec.{js,jsx,ts,tsx}"],
    plugins: {
      jest: jestPlugin,
    },
    rules: {
      ...jestPlugin.configs.recommended.rules,
      "jest/expect-expect": "off",
    },
  },
];
