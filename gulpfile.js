// Sweet recepies: https://github.com/gulpjs/gulp/tree/master/docs/recipes
// Source: http://gulpjs.com/plugins/
//

var gulp = require('gulp');
var jsmin = require('gulp-jsmin');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var copy = require('gulp-copy');
var jshint = require('gulp-jshint');
var del = require('del');

// js minification
gulp.task('minify-js', function () {
	return gulp.src('src/**/*.js')
		.pipe(jsmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('dist'));
});

// js concatenation, sourcemaps, uglify
gulp.task('concat-js', function() {
    return gulp.src('dist/**/*js')
        .pipe(sourcemaps.init())
        .pipe(concat('all.js', {newLine: '\n\n'}))
        .pipe(sourcemaps.write( ))
        .pipe(uglify())
        .pipe(gulp.dest('dist/'));
});

// deleting files
gulp.task('clean', function() {
    return del(['dist/all.js']);
});

// copy
gulp.task('copy', function() {
    return gulp.src('dist/**/*.js')
        .pipe(copy('prod', {prefix: 1}));
});

// jshint
gulp.task('jshint', function() {
    return gulp.src('src/**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'));
});

// watch
// less
// sass
// es6, es7

gulp.task('default', function() {
    // default task be here
});
