/**
 * Created by mars on 6/22/16.
 */

const jade = require('gulp-jade'),
    livereload = require('gulp-livereload');

module.exports = function(gulp){
    gulp.task('templates', function () {
        var YOUR_LOCALS = {};

        return gulp.src('./src/*.jade')
            .pipe(jade({
                locals: YOUR_LOCALS,
                pretty: true
            }))
            .pipe(gulp.dest('./src/'))
            .pipe( livereload() )
    });
};
