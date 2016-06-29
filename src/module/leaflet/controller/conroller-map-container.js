/**
 * Created by Администратор on 6/22/16.
 */
(function () {
    'use strict';

    angular.module('leaflet')
        .controller('controllerMapContainer', controllerMapContainer);


    controllerMapContainer.$inject = ['$scope', 'factoryLoadScript', 'factoryLeafletMap', 'l', 'serviceParams'];
    function controllerMapContainer($scope, factoryLoadScript, factoryLeafletMap, l, serviceParams) {
        var map, mapEl;

        this.initMap = function(el){

           // console.log(el == serviceParams.mapEl[0] )
            factoryLoadScript
                .load().then(function(){
                map = L.map(el[0], {closePopupOnClick: false}).setView([l.startCenter.lat, l.startCenter.lng], 6);
                map.$scope = $scope;
                mapEl = el;
                L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
                    maxZoom: 18,
                    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
                    id: 'mapbox.streets'
                }).addTo(map);
                factoryLeafletMap.initMap(map)
            });
            $scope.$on('$destroy', function(){
                factoryLeafletMap.destroyMap();
            })
        };

        this.getScope = function () {
            return $scope;
        };

    }
}());