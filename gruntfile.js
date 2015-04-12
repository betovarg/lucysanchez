module.exports = function (grunt) {
  'use strict';

  //load all the plugins in package.json
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
  // load assemble
  grunt.loadNpmTasks('assemble');

  grunt.initConfig({
    pkg: grunt.file.readJSON('./package.json'),

    connect: {
      server: {
        options: {
          livereload: true,
          port: 4000,
          hostname: '*',
          // hostname: 'localhost',
          base: './dist/',
          // keepalive: true
        }
      }
    },

    /* assemble templating */
    assemble: {
      options: {
        collections: [{
          name: 'product',
          sortby: 'weight',
          sortorder: 'ascending'
        }],
        assets: './dist/images',
        // helpers: './src/assemble_templates/helpers/**/*.js',
        layout: 'page.hbs',
        layoutdir: './src/assemble_templates/layouts/',
        partials: './src/assemble_templates/partials/**/*'
      },
      pages: {
        // this array looks for content not in pages folder
        files: [{
          cwd: './src/assemble_content/',
          dest: './dist/',
          expand: true,
          src: ['**/*.hbs', '!_pages/**/*.hbs']
        }, {
          // this array looks for content in pages
          cwd: './src/assemble_content/_pages/',
          dest: './dist/',
          expand: true,
          src: '**/*.hbs'
        }]
      }
    },

    // Uglify
    uglify: {
      js: {
        files: {
          'dist/js/app.js': [
            'src/js/jquery.flexslider-min.js', 
            'src/js/jquery.resizeimagetoparent.min.js', 
            'src/js/lightbox.min.js', 
            'src/js/picturefill.min.js', 
            'src/js/scripts.js',
            'src/js/waypoints.min.js'
            ]
        }
      }
    },

    // htmlmin
    htmlmin: {                                     // Task
      dist: {                                      // Target
        options: {                                 // Target options
          removeComments: false,
          collapseWhitespace: true
        },
        files: {                                   // Dictionary of files
          'dist/index.html': 'src/index.html',     // 'destination': 'source'
        }
      }
    },

    // watch task
    watch: {
      // index: {
      //   files: 'src/index.html',
      //   tasks: ['htmlmin'],
      //   options: {
      //     livereload: true,
      //   },
      // },
      html: {
        files: '**/*.hbs',
        tasks: ['assemble'],
        options: {
          livereload: true,
        },
      },
      js: {
        files: 'src/js/*',
        tasks: ['uglify'],
        options: {
          livereload: true,
        },
      },
      css: {
        files: './dist/css/*',
        tasks: ['assemble'],
        options: {
          livereload: true,
        },
      },
    }

  });

  /* grunt tasks */
  grunt.registerTask('serve', [
    'assemble',
    'htmlmin',
    'uglify',
    'connect:server',
    'watch'
    ]);

};