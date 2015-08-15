var gulp = require('gulp');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var htmlmin = require('gulp-htmlmin');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');

gulp.task('html', function() {
  return gulp.src('src/**/*.html', {base: 'src'})
             .pipe(htmlmin({collapseWhitespace: true}))
             .pipe(gulp.dest('dist'));
});

gulp.task('css', function() {
  return gulp.src('src/css/*.css')
             .pipe(cssmin())
	           .pipe(rename({suffix: '.min'}))
             .pipe(gulp.dest('dist/css'));
});

gulp.task('js', function() {
  return gulp.src('src/js/*.js')
             .pipe(jshint())
             .pipe(jshint.reporter('default'))
             .pipe(uglify())
             .pipe(concat('moviequotes.min.js'))
             .pipe(gulp.dest('dist/js'));
});

gulp.task('favicon', function() {
  return gulp.src('src/favicon.ico')
             .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.html', ['html']);
  gulp.watch('src/css/*.css', ['css']);
  gulp.watch('src/js/*.js', ['js']);
});

gulp.task('default', ['html', 'css', 'js', 'favicon']);
