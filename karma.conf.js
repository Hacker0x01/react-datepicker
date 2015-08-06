// Karma configuration
// Generated on Tue Jul 28 2015 16:29:51 GMT+0200 (CEST)
var webpack = require( "webpack" );

var CONTINUOUS_INTEGRATION = process.env.CONTINUOUS_INTEGRATION === "true";
var SAUCE_LABS_BROWSERS = {
  sl_chrome: {
    base: "SauceLabs",
    browserName: "chrome"
  },
  sl_firefox: {
    base: "SauceLabs",
    browserName: "firefox"
  },
  sl_ie_11: {
    base: "SauceLabs",
    browserName: "internet explorer",
    platform: "Windows 8.1",
    version: "11"
  },
  sl_ie_10: {
    base: "SauceLabs",
    browserName: "internet explorer",
    platform: "Windows 7",
    version: "10"
  }
};

module.exports = function( config ) {
  config.set( {
    frameworks: [ "mocha", "sinon", "chai" ],

    customLaunchers: CONTINUOUS_INTEGRATION ? SAUCE_LABS_BROWSERS : null,

    browsers: CONTINUOUS_INTEGRATION ? Object.keys( SAUCE_LABS_BROWSERS ) : [ "Chrome" ],

    singleRun: CONTINUOUS_INTEGRATION,

    files: [
      "test/index.js"
    ],

    preprocessors: {
      "test/index.js": [ "webpack", "sourcemap" ]
    },

    reporters: CONTINUOUS_INTEGRATION ? [ "dots", "saucelabs" ] : [ "dots" ],

    sauceLabs: {
      testName: "React Date Picker JavaScript tests"
    },

    captureTimeout: 120000,

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
