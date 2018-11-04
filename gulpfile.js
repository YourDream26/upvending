

'use strict';

let gulp = require('gulp');
let del = require('del');
let uglify = require('gulp-uglify');
let concat = require('gulp-concat');
let sass = require('gulp-ruby-sass');
let autoprefixer = require('gulp-autoprefixer');
let browserSync = require('browser-sync').create();
let watch = require('gulp-watch');
let clean = require('gulp-clean');
 

gulp.task('clean', () => {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});



gulp.task('sass', () => {
  return sass('src/sass/*.scss')
    .on('error', sass.logError)
    .pipe(concat('style.css'))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('dist/styles'));
});


gulp.task('compress', () => {
  return gulp.src('src/js/*.js')
    .pipe(uglify())
    // .pipe(concat('all.js'))
    .pipe(gulp.dest('dist/scripts'));
});


gulp.task('template', [], () => {
  return gulp.src('src/*.html')
    // .pipe(concat('all.js'))
    .pipe(gulp.dest('dist'));
});



gulp.task('build', [
    'sass', 
    'compress',
    'template'
  ]);


gulp.task('default', ['build']);



gulp.task('serve', ['build'] , function(){

  browserSync.init({
    open:  true ,
    server: {
      baseDir: "dist"
    }
  });

  gulp.watch(['src/**/*'] , ['serve:reload'] );
});

gulp.task('serve:reload' , ['build', 'compress']  , function(){
  browserSync.reload();
});
