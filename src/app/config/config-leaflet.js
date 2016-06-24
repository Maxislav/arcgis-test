/**
 * Created by Администратор on 6/21/16.
 */
(function () {

    angular.module('app')
        .config(function (lProvider) {
            lProvider
                .setSrcLib(
                    /**
                     * подгрузка скриптов библиотеки
                    */
                    //синхронно
                    [

                        [
                            {
                                css: 'src/lib/leaflet/leaflet.css',
                                js: 'src/lib/leaflet/leaflet-src.js'
                            }
                        ],
                        [
                            //асинхронно
                            {
                                js: 'src/lib/leaflet/leaflet-polyline-snake-anim.js'
                            },
                            {
                                js: 'src/lib/leaflet/leaflet.label.js',
                                css: 'src/lib/leaflet/leaflet.label.css'
                            }
                        ]
                    ]

                )
                .setMapSize({
                    width: '1000px',
                    height: '500px'
                })
                .setStartCenter({
                    lat: 50.1,
                    lng: 30.2
                })

        })

}());