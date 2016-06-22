/**
 * Created by Администратор on 6/22/16.
 */
(function () {
    'use strict';

    angular.module('leaflet')
        .controller('controllerMapContainer', controllerMapContainer);


    controllerMapContainer.$inject = ['$scope', 'factoryLeafletMap', 'l'];
    function controllerMapContainer($scope, factoryLeafletMap, l) {
        this.getScope = function () {
            return $scope;
        };
        factoryLeafletMap
            .getMap()
            .then(setMarkers);


        function setMarkers(map) {
            var myIcon = L.divIcon({
                className: 'my-div-icon',
                html: '<div class="table"><div class="table-cell"><div ><div class="arc"></div></div></div></div>',
                iconSize: L.point(50, 50)
            });
            var marker = L.marker([50.25, 32.33], {icon: myIcon});
            marker.addTo(map)
        }
    }
}());