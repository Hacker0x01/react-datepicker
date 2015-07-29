// Karma configuration
// Generated on Tue Jul 28 2015 16:29:51 GMT+0200 (CEST)
var webpack = require( "webpack" );

module.exports = function( config ) {
  config.set( {
    frameworks: [ "mocha", "sinon", "chai" ],

    browsers: [ process.env.CONTINUOUS_INTEGRATION ? "Firefox" : "Chrome" ],

    singleRun: process.env.CONTINUOUS_INTEGRATION === "true",

    files: [
      "test/index.js"
    ],

    preprocessors: {
      "test/index.js": [ "webpack", "sourcemap" ]
    },

    reporters: [ "dots" ],

    webpack: {
      devtool: "inline-source-map",
      module: {
        loaders: [
          {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: "babel"
          }
        ]
      },
      plugins: [
        new webpack.DefinePlugin( {
          "process.env.NODE_ENV": JSON.stringify( "test" )
        } )
      ]
    },

    webpackServer: {
      noInfo: true
    }
  } );
};
