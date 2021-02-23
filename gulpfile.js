const gulp = require('gulp')
const cssmin = require('gulp-cssmin')

// gulp.task('cssHandler',function(){
//  return gulp.src('./src/css/*.css').pipe(cssmin()).pipe(gulp.dest('./dist/css'))
// })

const cssHandler=function(){
 return gulp.src('./src/css/*.css').pipe(cssmin()).pipe(gulp.dest('./dist/css'))
}
module.exports.cssHandler=cssHandler