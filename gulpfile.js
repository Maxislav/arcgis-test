/**
 * Created by mars on 6/21/16.
 */

const gulp = require('gulp'),
    jade = require('gulp-jade'),
    livereload = require('gulp-livereload');


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

gulp.task('watch', function () {
    livereload.listen();
    gulp.watch('./src/*.jade', ['templates']);
});

gulp.task('default', ['templates'], function(){
    gulp.start('watch')
});