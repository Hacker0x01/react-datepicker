const { NODE_ENV, MODULES } = process.env;

const modules = MODULES === "false" || NODE_ENV === "test" ? "commonjs" : false;

const presets = [
  "@babel/preset-env",
  "@babel/preset-react",
  "@babel/preset-flow"
];
const plugins = [
  "@babel/plugin-transform-react-jsx",
  "@babel/plugin-proposal-class-properties"
];

if (NODE_ENV === "production") {
  plugins.push("transform-react-remove-prop-types");
}

module.exports = { presets, plugins };
