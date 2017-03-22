var gulp = require('gulp');
var cleancss = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var connect = require('gulp-connect');
var clean = require('gulp-clean');
var sourcemaps = require('gulp-sourcemaps');
var open = require('open');
var inline = require('gulp-inline');

var files = {
    html: ['./src/*.html', 'src/views/*.html'],
    css: ['./src/*/*.css', 'src/views/css/*.css'],
    js: ['./src/*/*.js', 'src/views/js/*.js'],
    images: ['./src/img/*.{png,jpg,gif,ico}', 'src/views/images/*.{png,jpg,gif,ico}']
};

var serve = {
    port: 5800,
};

gulp.task('html', function () {
    gulp.src(files.html, {
            base: './src'
        })
        .pipe(inline({
            css: cleancss
        }))
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('css', function () {
    gulp.src(files.css, {
            base: './src'
        })
        .pipe(cleancss())
        .pipe(gulp.dest('dist'));
});

gulp.task('js', function () {
    gulp.src(files.js, {
            base: './src'
        })
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'));
});

gulp.task('image', function () {
    gulp.src(files.images, {
            base: './src'
        })
        .pipe(imagemin())
        .pipe(gulp.dest('dist'));
});

gulp.task('build', ['html', 'css', 'js', 'image']);

gulp.task('connect', ['build'], function () {
    connect.server({
        root: 'dist',
        livereload: true,
        port: serve.port
    });
    open('http://localhost:' + serve.port);
});

gulp.task('clean', function () {
    gulp.src('dist')
        .pipe(clean());
});

gulp.task('default', ['connect'], function () {
    gulp.watch(files.html, ['html']);
    gulp.watch(files.css, ['css']);
    gulp.watch(files.js, ['js']);
    gulp.watch(files.images, ['image']);
});
