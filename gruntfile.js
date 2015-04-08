'use strict';

var _ = require('lodash');
var webpack = require('webpack');

var mergeWebpackConfig = function (config) {
  // Load webpackConfig only when using `grunt:webpack`
  // load of grunt tasks is faster
  var webpackConfig = require('./webpack.config');
  return _.merge({}, webpackConfig, config, function (a, b) {
    if (_.isArray(a)) {
      return a.concat(b);
    }
  });
};

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      min: {
        files: {
          'dist/react-datepicker.css': 'src/stylesheets/datepicker.scss'
        },
        options: {
          sourcemap: 'none',
          style: 'expanded'
        }
      },
      unmin: {
        files: {
          'dist/react-datepicker.min.css': 'src/stylesheets/datepicker.scss'
        },
        options: {
          sourcemap: 'none',
          style: 'compressed'
        }
      }
    },

    watch: {
      jshint: {
        files: ['src/**/*.js', 'src/**/*.jsx'],
        tasks: ['jshint']
      },

      jest: {
        files: ['src/**/*.jsx', 'src/**/*.js', 'test/**/*.js'],
        tasks: ['jest']
      },

      css: {
        files: '**/*.scss',
        tasks: ['sass']
      },

      webpack: {
        files: ['src/**/*.js', 'src/**/*.jsx'],
        tasks: ['webpack']
      }
    },

    scsslint: {
      files: 'src/stylesheets/*.scss',
      options: {
        config: '.scss-lint.yml',
        colorizeOutput: true
      }
    },

    jshint: {
      all: ['src/**/*.jsx', 'src/**/*.js'],
      options: {
        eqnull: true
      }
    },

    webpack: {
      example: {
        entry: './example/boot',
        output: {
          filename: 'example.js',
          library: 'ExampleApp',
          path: './example/'
        },
        resolve: {
          extensions: ['', '.js', '.jsx']
        },
        module: {
          loaders: [
            {test: /\.js/, loaders: ['babel-loader'], exclude: /node_modules/}
          ]
        },
        node: {Buffer: false},
        plugins: [
          new webpack.optimize.DedupePlugin(),
          new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
          })
        ]
      },
      unmin: mergeWebpackConfig({
        output: {
          filename: 'react-datepicker.js'
        }
      }),
      min: mergeWebpackConfig({
        output: {
          filename: 'react-datepicker.min.js'
        },
        plugins: [
          new webpack.optimize.UglifyJsPlugin({
            compressor: {
              warnings: false
            }
          })
        ]
      })
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-scss-lint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jsxhint');
  grunt.loadNpmTasks('grunt-webpack');

  grunt.registerTask('default', ['watch', 'scsslint']);
  grunt.registerTask('travis', ['jshint', 'jest', 'scsslint']);
  grunt.registerTask('build', ['jshint', 'scsslint', 'webpack', 'sass']);

  grunt.registerTask('jest', require('./grunt/tasks/jest'));
};
