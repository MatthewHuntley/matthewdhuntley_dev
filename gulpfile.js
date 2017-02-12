'use strict';

var gulp = require('gulp'),
	concat = require('gulp-concat'),
	cleanCSS = require('gulp-clean-css'),
	cssMap = require('vinyl-map'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	  //sass = require('gulp-sass'),
 	maps = require('gulp-sourcemaps'),
 	del = require('del'),
 	order = require('gulp-order');

//Map then concatenate all CSS files into one file: main.css:
gulp.task('concatCSSFiles', function() {
	return gulp.src([	
		'src/public/css/bootstrap.css', 
		'http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800',
		'http://fonts.googleapis.com/css?family=Merriweather:400,300,300italic,400italic,700,700italic,900,900italic',
		'src/public/font-awesome/css/font-awesome.min.css', 
		'src/public/css/animate.min.css',
		'src/public/css/header.css', 
		'src/public/css/nav.css', 
		'src/public/js/slick/slick.css', 
		'src/public/js/slick/slick-theme.css',
		'src/public/css/slider.css',
		'src/public/css/styles.css',
		'src/public/css/index.css',
		'src/public/css/twitter.css', 
		'src/public/css/footer.css',
		'src/public/css/interior.css',
		'src/public/css/film-reviews.css',
		'src/public/css/font-awesome.min.css',
		'src/public/css/responsive.css'])
	.pipe(maps.init())
	.pipe(order([	
		'src/public/css/bootstrap.css', 
		'http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800',
		'http://fonts.googleapis.com/css?family=Merriweather:400,300,300italic,400italic,700,700italic,900,900italic',
		'src/public/font-awesome/css/font-awesome.min.css', 
		'src/public/css/animate.min.css',
		'src/public/css/header.css', 
		'src/public/css/nav.css', 
		'src/public/js/slick/slick.css', 
		'src/public/js/slick/slick-theme.css',
		'src/public/css/slider.css',
		'src/public/css/styles.css',
		'src/public/css/index.css',
		'src/public/css/interior.css',
		'src/public/css/twitter.css', 
		'src/public/css/footer.css',
		'src/public/css/about.css',
		'src/public/css/film-reviews.css',
		'src/public/css/font-awesome.min.css',
		'src/public/css/responsive.css']), { base: './' }
	)
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

//Concatenate JS Files into main.js (using this for our 'watchFiles' task [see below] for developement only for when custom.js changes)
gulp.task('concatJSFiles', function() {
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
	.pipe(gulp.dest('src/public/js/'));
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

//watchFiles task utlizes inherent gulp.watch method to "watch" when any specified files (e.g. any matching files in src/public/css/ or src/public/js change)
//NOTE 1: The 'watchFiles' task or 'gulp serve' must be run first
//NOTE 2: Utilize this during development
gulp.task('watchFiles', function() {
	/*gulp.watch(['src/public/css/*.css'], ['concatCSSFiles']);
	gulp.watch(['src/public/js/*.js'], ['concatJSFiles']);*/
	gulp.watch(['src/public/css/*.css'], ['minifyCSSFile']);
	gulp.watch(['src/public/js/custom.js'], ['mapConcatMinifyJSFiles']);
	//NOTE: Running entire concat --> minify process on css files and js files when respective files (change since my application is so small); normally, 'watch' would only utilize concat (since minify takes a long time). This differs from Treehouse gulp-basics example because that application did not minify the CSS files and it never went into changes made to the main.js file, even though it was serving the corresponding .min.js file.
});

gulp.task('clean', function() {
	del(['dist', 'src/public/css/main.css', 'src/public/css/main.css*', 'src/public/css/main.min.css*', 'src/public/js/main.js*', 'src/public/js/main.min.js*']);
});

//Build application for development then create production folder:
//NOTE: Only run this at the end of each development session and/or prior to production release
gulp.task('build', ['minifyCSSFile', 'mapConcatMinifyJSFiles'], 
		//Build pipeline for production (i.e. compile finished app into single, distributable folder):
		function() {
			return gulp.src(['src/public/css/main.min.css', 'src/public/js/main.min.js', 'src/public/fonts/**', 'src/public/img/**', 'src/views/**', 'src/app.js'], { base: './'})
			.pipe(gulp.dest('dist'));
		}
); 

gulp.task('package', ['build'], 
		//Copy the json file to the 'dist' folder
		function() {
			return gulp.src(['package.json'], { base: './'})
			.pipe(gulp.dest('dist/src'));
		}
); 

gulp.task('serve', ['watchFiles']);

//Inherent 'gulp' task (named when 'default' is the name of the task) first runs the other gulp dependencies
//Then run 'build' task automatically via inherent gulp.start() method (start saves us the trouble of typing out "gulp build", which is being deprecated
gulp.task('default', ['clean'], function() {
	gulp.start('package', function() {
		console.log("External files concatenated and minified, dist folder built.");
	});
});