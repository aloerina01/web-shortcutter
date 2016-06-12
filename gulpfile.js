var gulp = require('gulp');
var gulpCoffee = require('gulp-coffee');

gulp.task('coffee', function(){
  gulp.src('lib/*')
    .pipe(gulpCoffee());
});
