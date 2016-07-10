import gulp from 'gulp';
import cache from 'gulp-cached';
import eslint from 'gulp-eslint';
import babel from 'gulp-babel';

var jsFiles = [
  'gulpfile.js',
];

var babelScripts = [
  'app/src/scripts/**/*.js'
];

var babelTests = [
  'app/src/tests/**/*.js'
];

var babelFiles = babelScripts.concat(babelTests);

var allJs = jsFiles.concat(babelFiles);

// compile js source files with babel
gulp.task('babel:scripts', () => {
  return gulp.src(babelScripts)
    .pipe(cache('babelScripts'))
    .pipe(babel().on('error', function(error) {
      console.log(error.message);
      console.log(error.codeFrame);
      this.emit('end');
    }))
    .pipe(gulp.dest('app/public/scripts'));
});

// compile js test files with babel
gulp.task('babel:tests', () => {
  return gulp.src(babelTests)
    .pipe(cache('babelTests'))
    .pipe(babel().on('error', function(error) {
      console.log(error.message);
      console.log(error.codeFrame);
      this.emit('end');
    }))
    .pipe(gulp.dest('app/public/tests'));
});

// compile es6 features with babel
gulp.task('babel', ['babel:scripts', 'babel:tests']);

// compile with babel every time a file is changed
gulp.task('babel:watch', () => {
  gulp.watch(babelFiles, ['babel']);
});

// lint javascript files
gulp.task('js:lint', () => {
  return gulp.src(allJs)
    .pipe(cache('linting'))
    .pipe(eslint())
    .pipe(eslint.format());
});

// lint javascript when a file is changed
gulp.task('js:lint:watch', () => {
  gulp.watch(allJs, ['js:lint']);
});
