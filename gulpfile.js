var gulp        = require('gulp');
var sass        = require('gulp-sass');
var less        = require('gulp-less');
var browserSync = require('browser-sync').create();

gulp.task('serve',['sass'], function() {
    browserSync.init({
        server: {
            baseDir: "./web"
        }
    });
    gulp.watch("web/sass/*.scss", ['sass']);
    gulp.watch("web/*.html").on('change', browserSync.reload);
});
gulp.task('sass', function() {
  return gulp.src('web/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('web/css'))
    .pipe(browserSync.stream());
});



gulp.task('default',['serve']);