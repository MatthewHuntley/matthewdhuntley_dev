'use strict';

var gulp = require('gulp'),
	concat = require('gulp-concat'),
	cleanCSS = require('gulp-clean-css'),
	cssMap = require('vinyl-map'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	  //sass = require('gulp-sass'),
 	maps = require('gulp-sourcemaps'),
 	del = require('del');

//Map then concatenate all CSS files into one file: main.css:
gulp.task('concatCSSFiles', function() {
	return gulp.src([	
		'src/public/css/bootstrap.css', 
		'http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800',
		'http://fonts.googleapis.com/css?family=Merriweather:400,300,300italic,400italic,700,700italic,900,900italic',
		'src/public/font-awesome/css/font-awesome.min.css', 
		'src/public/css/animate.min.css', 
		'src/public/js/slick/slick.css', 
		'src/public/js/slick/slick-theme.css',
		'src/public/css/styles.css',
		'src/public/css/index.css',
		'src/public/css/responsive.css'])
	.pipe(maps.init())
	.pipe(concat('main.css'))
	.pipe(maps.write('./'))
	.pipe(gulp.dest('src/public/css/'));
});

//Map then minify main.css:
gulp.task('minifyCSSFile', ['concatCSSFiles'], function() {
    return gulp.src('src/public/css/main.css')
        .pipe(maps.init())
        .pipe(cleanCSS())
        .pipe(rename('main.min.css'))
        .pipe(maps.write('./'))
		.pipe(gulp.dest('src/public/css/'));
    });

//Map then concatenate all JS files into one file: main.js; minify main.js into main.min.js:
//NOTE: Using one task for both concat and minify operations (for now) because we found this approach works for mapping, as opposed to running them separately. 
//Therefore, not utlizing 'minifyJSFile' task at this time (see below).
gulp.task('mapConcatMinifyJSFiles', function() {
	return gulp.src([	
		'src/public/js/jquery.js', 
		'src/public/js/bootstrap.min.js', 
		'src/public/js/jquery.easing.min.js', 
		'src/public/js/jquery.fittext.js', 
		'src/public/js/wow.min.js',
		'src/public/js/slick/slick.min.js',
		'src/public/js/custom.js'])
	.pipe(maps.init())
	.pipe(concat('main.js'))
	.pipe(gulp.dest('src/public/js/'))
	.pipe(uglify())
	.pipe(rename('main.min.js'))
	.pipe(maps.write('./'))
	.pipe(gulp.dest('src/public/js/'));
});

//Map then minify main.js:
//NOTE: Not currently utilizing this task due to mapping feature not working just yet.
gulp.task('minifyJSFile', ['concatJSFiles'], function() {
		return gulp.src('src/public/js/main.js')
		.pipe(maps.init())
		.pipe(uglify())
		.pipe(rename('main.min.js'))
		.pipe(maps.write('./'))
		.pipe(gulp.dest('src/public/js/'));
	}
);

//watchFiles task utlizes inherent gulp.watch method to "watch" for when any specified files (e.g. any matching file in this directory 'scss/**/*.scss') change
//NOTE: watchFiles task must be run first
gulp.task('watchFiles', function() {
	gulp.watch(['src/public/js/*.js'], ['minifyJSFile']);
});

gulp.task('clean', function() {
	del(['dist', 'src/public/css/main.css', 'src/public/css/main.css*', 'src/public/css/main.min.css*', 'src/public/js/main.js*', 'src/public/js/main.min.js*']);
});

//Build application for development then create production folder:
gulp.task('build', ['minifyCSSFile', 'mapConcatMinifyJSFiles'], 
		//Build pipeline for production (i.e. compile finished app into single, distributable folder):
		function() {
			return gulp.src(['src/public/css/main.min.css', 'src/public/js/main.min.js', 'src/public/fonts/**', 'src/public/img/**', 'src/views/**', 'src/app.js'], { base: './'})
			.pipe(gulp.dest('dist'));
		}
); 

//Inherent 'gulp' task (named when 'default' is the name of the task) first runs the other gulp dependencies
//Then run 'build' task automatically via inherent gulp.start() method (start saves us the trouble of typing out "gulp build", which is being deprecated
gulp.task('default', ['clean'], function() {
	gulp.start('build', function() {
		console.log("External files concatenated and minified.");
	});
});