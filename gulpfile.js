var gulp = require('gulp');
var watch = require('gulp-watch');
var shell = require('gulp-shell');
 
var feTestCmd = 'npm test';
var feTestArgs = {
  ignoreErrors: true
};

gulp.task('test-watch', function() {
  gulp
    .src('')
    .pipe(watch('index.js'))
    .pipe(watch('lib/**'))
    .pipe(watch('test/**'))
    .pipe(shell(feTestCmd, feTestArgs));
});
