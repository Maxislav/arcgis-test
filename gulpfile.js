/**
 * Created by mars on 6/21/16.
 */

const gulp = require('gulp'),
    gulpsync = require('gulp-sync')(gulp);

/**
 * Сборка jade
 */
require('./gulp/templates.js')(gulp);

/**
 * Слежение за изменениями
 */
require('./gulp/watch.js')(gulp);

/**
 * Сборка css
 */
require('./gulp/sass.js')(gulp);

/**
 * автоматический инжект
 */
require('./gulp/inject.js')(gulp);

/**
 * копирование
 */
require('./gulp/file-copy.js')(gulp);


gulp.task('default', gulpsync.sync([
    'copy',
    'inject:dev',
    [
        'templates',
        'sass'
    ],
    'watch'
]));
