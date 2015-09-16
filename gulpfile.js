var browsersync = require('browser-sync'),
    gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    jshint = require('gulp-jshint'),
    plumber = require('gulp-plumber'),
    postcss = require('gulp-postcss'),
    sass = require('gulp-sass'),
    stylus = require('gulp-stylus'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    gutil = require('gulp-util'),
    lost = require('lost');


// BrowserSync
// gulp.task('browser-sync', function() {
//   browsersync({
//     server: {
//       baseDir: "./"
//     },
//     notify: false
//   });
// });

// BrowserSync
gulp.task('browser-sync', function() {
    browsersync.init({
        proxy: "127.0.0.1:2368"
    });
});


// Stylus
gulp.task('stylus', function() {
//  return gulp.src('src/css/**/*.styl')
  return gulp.src('stylus/**/*.styl')
    .pipe(plumber({
      errorHandler: function (err) {
        gutil.beep();
        console.log(err);
      }
    }))
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(postcss([
      lost()
    ]))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('ghost/content/themes/ghostworks-eliot/assets/css/'))
    .pipe(browsersync.reload({ stream: true }));
});


// Sass
gulp.task('sass', function() {
  return gulp.src('sass/**/*.*')
    .pipe(plumber({
      errorHandler: function (err) {
        gutil.beep();
        console.log(err);
      }
    }))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([
      lost()
    ]))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('ghost/content/themes/ghostworks-eliot/assets/css/'))
    .pipe(browsersync.reload({ stream: true }));
});


// JSHint
gulp.task('jshint', function() {
//  return gulp.src('src/js/**/*.js')
  return gulp.src('js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
//    .pipe(gulp.dest('dist/js/'))
    .pipe(gulp.dest('ghost/content/themes/ghostworks-eliot/assets/js/'))
});


gulp.watch('stylus/**/*.*', ['stylus', 'jshint']);

gulp.task('default', ['stylus', 'jshint', 'browser-sync']);
