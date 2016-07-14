var gulp 		 = require('gulp');
var sass 		 = require('gulp-sass');
var less 		 = require('gulp-less');
var concat       = require('gulp-concat');
var minifyCss    = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var sourceMaps   = require('gulp-sourcemaps');
var rename       = require('gulp-rename');
var browserSync  = require('browser-sync').create();


gulp.task('serve',['build-css'], function() {
    browserSync.init({
        server: {
            baseDir: "./web"
        }
    });
    gulp.watch(["web/sass/abstracts/*.scss",
        "web/sass/base/*.scss",
        "web/sass/pages/*.scss",
        "web/sass/layout/*.scss",
        "web/sass/components/*.scss"], ['build-css']);
    gulp.watch("web/*.html").on('change', browserSync.reload);
});


gulp.task('build-css', function() {
  return gulp.src(["web/sass/pages/*.scss","web/sass/layout/*.scss",
    "web/sass/components/*.scss",
    "web/sass/base/*.scss",
    "web/sass/abstracts/*.scss"
    ])
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('main.css'))
    .pipe(autoprefixer())
    .pipe( minifyCss( {
                compatibility: 'ie8'
      } ) )
    .pipe( rename( {
                suffix: '.min'
     } ) )
    .pipe( sourceMaps.write() )
    .pipe(gulp.dest('web/css'))
    .pipe(browserSync.stream());
});



gulp.task('default',['serve']);