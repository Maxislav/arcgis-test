/**
 * Created by mars on 6/22/16.
 */
const sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    livereload = require('gulp-livereload');

module.exports = function (gulp) {
    gulp.task('sass', function () {
        return gulp.src('./src/scss/index.scss')
            .pipe(sourcemaps.init())
            .pipe(sass().on('error', sass.logError))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('./build/css'))
            .pipe(livereload());
    });
};