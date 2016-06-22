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

                var myIcon = L.divIcon({
                    className: 'my-div-icon',
                    html: '<duv class="table"><div class="table-cell"><div ><div class="arc"></div></div></div></duv>',
                    iconSize: L.point(50, 50)
                });

                var marker = L.marker([50.25, 32.33], {icon: myIcon})
                marker.addTo(map)

            })
        }

        return {
            initMoveEvent: initMoveEvent,
            mousePosition: mousePosition
        }


    }

}());