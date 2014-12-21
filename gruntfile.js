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
          name: 'post',
          sortby: 'posted',
          sortorder: 'descending'
        }],
        assets: './dist/images',
        helpers: './src/templates/helpers/**/*.js',
        layout: 'page.hbs',
        layoutdir: './src/templates/layouts/',
        partials: './src/templates/partials/**/*'
      },
      posts: {
        // this array looks for content not in pages folder
        files: [{
          cwd: './src/content/',
          dest: './dist/',
          expand: true,
          src: ['**/*.hbs', '!_pages/**/*.hbs']
        }, {
          // this array looks for content in pages
          cwd: './src/content/_pages/',
          dest: './dist/',
          expand: true,
          src: '**/*.hbs'
        }]
      }
    },

    // watch task
    watch: {
      html: {
        files: '**/*.hbs',
        tasks: ['assemble'],
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
    'connect:server',
    'watch'
    ]);

};