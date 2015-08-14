var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    "./src/boot"
  ],
  output: {
    filename: "bundle.js",
    chunkFilename: "bundle.js"
  },
  resolve: {
    extensions: [ "", ".js", ".jsx" ]
  },
  module: {
    loaders: [
      { test: /\.js/, loaders: [ "babel?stage=0" ], exclude: /node_modules/ },
      { test: /\.scss/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader") },
      { test: /\.css/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") }
    ]
  },
  node: { Buffer: false },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new ExtractTextPlugin("style.css", { allChunks: true }),
    new webpack.DefinePlugin( {
      "process.env.NODE_ENV": JSON.stringify( process.env.NODE_ENV )
    } )
  ]
};
