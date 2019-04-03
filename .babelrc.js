var NODE_ENV = process.env.NODE_ENV;
var MODULES = process.env.MODULES;

var modules = MODULES === "false" || NODE_ENV === "test" ? "commonjs" : false;

var config = {
  presets: [
    [
      "env",
      {
        loose: true,
        modules: modules,
        forceAllTransforms: NODE_ENV === "production"
      }
    ],
    "stage-0",
    "react"
  ],
  plugins: []
};

if (NODE_ENV === "development") {
  config.plugins = config.plugins.concat([
    "transform-class-properties",
    [
      "react-transform",
      {
        transforms: [
          {
            transform: "react-transform-hmr",
            imports: ["react"],
            locals: ["module"]
          }
        ]
      }
    ],
    "add-react-displayname"
  ]);
}

if (NODE_ENV === "production") {
  config.plugins = config.plugins.concat(["transform-react-remove-prop-types"]);
}

module.exports = config;
