import gulp from 'gulp';
import rimraf from 'rimraf';

// remove compiled files
gulp.task('clean:compiled', (done) => {
  rimraf('app/public/*/compiled', done);
});

// remove built files
gulp.task('clean:dist', (done) => {
  rimraf('app/dist', done);
});
