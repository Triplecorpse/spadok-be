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
        './bower_components/lodash/dist/lodash.core.min.js',
        './src/js/bootstrap.min.js',
        './src/config.js', './src/main.js', './src/states/**/*.js', './src/blocks/**/*.js', './src/services/**/*.js'],
    styles: ['./src/css/bootstrap.min.css',
        './src/css/general.scss', './src/states/**/*.scss', './src/blocks/**/*.scss'],
    fonts: ['./bower_components/bootstrap/dist/fonts/**/*.*', './src/font/**/*.*'],
    htmls: ['./src/index.html', './src/**/*.html'],
    media: ['./src/media/**/*.*'],
    robots:['./src/robots.txt']
};

gulp.task('scripts:concat', () => {
    return gulp.src(paths.scripts)
        .pipe(sourcemaps.init())
        .pipe(babel({
            plugins: ['transform-react-jsx'],
            presets: ['es2015']
        }))
        .pipe(concat('script.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/scripts'));
});

gulp.task('styles:concat', () => {
    return gulp.src(paths.styles)
        .pipe(sourcemaps.init())
        .pipe(concat('styles.scss'))
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/styles'));
});

gulp.task('build', () => {
    runSequence(['scripts:concat', 'styles:concat'/*, 'styles:compile'*/, 'copy:fonts', 'copy:html', 'copy:media', 'copy:robots']);
});

gulp.task('watch', () => {
    return gulp.watch('src/**', ['build']);
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

gulp.task('default', () => {
    runSequence(['scripts:concat', 'styles:concat', /*'styles:compile',*/ 'copy:fonts', 'copy:media', 'copy:html', 'copy:robots', 'watch'])
});