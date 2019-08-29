import babel from "rollup-plugin-babel";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import filesize from "rollup-plugin-filesize";
import localResolve from "rollup-plugin-local-resolve";
import { terser } from "rollup-plugin-terser";
import visualizer from "rollup-plugin-visualizer";

import replace from "rollup-plugin-replace";
import pkg from "./package.json";

const globals = {
  react: "React",
  "prop-types": "PropTypes",
  "react-onclickoutside": "onClickOutside",
  "react-popper": "ReactPopper",
  classnames: "classNames"
};

const config = {
  input: "src/index.jsx",
  output: [
    {
      file: pkg.browser,
      format: "umd",
      name: "DatePicker",
      globals
    },
    {
      file: "dist/react-datepicker.js",
      format: "umd",
      name: "DatePicker",
      globals
    },
    {
      file: pkg.main,
      format: "cjs",
      name: "DatePicker"
    },
    {
      file: pkg.module,
      format: "es"
    }
  ],
  plugins: [
    resolve({
      mainFields: ["module"],
      extensions: [".js", ".jsx"]
    }),
    peerDepsExternal(),
    babel(),
    localResolve(),
    commonjs(),
    filesize(),
    terser(),
    replace({
      "process.env.NODE_ENV": JSON.stringify("production")
    })
  ]
};

export default config;
