import gulp from 'gulp';
import cache from 'gulp-cached';
import sass from 'gulp-sass';
import sasslint from 'gulp-sass-lint';

var sassFiles = 'app/src/sass/**/*.scss';

// compile sass files to css
gulp.task('sass', () => {
  return gulp.src(sassFiles)
    .pipe(cache('sass'))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('app/public/styles/compiled'));
});

// recompile sass when a file is changed
gulp.task('sass:watch', () => {
  gulp.watch(sassFiles, ['sass']);
});

// lint sass files
gulp.task('sass:lint', () => {
  return gulp.src(sassFiles)
    .pipe(cache('sasslint'))
    .pipe(sasslint())
    .pipe(sasslint.format());
});

// lint whenever a sass file is changed
gulp.task('sass:lint:watch', () => {
  gulp.watch(sassFiles, ['sass:lint']);
});
