/**
 * Created by mars on 6/21/16.
 */

const gulp = require('gulp');

/**
 * Сборка jade
 */
require('./gulp/templates.js')(gulp);

/**
 * Слежение за изменениями
 */
require('./gulp/watch.js')(gulp);


require('./gulp/sass.js')(gulp);


gulp.task('default', ['templates', 'sass'], function(){
    gulp.start('watch')
});