// including plugins
var gulp = require('gulp')
, minifyHtml = require("gulp-minify-html")
, uglify = require("gulp-uglify")
, concat = require("gulp-concat");

// minify-html
gulp.task('minify-html', function () {
    gulp.src('./app/*.html')
    .pipe(minifyHtml())
    .pipe(gulp.dest('./compiled/'));
});

// concat
gulp.task('concat', function () {
    gulp.src(['./app/js/jquery.flexslider-min.js'
              ,'./app/js/jquery.resizeimagetoparent.min.js'
              ,'./app/js/lightbox.min.js'
              ,'./app/js/scripts.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./compiled/js'));
});

// minify-js
gulp.task('minify-js', function() {
  gulp.src('./compiled/js/app.js')
    .pipe(uglify())
    .pipe(gulp.dest('./compiled/js/'))
});