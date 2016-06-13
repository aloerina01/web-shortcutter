var gulp = require('gulp');
var gulpCoffee = require('gulp-coffee');
var less = require('gulp-less');

gulp.task('coffee', function(){
  gulp.src('./lib/*.coffee')
    .pipe(gulpCoffee())
    .pipe(gulp.dest('./lib'));
});

gulp.task('less', function(){
  gulp.src('./styles/*.less')
    .pipe(less())
    .pipe(gulp.dest('./mock'));
});

gulp.task('default', function(){
  gulp.watch('styles/*.less', ['less']);
});
