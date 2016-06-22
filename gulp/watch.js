/**
 * Created by mars on 6/22/16.
 */
const  livereload = require('gulp-livereload');

module.exports = function(gulp){
    "use strict";

    gulp.task('watch', function () {
        livereload.listen();
        gulp
            .watch('./src/*.jade', ['templates']);


        gulp
            .watch('./src/scss/*.scss', ['sass'])
    });

};
