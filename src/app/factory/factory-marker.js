/**
 * Created by Администратор on 6/22/16.
 */
(function(){
   'use strict';

    angular.module('app')
        .factory('factoryMarker',factoryMarker)

    factoryMarker.$inject = ['$timeout', '$q', 'factoryLeafletMap'];
    function factoryMarker($timeout, $q, factoryLeafletMap){

        return {
            getMarkerPosition: getMarkerPosition, //promise.all [arr, map]
            iconCreate: iconCreate //L.icon
        };

        function getMarkerPosition(){
            /**
             * Имитация погрузки координат с сервера
             */
            return $q.all([
                $timeout(function(){
                    return [
                        [49, 26],
                        [50, 29],
                        [48, 34]
                    ]
                }, 1000),
                factoryLeafletMap
                    .getMap()
            ])
        }

        function iconCreate(){
            return L.divIcon({
                className: 'my-div-icon',
                html: '<div class="table"><div class="table-cell"><div ><div class="arc"></div></div></div></div>',
                iconSize: L.point(50, 50)
            });
        }

    }
}());