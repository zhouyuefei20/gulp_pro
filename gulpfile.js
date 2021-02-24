const gulp = require('gulp')
//css
const cssmin = require('gulp-cssmin') //css压缩
const autoprefixer = require('gulp-autoprefixer') //前缀
//scss
const scss = require('gulp-sass') //scss转css
//js
const uglify = require('gulp-uglify') //js压缩
const babel = require('gulp-babel') //es6转es5
//html
const htmlmin = require('gulp-htmlmin') //压缩html
//img
const imagemin = require('gulp-imagemin') //压缩images
//删除
const del = require('del')
//启动服务器
const webserver = require('gulp-webserver')

const cssHandler = function () { //@gulp4
  return gulp.src('./src/css/*.css').
  pipe(autoprefixer()).pipe(cssmin()).pipe(gulp.dest('./dist/css'))
}
const scssHandler = function () { //@gulp4
  return gulp.src('./src/scss/*.scss').pipe(scss()).
  pipe(autoprefixer()).pipe(cssmin()).pipe(gulp.dest('./dist/scss'))
}

const jsHandler = function () { //@gulp4
  return gulp.src('./src/js/*.js').pipe(babel({
    //babel@7   presets:['es2015]
    presets: ['@babel/env']
  })).pipe(uglify()).
  pipe(gulp.dest('./dist/js'))
}

const htmlHandler = function () { //@gulp4
  return gulp.src('./src/pages/*.html').pipe(htmlmin({
    removeComments: true, //清除HTML注释
    collapseWhitespace: true, //压缩HTML
    collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
    removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
    removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
    removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
    minifyJS: true, //压缩页面JS
    minifyCSS: true //压缩页面CSS
  })).
  pipe(gulp.dest('./dist/pages'))
}

const imageHandler = function () { //@gulp4
  return gulp.src('./src/images/**').pipe(imagemin()).
  pipe(gulp.dest('./dist/images'))
}

const delHandler = function () {
  return del(['./dist'])
}

const webserverHandler = function () {
  return gulp.src('./dist').pipe(webserver({
    livereload: true,
    host: 'www.zhou.com',
    port: 80,
    open: './pages/index.html'
  }))
}
module.exports.cssHandler = cssHandler
module.exports.scssHandler = scssHandler
module.exports.jsHandler = jsHandler
module.exports.htmlHandler = htmlHandler
module.exports.imageHandler = imageHandler
module.exports.delHandler = delHandler
module.exports.webserverHandler = webserverHandler

module.exports.default = gulp.series(delHandler, gulp.parallel(cssHandler, scssHandler, jsHandler, htmlHandler, imageHandler), webserverHandler)