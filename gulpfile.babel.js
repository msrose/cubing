import gulp from 'gulp';

import './tasks/serve'
import './tasks/sass'
import './tasks/javascript'
import './tasks/build'
import './tasks/clean'

var nodeFiles = [
  'node_modules/babel-polyfill/dist/polyfill.min.js',
  'node_modules/normalize.css/normalize.css'
];

// copy files from npm packages to be used in browser
gulp.task('copy:node', () => {
  return gulp.src(nodeFiles)
    .pipe(gulp.dest('app/public/lib/node'));
});

// run all lint tasks
gulp.task('lint', ['sass:lint', 'js:lint']);

// lint everything every time a file is changed
gulp.task('lint:watch', ['js:lint:watch', 'sass:lint:watch']);

// run all watch tasks
gulp.task('watch', ['sass:watch', 'babel:watch', 'lint:watch']);

// run all compilation tasks
gulp.task('compile', ['sass', 'babel']);

// remove all generated files
gulp.task('clean', ['clean:compiled', 'clean:dist']);

gulp.task('default', ['lint', 'watch', 'serve']);
