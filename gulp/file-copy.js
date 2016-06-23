/**
 * Created by mars on 6/23/16.
 */

module.exports = function(gulp){
    gulp.task('copy', function() {
        gulp.src('./bower_components/angular/angular.min.js')
            .pipe(gulp.dest('./src/lib/angular'));

    });
};