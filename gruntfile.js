module.exports = function (grunt) {
  'use strict';

  //load all the plugins in package.json
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
  // load assemble
  grunt.loadNpmTasks('assemble');

  // require eyeglass
  var eyeglass = require("eyeglass");

  grunt.initConfig({
    pkg: grunt.file.readJSON('./package.json'),

    connect: {
      server: {
        options: {
          livereload: true,
          port: 4000,
          hostname: '*',
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
        layoutdir: './src/assemble_templates/layouts/',
        partials: './src/assemble_templates/partials/**/*'
      },
      pages: {
        // this array looks for content in store folder
        options: {
          layout: 'page.hbs',
        },
        files: [{
          cwd: './src/assemble_content/store/',
          dest: './dist/store/',
          expand: true,
          src: ['*.hbs', '!_pages/**/*.hbs']
        }, {
          // this array looks for content in pages
          cwd: './src/assemble_content/_pages/',
          dest: './dist/',
          expand: true,
          src: '**/*.hbs'
        }]
      },
      styleguide: {
        options: {
          layout: 'styleguide-layout.hbs',
        },
        cwd: './src/assemble_content/styleguide/',
        dest: './dist/',
        expand: true,
        src: 'styleguide.hbs',
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
          'dist/index.html': 'dist/index-uncompressed.html',     // 'destination': 'source'
        }
      }
    },

    sass: {
      files: ['./src/sass/*.scss', './src/sass/**/*.scss'],
      options: require("eyeglass")({
        sourceMap: true
      }),
      dist: {
        files: {
          './dist/css/style.css': './src/sass/style.scss'
        }
      }
    },

    postcss: {
      files: './dist/css/*.css',
      options: {
        map: true,
        processors: [
          require('autoprefixer')({browsers: ['last 2 version']})
        ]
      },
      dist: {
        src: './dist/css/style.css',
        dest: './dist/css/style.css'
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
      js: {
        files: 'src/js/*',
        tasks: ['uglify'],
        options: {
          livereload: true,
        },
      },
      sass: {
        files: ['<%= sass.files %>'],
        tasks: ['sass'],
        options: {
          sourceMap: true
        },
        dist: {
          files: {
            './dist/css/style.css': './src/sass/style.scss'
          }
        }
      },
      css: {
        files: './dist/css/*',
        tasks: ['postcss'],
        options: {
          livereload: true,
        },
      },
      index: {
        files: 'dist/index-uncompressed.html',
        tasks: ['htmlmin'],
        options: {
          livereload: true,
        },
      },
    }

  });

  /* grunt tasks */
  grunt.registerTask('serve', [
    'assemble',
    'uglify',
    'connect:server',
    'sass',
    'htmlmin',
    'watch'
    ]);

};