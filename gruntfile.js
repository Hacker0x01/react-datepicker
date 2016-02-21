"use strict";

var _ = require("lodash");
var webpack = require("webpack");

var mergeWebpackConfig = function(config) {

  // Load webpackConfig only when using `grunt:webpack`
  // load of grunt tasks is faster
  var webpackConfig = require("./webpack.config");
  return _.merge({}, webpackConfig, config, function(a, b) {
    if (_.isArray(a)) {
      return a.concat(b);
    }
  });
};

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    sass: {
      min: {
        files: {
          "dist/react-datepicker.css": "src/stylesheets/datepicker.scss"
        },
        options: {
          sourcemap: "none",
          style: "expanded"
        }
      },
      unmin: {
        files: {
          "dist/react-datepicker.min.css": "src/stylesheets/datepicker.scss"
        },
        options: {
          sourcemap: "none",
          style: "compressed"
        }
      }
    },

    watch: {
      css: {
        files: "**/*.scss",
        tasks: ["sass"]
      },

      karma: {
        files: [
          "src/**/*.jsx",
          "src/**/*.js",
          "test/**/*.jsx",
          "test/**/*.js"
        ],
        tasks: ["karma"]
      },

      webpack: {
        files: ["src/**/*.js", "src/**/*.jsx"],
        tasks: ["webpack"]
      }
    },

    scsslint: {
      files: "src/stylesheets/*.scss",
      options: {
        config: ".scss-lint.yml",
        colorizeOutput: true
      }
    },

    karma: {
      unit: {
        configFile: "karma.conf.js",
        singleRun: true
      }
    },

    webpack: {
      unmin: mergeWebpackConfig({
        output: {
          filename: "react-datepicker.js"
        }
      }),
      min: mergeWebpackConfig({
        output: {
          filename: "react-datepicker.min.js"
        },
        plugins: [
          new webpack.optimize.UglifyJsPlugin({
            compressor: {
              warnings: false
            }
          })
        ]
      }),
      docs: require("./webpack.docs.config")
    }
  });

  grunt.loadNpmTasks("grunt-contrib-sass");
  grunt.loadNpmTasks("grunt-scss-lint");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-webpack");
  grunt.loadNpmTasks("grunt-karma");

  grunt.registerTask("default", ["watch", "scsslint"]);
  grunt.registerTask("travis", ["karma", "scsslint"]);
  grunt.registerTask("build", ["scsslint", "webpack", "sass"]);
};
