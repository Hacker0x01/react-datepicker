module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        files: {
          'react-datepicker.css' : 'src/stylesheets/datepicker.scss'
        }
      },
      options: {
        sourcemap: 'none',
        style: 'expanded'
      }
    },

    watch: {
      jshint: {
        files: 'src/**/*.js',
        tasks: ['jshint']
      },

      jest: {
        files: ['src/**/*.js', 'test/**/*.js'],
        tasks: ['jest']
      },

      css: {
        files: '**/*.scss',
        tasks: ['sass']
      },

      browserify: {
        files: ['src/**/*.js'],
        tasks: ['browserify']
      }
    },

    scsslint: {
      files: 'src/stylesheets/*.scss',
      options: {
        config: '.scss-lint.yml',
        colorizeOutput: true
      },
    },

    browserify: {
      all: {
        dest: 'react-datepicker.js',
        transform: [
          'reactify',
          'browserify-shim'
        ],
        browserifyOptions: {
          entries: './src/datepicker.js',
          standalone: 'DatePicker',
          bundleExternal: false
        }
      },

      example : {
        dest: 'example/bundle.js',
        browserifyOptions: {
          entries: './example/boot.jsx'
        }
      }
    },

    jshint: {
      all: ['src/**/*.js'],
      options: {
        eqnull: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-scss-lint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jsxhint');

  grunt.registerTask('default', ['watch', 'scsslint']);
  grunt.registerTask('travis', ['jshint', 'jest', 'scsslint']);

  grunt.registerMultiTask('browserify', require('./grunt/tasks/browserify'));
  grunt.registerTask('jest', require('./grunt/tasks/jest'));
};
