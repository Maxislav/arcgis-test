/**
 * Created by mars on 6/29/16.
 */
(function(){

    angular.module('app')
        .config(config);

    config.$inject = ['chProvider'];
    function config(chProvider){

        chProvider.setSrcLib(
            /**
             * подгрузка скриптов библиотеки
             */
            [
                //синхронно
                [

                    {
                        css: 'src/lib-dynamic/leaflet/leaflet.css',
                        js: 'src/lib-dynamic/leaflet/leaflet-src.js'
                    }

                ],
                [
                    //асинхронно
                    {
                        js: 'src/lib-dynamic/leaflet/leaflet-polyline-snake-anim.js'
                    },
                    {
                        js: 'src/lib-dynamic/leaflet/leaflet.label.js',
                        css: 'src/lib-dynamic/leaflet/leaflet.label.css'
                    },
                    {
                        js: 'src/lib-dynamic/arcgis/arcgis.js',
                        css: 'src/lib-dynamic/arcgis/main.css'
                    }
                ]
            ]
        )
    }

}());