var NODE_ENV = process.env.NODE_ENV;
var MODULES = process.env.MODULES;

var modules = MODULES === "false" || NODE_ENV === "test" ? "commonjs" : false;

const presets = [
  "airbnb",
  // ["@babel/preset-env", {
  //   loose: true,
  //   modules,
  //   forceAllTransforms: NODE_ENV === "production"
  // }],
  "@babel/preset-react",
  "@babel/preset-flow"
];
const plugins = [
  "@babel/plugin-transform-react-jsx",
  "@babel/plugin-proposal-class-properties"
];

if (NODE_ENV === "development") {
  plugins.push("@babel/plugin-proposal-class-properties");
  plugins.push("@babel/plugin-transform-react-display-name");
}

if (NODE_ENV === "production") {
  plugins.push("transform-react-remove-prop-types");
}

module.exports = { presets, plugins };
