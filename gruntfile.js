module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        files: {
          'react-datepicker.css' : 'src/stylesheets/datepicker.scss'
        }
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

    browserify: {
      all: {
        src: ['src/datepicker.js'],
        dest: 'react-datepicker.js',
        options: {
          transform: ['reactify'],
          bundleOptions: {
            standalone: 'DatePicker',
          }
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
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-jsxhint');
  grunt.loadNpmTasks('grunt-jest');

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('travis', ['jshint', 'jest']);
};
