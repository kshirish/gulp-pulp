////////////////////////////////////////////////////////////////////////////
// Sweet recepies: https://github.com/gulpjs/gulp/tree/master/docs/recipes//
// Source: http://gulpjs.com/plugins////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

var gulp = require('gulp');
var jsmin = require('gulp-jsmin');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var copy = require('gulp-copy');
var jshint = require('gulp-jshint');
var watch = require('gulp-watch');
var less = require('gulp-less');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var htmlmin = require('gulp-htmlmin');
var csso = require('gulp-csso');
var rev = require('gulp-rev');
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
        .pipe(uglify())
		.pipe(sourcemaps.write( ))
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
// Note: Watch waits for end, so emitting end in error handler solves most of the cases.
gulp.task('watch', function() {
	return gulp.src('src/**/*.js')
		.pipe(watch('src/**/a.js'))
		// .on('error', function handleError(err) {
		// 	console.log(err.toString());
		// 	this.emit('end');
		// })
		.pipe(gulp.dest('build'));
});

// less
gulp.task('compile-less', function() {
	return gulp.src('less/*.less')
		.pipe(less({
			paths: ['bootstrap-bower-folder']
		}))
		.pipe(gulp.dest('static/css'))
});

// sass
gulp.task('compile-sass', function() {
	return gulp.src('sass/*.scss')
		.pipe(sass({
			includePaths: ['bootstrap-bower-folder'],
		   outputStyle: 'nested',
		   errLogToConsole: true
		}))
		.pipe(gulp.dest('static/css'))
});

// es6, es7
gulp.task('compile-es6', function() {
	return gulp.src('es6/**/*.js')
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['es2015'],
			plugins: ['transform-runtime']	// for generators
		}))
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write('.'))		// creates seperate sourcemap file
		.pipe(gulp.dest('dist'));
});

// htmlmin
gulp.task('minify-html', function() {
	return gulp.src('views/*.html')
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('dist'));
})

// cssmin
gulp.task('minify-css', function() {
	return gulp.src('static/css/*.css')
		.pipe(csso({
			restructure: false,			// for development purpose
            sourceMap: true,
            debug: true
		}))
		.pipe(gulp.dest('dist'));
});

// assets versioning
gulp.task('versioning', function() {
	return gulp.src('dist/*')
		.pipe(rev())
		.pipe(gulp.dest('dist'));
});

gulp.task('default', function() {
    // default task be here
});
