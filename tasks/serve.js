import gulp from 'gulp';
import webserver from 'gulp-server-livereload';

// serve the application for development
gulp.task('serve', ['compile'], () => {
  gulp.src('app/public')
    .pipe(webserver({
      livereload: true,
      port: 1337,
      open: true
    }));
});

// test production build in the browser
gulp.task('serve:dist', ['build'], () => {
  gulp.src('app/dist')
    .pipe(webserver({
      livereload: false,
      port: 1338,
      open: true
    }));
});
