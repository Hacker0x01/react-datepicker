var express = require("express");
var webpack = require("webpack");
var merge = require("lodash/merge");
var config = merge({}, require("./webpack.docs.config"));

config.devtool = "cheap-module-eval-source-map";
config.entry.unshift("webpack-hot-middleware/client");
config.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
);

var app = express();
var compiler = webpack(config);

app.use(
  require("webpack-dev-middleware")(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  })
);

app.use(require("webpack-hot-middleware")(compiler));

app.use(express.static("docs-site"));

app.listen(8080, "localhost", function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log("Listening at http://localhost:8080");
});
