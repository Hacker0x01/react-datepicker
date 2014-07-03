module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'src/stylesheets/style.min.css' : 'src/stylesheets/datepicker.scss'
        }
      }
    },

    watch: {
      css: {
        files: '**/*.scss',
        tasks: ['sass']
      },

      browserify: {
        files: ['src/**/*.jsx', 'src/**/*.js'],
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
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('default', ['watch']);
};
