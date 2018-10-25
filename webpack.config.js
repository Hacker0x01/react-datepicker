var webpack = require("webpack");

module.exports = {
  entry: "./src/index",
  output: {
    libraryTarget: "umd",
    library: "DatePicker",
    path: "./dist/"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: "babel",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ["", ".js", ".jsx"]
  },
  externals: [
    {
      "react-dom": {
        root: "ReactDOM",
        commonjs2: "react-dom",
        commonjs: "react-dom",
        amd: "react-dom"
      }
    },
    {
      react: {
        root: "React",
        commonjs2: "react",
        commonjs: "react",
        amd: "react"
      }
    },
    {
      "react-onclickoutside": {
        root: "onClickOutside",
        commonjs2: "react-onclickoutside",
        commonjs: "react-onclickoutside",
        amd: "react-onclickoutside"
      }
    }
  ],
  node: { Buffer: false },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    })
  ]
};
