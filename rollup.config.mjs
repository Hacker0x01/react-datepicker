//@ts-check
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import filesize from "rollup-plugin-filesize";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";

const pkg = JSON.parse(
  fs
    .readFileSync(
      path.join(path.dirname(fileURLToPath(import.meta.url)), "package.json"),
    )
    .toString(),
);

const banner = `/*!
  ${pkg.name} v${pkg.version}
  ${pkg.homepage}
  Released under the ${pkg.license} License.
*/`;

const globals = {
  react: "React",
  "react-dom": "ReactDOM",
  clsx: "clsx",
  "date-fns": "dateFns",
  "@floating-ui/react": "FloatingUIReact",
};

// NOTE:https://rollupjs.org/migration/#changed-defaults
/** @type {import('rollup').OutputOptions} */
const migrateRollup2to3OutputOptions = {
  interop: "compat",
};

// Common sourcemap options to embed source content directly in the map
// This prevents Webpack source-map-loader warnings about missing source files
// See: https://github.com/Hacker0x01/react-datepicker/issues/5549
/** @type {Partial<import('rollup').OutputOptions>} */
const sourcemapOptions = {
  sourcemap: true,
  sourcemapExcludeSources: false,
};

/** @type {import('rollup').RollupOptions} */
const config = {
  input: "src/index.tsx",
  output: [
    {
      file: pkg.unpkg,
      format: "umd",
      name: "DatePicker",
      globals,
      banner,
      ...migrateRollup2to3OutputOptions,
      ...sourcemapOptions,
      plugins: [terser()],
    },
    {
      file: pkg.unpkg.replace(".min.js", ".js"),
      format: "umd",
      name: "DatePicker",
      globals,
      banner,
      ...migrateRollup2to3OutputOptions,
      ...sourcemapOptions,
    },
    {
      file: pkg.main,
      format: "cjs",
      name: "DatePicker",
      banner,
      ...migrateRollup2to3OutputOptions,
      ...sourcemapOptions,
    },
    {
      file: pkg.module,
      format: "es",
      banner,
      ...migrateRollup2to3OutputOptions,
      ...sourcemapOptions,
    },
  ],
  plugins: [
    resolve({
      mainFields: ["module"],
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    }),
    babel(),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.build.json",
      declaration: true,
      declarationDir: "dist",
      sourceMap: true,
      inlineSources: true,
    }),
    filesize(),
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
};

export default config;
