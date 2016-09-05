'use strict';

var gulp = require('gulp'),
	concat = require('gulp-concat');
	//uglify = require('gulp-uglify'),
	//rename = require('gulp-rename'),
	  //sass = require('gulp-sass'),
 	  //maps = require('gulp-sourcemaps'),
 	   //del = require('del');

gulp.task('concatScripts', function() {
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
gulp.task('default', function() {
	console.log("Hello");
});