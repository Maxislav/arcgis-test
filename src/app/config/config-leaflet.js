/**
 * Created by Администратор on 6/21/16.
 */
(function () {

    angular.module('app')
        .config(function (lProvider) {
            lProvider
                .setSrcLib({
                    css: 'src/lib/leaflet/leaflet.css',
                    js: 'src/lib/leaflet/leaflet-src.js'
                })
                .setMapSize({
                    width: '600px',
                    height: '480px'
                })
                .setStartCenter({
                    lat: 50.1,
                    lng: 30.2
                })

        })

}());