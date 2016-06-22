/**
 * Created by mars on 6/22/16.
 */
const inject = require( 'gulp-inject' );

const srcDev = [
    'bower_components/angular/angular.js',

    'src/**/*/_*.js',
    'src/**/*/*.js',
    '!src/lib/**/*',

    'build/css/index.css'

];



module.exports = function(gulp){

    gulp.task( 'inject:dev', injectDev);

    function injectDev() {
        var options = {
            //addPrefix: '..',
            addRootSlash: false,
            transform: transform
        };
        var sources = gulp.src( srcDev );
        var target = gulp.src( './src/index.jade' );
        var dest = gulp.dest( './src/' );
        return target
            .pipe( inject( sources, options ) )
            .pipe( dest );
    }


};

function transform( filepath, file, i, length ) {
    if ( /.+\.css$/.test( filepath ) ) {
        return 'link(data-css-type=\'custom-theme\', rel=\'stylesheet\' href=\'' + filepath + '\')';
    }
    return inject.transform.apply( inject.transform, arguments );
}