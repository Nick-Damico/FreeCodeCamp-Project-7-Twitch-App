const gulp = require('gulp');
const sass = require('gulp-sass');
const useref = require('gulp-useref');
const uglify = require('gulp-uglify');
const gulpIf = require('gulp-if');
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const del = require('del');
const runSequence = require('run-sequence');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');

// EXAMPLE OF GULP TASK FORMAT
  // gulp.task('task-name', function () {
  //   return gulp.src('source-files') // Get source files with gulp.src
  //     .pipe(aGulpPlugin()) // Sends it through a gulp plugin
  //     .pipe(gulp.dest('destination')) // Outputs the file in the destination folder
  // })

// Gulp watch syntax
  // gulp.watch('files-to-watch', ['tasks', 'to', 'run']);

// Multiply Watch Tasks
  // gulp.task('watch', function(){
  //   gulp.watch('app/scss/**/*.scss', ['sass']);
  //   // Other watchers
  // })

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  });
});

gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.sass')
             .pipe(sass())
             .pipe(autoprefixer({
               browsers: ['last 2 versions'],
               cascade: false
             }))
             .pipe( gulp.dest('app/styles') )
             .pipe(browserSync.reload({
               stream: true
             }))
});

gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    // Minifies only if it's a JavaScript file
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

gulp.task('imagesmin', function() {
  return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
             .pipe( cache(imagemin()) )
             .pipe(gulp.dest('dist/images'))
});

gulp.task('clean:dist', function() {
  return del.sync('dist');
});

gulp.task('cache:clear', function (callback) {
return cache.clearAll(callback)
});

gulp.task('watch', ['browserSync', 'sass'], function() {
  gulp.watch('app/scss/**/*.sass', ['sass']);
  gulp.watch('app/index.html', browserSync.reload);
  gulp.watch('app/scripts/**/*.js', browserSync.reload);
});

gulp.task('build', function (cb){
  runSequence('clean:dist',
    [`sass`, `useref`, `imagesmin`],
    cb
  )
  console.log('Building files');
});

gulp.task('default', function(cb) {
  runSequence(
    ['sass', 'browserSync', 'watch'],
    cb
  )
});
