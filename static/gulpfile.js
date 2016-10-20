var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var sass = require('gulp-sass');
var runSequence = require('run-sequence');
var copy = require('gulp-copy');
var batch = require('gulp-batch');

//var paths = {
//    scripts: [
//        './src/js/bootstrap.min.js',
//        './src/index.js', './src/config.js', './src/translations.js', './src/states/**/*.js', './src/filters/**/*.js', './src/blocks/**/*.js', './src/services/**/*.js'],
//    styles: ['./src/css/bootstrap.css',
//        './src/css/swiper.css',
//        './src/css/general.scss', './src/css/variablse.scss', './src/css/mixins.scss', './src/states/**/*.scss', './src/blocks/**/*.scss'],
//    fonts: ['./bower_components/bootstrap/dist/fonts/**/*.*', './src/font/**/*.*'],
//    htmls: ['./src/index.html', './src/**/*.html'],
//    media: ['./src/media/**/*.*', './src/favicon.ico'],
//    robots: ['./src/robots.txt']
//};

var admin = {
    scripts: ['./bower_components/jquery/dist/jquery.min.js',
        './bower_components/angular/angular.min.js',
        './src/admin/js/angular-file-upload.min.js',
        './src/admin/js/underscore-min.js',
        './src/admin/js/bootstrap.min.js',
        './src/admin/js/index.js',
        './src/admin/blocks/**/*.js', './src/admin/services/**/*.js'],
    styles: ['./src/admin/css/bootstrap.min.scss',
        './src/admin/css/general.scss',
        './src/admin/blocks/**/*.scss'],
    htmls: ['./src/**/*.html'],
    robots: ['./src/robots.txt']
};

gulp.task('watch', () => {
    return gulp.watch('src/**', ['admin:build']);
});

gulp.task('copy:robots', () => {
    return gulp.src(admin.robots)
        .pipe(gulp.dest('./dist/'));
});

gulp.task('copy:html', () => {
    return gulp.src(admin.htmls)
        .pipe(gulp.dest('./dist/'));
});

gulp.task('admin:build', () => {
    runSequence(['admin:styles', 'admin:scripts', 'copy:html']);
});

gulp.task('admin:styles', () => {
    return gulp.src(admin.styles)
        .pipe(sourcemaps.init())
        .pipe(concat('style.scss'))
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/admin/style/'));
});

gulp.task('admin:scripts', () => {
    return gulp.src(admin.scripts)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('script.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/admin/script'));
});

gulp.task('default', () => {
    runSequence(['admin:build', 'watch'])
});