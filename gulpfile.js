const gulp = require('gulp');
const del = require('del');
const babel = require('gulp-babel');
const run_sequence = require('run-sequence');
const connect = require('gulp-connect');
const watch = require('gulp-watch');
const mocha = require('gulp-mocha');

gulp.task('clean', function(done) {
  return del(['./build'], done);
});

gulp.task('markup', function() {
  gulp.src('./src/*.html')
      .pipe(gulp.dest('./build/'));
});

gulp.task('compile', function() {
  return gulp.src('src/script/**/*.js')
              .pipe(babel({
                  presets: ['es2015']
              }))
             .pipe(gulp.dest('./build/js'));
});

gulp.task('styles', function() {
  return gulp.src('./src/styles/**/*.css')
             .pipe(gulp.dest('./build/css/'));
});

gulp.task('build', function(done) {
  run_sequence('clean', ['markup', 'compile', 'styles'], done);
});

gulp.task('test', () =>
    gulp.src('test/**/*.js', {read: false})
        // gulp-mocha needs filepaths so you can't have any plugins before it
        .pipe(mocha({reporter: 'nyan'}))
);

gulp.task('watch', function() {
     gulp.watch(["./src/**/*.*", "./test/**/*.*"], ['test']);
});

gulp.task('serve', ['build'], function() {
  connect.server({livereload: true, root: './build'});
  gulp.watch(["./src/**/*.*", "./test/**/*.*"], ['build']);
  watch("./build/**/*.*").pipe(connect.reload());
});

gulp.task('default', ['serve']);
