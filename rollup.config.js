import fs from "fs";
import path from "path";

import babel from "rollup-plugin-babel";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import filesize from "rollup-plugin-filesize";
import localResolve from "rollup-plugin-local-resolve";
import { terser } from "rollup-plugin-terser";

import replace from "rollup-plugin-replace";
import pkg from "./package.json";

// it's important to mark all subpackages of data-fns as externals
// see https://github.com/Hacker0x01/react-datepicker/issues/1606
// We're relying on date-fn's package.json `exports` field to
// determine the list of directories to include.
const dateFnsPackageJson = JSON.parse(
  fs.readFileSync(path.join(__dirname, "node_modules/date-fns/package.json")),
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

const config = {
  input: "src/index.jsx",
  output: [
    {
      file: pkg.browser,
      format: "umd",
      name: "DatePicker",
      globals,
    },
    {
      file: "dist/react-datepicker.js",
      format: "umd",
      name: "DatePicker",
      globals,
    },
    {
      file: pkg.main,
      format: "cjs",
      name: "DatePicker",
    },
    {
      file: pkg.module,
      format: "es",
    },
  ],
  plugins: [
    resolve({
      mainFields: ["module"],
      extensions: [".js", ".jsx"],
    }),
    peerDepsExternal(),
    babel(),
    localResolve(),
    commonjs(),
    filesize(),
    terser(),
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
  ],
  external: Object.keys(pkg.dependencies)
    .concat(Object.keys(pkg.peerDependencies))
    .concat(dateFnsSubpackages),
};

export default config;
