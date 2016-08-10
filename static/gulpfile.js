var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var sass = require('gulp-sass');
var runSequence = require('run-sequence');
var copy = require('gulp-copy');
var batch = require('gulp-batch');

var paths = {
    scripts: ['./bower_components/jquery/dist/jquery.min.js',
        './bower_components/angular/angular.min.js',
        './bower_components/angular-ui-router/release/angular-ui-router.min.js',
        './src/js/vendor/underscore-min.js',
        './bower_components/Swiper/dist/js/swiper.min.js',
        './bower_components/angular-swiper/dist/angular-swiper.js',
        './src/js/bootstrap.min.js',
        './src/config.js', './src/index.js', './src/states/**/*.js', './src/filters/**/*.js', './src/blocks/**/*.js', './src/services/**/*.js'],
    styles: ['./src/css/bootstrap.css',
        './src/css/swiper.css',
        './src/css/general.scss', './src/css/variablse.scss', './src/css/mixins.scss', './src/states/**/*.scss', './src/blocks/**/*.scss'],
    fonts: ['./bower_components/bootstrap/dist/fonts/**/*.*', './src/font/**/*.*'],
    htmls: ['./src/index.html', './src/**/*.html'],
    media: ['./src/media/**/*.*', './src/favicon.ico'],
    robots:['./src/robots.txt']
};

var admin = {
    scripts: ['./bower_components/jquery/dist/jquery.min.js',
        './bower_components/angular/angular.min.js',
        './src/js/vendor/angular-file-upload.min.js',
        './src/js/vendor/underscore-min.js',
        './src/admin/js/bootstrap.min.js',
        './src/admin/js/index.js',
        './src/admin/blocks/**/*.js', './src/admin/services/**/*.js'],
    styles: ['./src/admin/css/bootstrap.min.scss',
        './src/admin/blocks/**/*.scss']
};

gulp.task('scripts:concat', () => {
    return gulp.src(paths.scripts)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('script.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/scripts'));
});

gulp.task('styles:build', () => {
    return gulp.src(paths.styles)
        .pipe(sourcemaps.init())
        .pipe(concat('styles.scss'))
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/styles'));
});

gulp.task('build', () => {
    runSequence(['scripts:concat', 'styles:build', 'copy:fonts', 'copy:html', 'copy:media', 'copy:robots']);
});

gulp.task('watch', () => {
    return gulp.watch('src/**', ['build', 'admin:build']);
});

gulp.task('copy:fonts', () => {
    return gulp.src(paths.fonts)
        .pipe(gulp.dest('./dist/fonts/'));
});

gulp.task('copy:media', () => {
    return gulp.src(paths.media)
        .pipe(gulp.dest('./dist/media/'));
});

gulp.task('copy:html', () => {
    return gulp.src(paths.htmls)
        .pipe(gulp.dest('./dist/'));
});

gulp.task('copy:robots', () => {
    return gulp.src(paths.robots)
        .pipe(gulp.dest('./dist/'));
});

gulp.task('admin:build', () => {
    runSequence(['admin:styles', 'admin:scripts']);
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
    runSequence(['build', 'admin:build', 'watch'])
});