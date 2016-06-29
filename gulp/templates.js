/**
 * Created by mars on 6/22/16.
 */

const jade = require('gulp-jade'),
    livereload = require('gulp-livereload'),
    merge = require( 'merge-stream' );

module.exports = function(gulp){
    gulp.task('templates', function () {
        var YOUR_LOCALS = {};
        var a = gulp.src('./src/index.jade')
            .pipe(jade({
                locals: YOUR_LOCALS,
                pretty: true
            }))
            .pipe(gulp.dest('./'))
            .pipe( livereload() ),

            b = gulp.src('./src/module/leaflet/template-jade/**/*.jade')
                .pipe(jade({
                    locals: YOUR_LOCALS,
                    pretty: true
                }))
                .pipe(gulp.dest('./src/module/leaflet/template/'))
                .pipe( livereload()),

            c =  gulp.src('./src/app/template-jade/**/*.jade')
                .pipe(jade({
                    locals: YOUR_LOCALS,
                    pretty: true
                }))
                .pipe(gulp.dest('./src/app/template/'))
                .pipe( livereload());

        return  merge(a, b, c)
    });
};
