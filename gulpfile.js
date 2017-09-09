const gulp = require('gulp');
const plumber = require('gulp-plumber');
const eslint = require('gulp-eslint');
const browserify = require('browserify');
const source = require('vinyl-source-stream')
const streamify = require('gulp-streamify')
const uglify = require('gulp-uglify')
const babelify = require("babelify");
const htmlmin = require('gulp-htmlmin');
const del = require('del');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('default', ['lint', 'dist:cleanup', 'js:bundle', 'js:vendor:bundle', 'html:copy']);

gulp.task('lint', () => {
  return gulp.src(['src/**/*.js', '!node_modules/**', '!dist/**', '!src/**/___*/**/*'])
    .pipe(plumber())
    .pipe(eslint({
      globals: [
        'describe',
        'test',
        'expect',
        'angular'
      ]
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('js:vendor:bundle', ['dist:cleanup'], () => {
  const bundleStream = browserify([
    'node_modules/angular/angular.min.js',
    'node_modules/angular-block-ui/dist/angular-block-ui.min.js',
    'node_modules/angular-messages/angular-messages.min.js',
    'node_modules/angular-route/angular-route.min.js',
    'node_modules/angular-sanitize/angular-sanitize.min.js',
    'node_modules/angular-touch/angular-touch.min.js',
    'node_modules/angular-ui-router/build/angular-ui-router.min.js',
  ])
    .bundle();

  return bundleStream
    .pipe(plumber())
    .pipe(source('vendor.min.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('js:bundle', ['lint', 'dist:cleanup'], () => {
  const bundleStream = browserify([
    'src/app.module.js',
    'src/app.module.config.js',
    'src/list/list.controller.js',
    'src/home/home.controller.js',
  ])
    .transform(babelify)
    .bundle();

  return bundleStream
    .pipe(plumber())
    .pipe(source('bundle.min.js'))
    .pipe(streamify(sourcemaps.init()))
    .pipe(streamify(uglify()))
    .pipe(streamify(sourcemaps.write()))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('html:copy', ['dist:cleanup'], () => {
  return gulp.src('./src/**/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('dist:cleanup', () => {
  return del('./dist/');
});
