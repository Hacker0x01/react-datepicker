//@ts-check
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import filesize from "rollup-plugin-filesize";
import terser from "@rollup/plugin-terser";

const pkg = JSON.parse(
  fs
    .readFileSync(
      path.join(path.dirname(fileURLToPath(import.meta.url)), "package.json")
    )
    .toString()
);

// it's important to mark all subpackages of data-fns as externals
// see https://github.com/Hacker0x01/react-datepicker/issues/1606
// We're relying on date-fn's package.json `exports` field to
// determine the list of directories to include.
const dateFnsPackageJson = JSON.parse(
  fs
    .readFileSync(
      path.join(
        path.dirname(fileURLToPath(import.meta.url)),
        "node_modules/date-fns/package.json"
      )
    )
    .toString()
);
const dateFnsSubpackages = Object.keys(dateFnsPackageJson.exports)
  .map((key) => key.replace("./", ""))
  .filter((key) => key !== "." && key !== "package.json")
  .map((key) => `date-fns/${key}`);

const globals = {
  react: "React",
  "prop-types": "PropTypes",
  "react-onclickoutside": "onClickOutside",
  classnames: "classNames",
};

// NOTE:https://rollupjs.org/migration/#changed-defaults
const migrateRollup2to3OutputOptions = {
  interop: "compat",
};

const config = {
  input: "src/index.jsx",
  output: [
    {
      file: pkg.browser,
      format: "umd",
      name: "DatePicker",
      globals,
      ...migrateRollup2to3OutputOptions,
    },
    {
      file: "dist/react-datepicker.js",
      format: "umd",
      name: "DatePicker",
      globals,
      ...migrateRollup2to3OutputOptions,
    },
    {
      file: pkg.main,
      format: "cjs",
      name: "DatePicker",
      ...migrateRollup2to3OutputOptions,
    },
    {
      file: pkg.module,
      format: "es",
      ...migrateRollup2to3OutputOptions,
    },
  ],
  plugins: [
    resolve({
      mainFields: ["module"],
      extensions: [".js", ".jsx"],
    }),
    babel(),
    commonjs(),
    filesize(),
    terser(),
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
    ...dateFnsSubpackages,
  ],
};

export default config;
