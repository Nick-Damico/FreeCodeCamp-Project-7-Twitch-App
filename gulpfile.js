const gulp = require('gulp');
const sass = require('gulp-sass');
const useref = require('gulp-useref');
const uglify = require('gulp-uglify');
const gulpIf = require('gulp-if');
const babel = require('gulp-babel');
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const del = require('del');
const runSequence = require('run-sequence');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');

function browser_sync(done) {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })

  done();
};

function sass_compile(done) {
  return gulp.src('app/scss/**/*.sass')
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('app/styles'))
    .pipe(browserSync.reload({
      stream: true
    }))
};

function babel_js() {
  return gulp.src('app/scripts/*.js')
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(gulp.dest('app/scripts/scripts-bundled'))
};

function useref_compile() {
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest('dist'))
};

function minify_images() {
  return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
    .pipe(cache(imagemin()))
    .pipe(gulp.dest('dist/images'))
};

function clean_dist() {
  return del.sync('dist');
};

function cache_clear(callback) {
  return cache.clearAll(callback)
};

gulp.task('sass_css', sass_compile);
gulp.task('js', babel_js);
gulp.task('build', gulp.series(clean_dist, gulp.series(sass_compile, useref_compile, minify_images))); // Needs fixed
gulp.task('default', console.log('Functionality not defined')); // Needs to be defined

gulp.task('start_dev', gulp.series(browser_sync, sass_compile, babel_js, function(done) {
  gulp.watch('app/scss/**/*.sass', gulp.series(sass_compile));
  gulp.watch('app/index.html', browserSync.reload);
  gulp.watch('app/scripts/**/*.js', browserSync.reload);

  done();
}));
