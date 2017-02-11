var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var sassLoaders = [
  {
    loader: 'css-loader'
  },
  {
    loader: 'sass-loader'
  }
]

module.exports = {
  entry: [
    './docs-site/src/boot'
  ],
  output: {
    path: path.resolve('./docs-site/'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],

    // Needed to direct the docs to the local version of the datepicker, this is not needed for
    // normal setup.
    alias: {
      'react-datepicker/dist/react-datepicker.css': path.resolve('./src/stylesheets/datepicker.scss'),
      'react-datepicker': path.resolve('./src/datepicker.jsx')
    }
  },

  module: {
    rules: [
      { test: /\.js/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.scss/, loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: sassLoaders }) },
      { test: /\.css/, loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }) }
    ]
  },
  node: { Buffer: false },
  plugins: [
    new ExtractTextPlugin({ filename: 'style.css', disable: false, allChunks: true }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
}
