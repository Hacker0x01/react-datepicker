import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  { ignores: ["dist"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    settings: { react: { version: "18.3" } },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      "react/jsx-no-target-blank": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "react/no-unescaped-entities": "off",
      "react/prop-types": "off",
    },
  },
  {
    files: ["src/examples/**/*.{js,jsx}"],
    languageOptions: {
      globals: {
        useState: false,
        render: false,
        DatePicker: false,
        getHours: false,
        setHours: false,
        setSeconds: false,
        setMinutes: false,
        getDate: false,
        addDays: false,
        subDays: false,
        addMonths: false,
        fi: false,
        getDay: false,
        isValid: false,
        format: false,
        range: false,
        getYear: false,
        getMonth: false,
        CalendarContainer: false,
        subMonths: false,
        forwardRef: false,
      },
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
    },
  },
];
