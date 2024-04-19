const { NODE_ENV } = process.env;

const presets = [
  "@babel/preset-typescript",
  "@babel/preset-env",
  "@babel/preset-react",
];
const plugins = [
  "@babel/plugin-transform-react-jsx",
  "@babel/plugin-proposal-class-properties",
];

if (NODE_ENV === "production") {
  plugins.push("transform-react-remove-prop-types");
}

module.exports = { presets, plugins };
