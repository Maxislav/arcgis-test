/**
 * Created by mars on 6/22/16.
 */
(function () {
    'use strict';

    angular.module('leaflet')
        .factory('factoryMapEvents', factoryMapEvents);

    factoryMapEvents.$inject = ['factoryLeafletMap'];

    function factoryMapEvents(factoryLeafletMap) {

        var mousePosition = {
            lat: null,
            lng: null
        };

        function initMoveEvent(scope) {
            factoryLeafletMap.getMap().then(function (map) {
                map.on('mousemove', function (e) {
                    mousePosition.lat = e.latlng.lat;
                    mousePosition.lng = e.latlng.lng;
                    scope.$digest()
                });



            })
        }

        return {
            initMoveEvent: initMoveEvent,
            mousePosition: mousePosition
        }


    }

}());