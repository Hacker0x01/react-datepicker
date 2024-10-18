const path = require("path");
const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");

module.exports = function override(config, env) {
  config.resolve.alias["react-datepicker"] = path.resolve(__dirname, "..");
  config.resolve.alias["react"] = path.resolve(__dirname, "node_modules/react");

  // Add raw-loader for specific example files
  config.module.rules.push({
    test: /\.js/,
    include: path.resolve(__dirname, "src/examples"),
    use: "raw-loader",
  });

  // Remove ModuleScopePlugin to allow imports outside of 'src'
  config.resolve.plugins = config.resolve.plugins.filter(
    (plugin) => !(plugin instanceof ModuleScopePlugin),
  );

  // Remove ESLint plugin if it exists
  config.plugins = config.plugins.filter(
    (plugin) => plugin.constructor.name !== "ESLintWebpackPlugin",
  );

  // Skip ESLint loader by removing the eslint-loader rules
  config.module.rules = config.module.rules.filter((rule) => {
    if (rule.use) {
      if (Array.isArray(rule.use)) {
        return !rule.use.some(
          ({ loader }) => loader && loader.includes("eslint-loader"),
        );
      }
    }
    return true;
  });

  return config;
};
