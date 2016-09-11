'use strict';

var gulp = require('gulp'),
	concat = require('gulp-concat');
	//uglify = require('gulp-uglify'),
	//rename = require('gulp-rename'),
	  //sass = require('gulp-sass'),
 	  //maps = require('gulp-sourcemaps'),
 	   //del = require('del');

gulp.task('concatCSSFiles', function() {
	gulp.src([	
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
	.pipe(concat('main.css'))
	.pipe(gulp.dest('src/public/css/'));
});

gulp.task('concatJSFiles', function() {
	gulp.src([	
		'src/public/js/jquery.js', 
		'src/public/js/bootstrap.min.js', 
		'src/public/js/jquery.easing.min.js', 
		'src/public/js/jquery.fittext.js', 
		'src/public/js/wow.min.js',
		'src/public/js/slick/slick.min.js',
		'src/public/js/custom.js'])
	.pipe(concat('main.js'))
	.pipe(gulp.dest('src/public/js/'));
});

//inherent 'gulp' task (named when 'default' is the name of the task) first runs the other gulp dependencies
//Then run 'build' task automatically via inherent gulp.start() method (start saves us the trouble of typing out "gulp build", which is being deprecated)
gulp.task('default', ['concatCSSFiles', 'concatJSFiles'], function() {
	console.log("External files concatenated.");
});