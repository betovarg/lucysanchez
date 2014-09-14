// including plugins
var gulp = require('gulp')
, copy =  require("gulp-copy")
, minifyHtml = require("gulp-minify-html")
, uglify = require("gulp-uglify")
, concat = require("gulp-concat")
, watch = require("gulp-watch");

// * Express server, executed on gulp default task *

var EXPRESS_PORT = 4000;
var EXPRESS_ROOT = __dirname + '/compiled';
var LIVERELOAD_PORT = 35729;

function startExpress() {
  var express = require('express');
  var app = express();
  //line below add livereload js to pages served by express
  app.use(require('connect-livereload')());
  app.use(express.static(EXPRESS_ROOT));
  app.listen(EXPRESS_PORT);
}

// * Setting up live reload *

// We'll need a reference to the tinylr
// object to send notifications of file changes
var lr;
function startLivereload() {

  lr = require('tiny-lr')();
  lr.listen(LIVERELOAD_PORT);
}

// Notifies livereload of changes detected
// by gulp.watch()
function notifyLivereload(event) {
 
  // gulp.watch() events provide an absolute path
  // so we need to make it relative to the server root
  var fileName = require('path').relative(EXPRESS_ROOT, event.path);
 
  lr.changed({
    body: {
      files: [fileName]
    }
  });
}

// copyHtml
gulp.task('copyHtml', function () {
  return gulp
    .src('./src/index.html')
    .pipe(gulp.dest('./compiled/'));
});

// minify-html
gulp.task('minify-html', function () {
    gulp.src('./src/*.html')
    .pipe(minifyHtml())
    .pipe(gulp.dest('./compiled/'));
});

// concat
gulp.task('concat-js', function () {
    gulp.src(['./src/js/jquery.flexslider-min.js'
      , './src/js/jquery.resizeimagetoparent.min.js'
      , './src/js/lightbox.min.js'
      , './src/js/picturefill.min.js'
      , './src/js/waypoints.min.js'
      , './src/js/scripts.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./compiled/js/'));
});

// minify-js
gulp.task('minify-js', function() {
  gulp.src('./compiled/js/app.js')
    .pipe(uglify())
    .pipe(gulp.dest('./compiled/js/'))
});

gulp.task('watch', function() {
  gulp.watch('./src/js/*.js', ['concat-js', 'minify-js']);
  gulp.watch('./src/*.html', ['minify-html']);
});

// default task
gulp.task('default', function () {

  startExpress();
  startLivereload();
  gulp.watch('compiled/*', notifyLivereload);
  gulp.watch('compiled/css/*', notifyLivereload);
});