var   gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	  //sass = require('gulp-sass'),
 	  maps = require('gulp-sourcemaps'),
 	   del = require('del');

//inherent 'gulp' task (named when 'default' is the name of the task) first runs the other gulp dependencies
//Then run 'build' task automatically via inherent gulp.start() method (start saves us the trouble of typing out "gulp build", which is being deprecated
gulp.task('default', function() {
	console.log("Hello");
});