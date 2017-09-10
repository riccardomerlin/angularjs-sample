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
const nodemon = require('nodemon');
const cleanCSS = require('gulp-clean-css');
const path = require('path');
const rename = require("gulp-rename");
const sass = require('gulp-sass');

const distPath = './dist';
const jsDistPath = path.join(distPath, 'js/');
const cssDistPath = path.join(distPath, 'css/');

gulp.task('default', [
  'js:lint',
  'dist:cleanup',
  'js:bundle',
  'js:vendor:bundle',
  'css:vendor:bundle',
  'sass:compile',
  'html:copy',
  'data:copy',
  'bootstrap:fonts:copy',
  'jquery:copy'
]);
gulp.task('js:lint', jsLint);
gulp.task('js:vendor:bundle', ['dist:cleanup'], jsVendorBundle);
gulp.task('js:bundle', ['js:lint', 'dist:cleanup'], jsBundle);
gulp.task('html:copy', ['dist:cleanup'], htmlCopy);
gulp.task('data:copy', ['dist:cleanup'], dataCopy);
gulp.task('dist:cleanup', distCleanUp);
gulp.task('css:vendor:bundle', ['dist:cleanup'], cssVendorBundle);
gulp.task('bootstrap:fonts:copy', ['dist:cleanup'], bootstrapFontsCopy);
gulp.task('jquery:copy', ['dist:cleanup'], jqueryCopy);
gulp.task('sass:compile', ['dist:cleanup'], sassCompile);

function jsLint() {
  return gulp.src([
    'src/**/*.js',
    '!node_modules/**',
    '!dist/**',
    '!src/**/___*/**/*'
  ])
    .pipe(plumber())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

function jsBundle() {
  const bundleStream = browserify([
    'src/app.module.js',
    'src/app.module.config.js',
    'src/list/list.controller.js',
    'src/list/list.service.js',
  ])
    .transform(babelify)
    .bundle();

  return bundleStream
    .pipe(plumber())
    .pipe(source('bundle.min.js'))
    .pipe(streamify(sourcemaps.init()))
    .pipe(streamify(uglify()))
    .pipe(streamify(sourcemaps.write()))
    .pipe(gulp.dest(jsDistPath));
}

function jqueryCopy() {
  return gulp.src('node_modules/jquery/dist/jquery.min.js')
    .pipe(gulp.dest(jsDistPath));
}

function jsVendorBundle() {
  const bundleStream = browserify([
    'node_modules/angular/angular.min.js',
    'node_modules/angular-block-ui/dist/angular-block-ui.min.js',
    'node_modules/angular-messages/angular-messages.min.js',
    'node_modules/angular-route/angular-route.min.js',
    'node_modules/angular-sanitize/angular-sanitize.min.js',
    'node_modules/angular-touch/angular-touch.min.js',
    'node_modules/angular-ui-router/build/angular-ui-router.min.js',
    'node_modules/bootstrap/dist/js/bootstrap.min.js'
  ])
    .bundle();

  return bundleStream
    .pipe(plumber())
    .pipe(source('vendor.min.js'))
    .pipe(gulp.dest(jsDistPath));
}

function htmlCopy() {
  return gulp.src('./src/**/*.html')
    .pipe(plumber())
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(distPath));
}

function dataCopy() {
  return gulp.src('./src/**/*.json')
    .pipe(plumber())
    .pipe(gulp.dest('./dist/db/'));
}

function distCleanUp() {
  return del(distPath);
}

function sassCompile() {
  return gulp.src('./src/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(rename('bundle.min.css'))
    .pipe(gulp.dest(cssDistPath));
}

function cssVendorBundle() {
  return gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css')
    .pipe(plumber())
    .pipe(cleanCSS())
    .pipe(rename('vendor.min.css'))
    .pipe(gulp.dest(cssDistPath));
}

function bootstrapFontsCopy() {
  return gulp.src('node_modules/bootstrap/dist/fonts/*.*')
    .pipe(plumber())
    .pipe(gulp.dest(path.join(distPath, 'fonts/')));
}

function debug() {
  return nodemon({
    script: './index.js',
    ext: 'js html',
    watch: ['./src/'],
    ignore: ['*.test.js'],
  })
    .on('restart', () => {
      return [
        'js:lint',
        'dist:cleanup',
        'js:bundle',
        'html:copy',
      ]
    });
  // .on('restart', () => {
  //   // jsLint();
  //   // distCleanUp();
  //   // jsBundle();
  //   // htmlCopy();

  //   console.log('server restarted!');
  // });
}
