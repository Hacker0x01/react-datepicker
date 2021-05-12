const path = require("path");
const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");

module.exports = function override(config, env) {
  config.resolve.alias["react-datepicker"] = path.resolve(__dirname, "..");
  config.resolve.alias["react"] = path.resolve(__dirname, "node_modules/react");
  //do stuff with the webpack config...
  config.module.rules.push({
    test: /\.js/,
    include: path.resolve(__dirname, "src/examples"),
    use: "raw-loader",
  });
  config.resolve.plugins = config.resolve.plugins.filter(
    (plugin) => !(plugin instanceof ModuleScopePlugin)
  );
  // Enable it, so that our custom .eslintrc for the examples will work
  for (let i = 0; i < config.module.rules.length; i++) {
    if (Array.isArray(config.module.rules[i].use)) {
      for (let j = 0; j < config.module.rules[i].use.length; j++) {
        if (config.module.rules[i].use[j].loader.includes("eslint-loader")) {
          config.module.rules[i].use[j].options.useEslintrc = true;
          break;
        }
      }
    }
  }
  return config;
};
