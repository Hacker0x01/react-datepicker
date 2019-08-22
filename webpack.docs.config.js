const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  mode: "production",
  entry: ["./docs-site/src/boot"],
  output: {
    path: path.resolve("./docs-site/"),
    filename: "bundle.js",
    publicPath: "/"
  },
  resolve: {
    extensions: [".js", ".jsx"],

    // Needed to direct the docs to the local version of the datepicker, this is not needed for
    // normal setup.
    alias: {
      "react-datepicker/dist/react-datepicker.css": path.resolve(
        "./src/stylesheets/datepicker.scss"
      ),
      "react-datepicker": path.resolve("./src/index.jsx")
    }
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader"
          },
          "sass-loader"
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          "css-loader"
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css"
    })
  ],
  optimization: {
    minimizer: [new UglifyJsPlugin()]
  }
};
