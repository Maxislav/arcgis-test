/**
 * Created by mars on 6/22/16.
 */
(function () {
    'use strict';

    angular.module('leaflet')
        .factory('factoryLeafletMap', factoryLeafletMap);

    factoryLeafletMap.$inject = ['$q', 'factoryLoadScript', 'l'];

    function factoryLeafletMap($q, factoryLoadScript, l) {

        var map = null,
            mapEl = null,
            promise = null,
        deferGetMap = null;

        return {
            initMap: initMap, //foo promise,
            getMap: getMap, // foo promise
            map: map //l.map
        };

        function getMap(){
            if(!deferGetMap){
                deferGetMap = $q.defer();
            }
            return deferGetMap.promise
        }

        function initMap(el) {
            if (!promise) {
                promise = $q(function (resolve, reject) {
                    factoryLoadScript
                        .load()
                        .then(
                            function () {
                                map = L.map(el[0]).setView([l.startCenter.lat, l.startCenter.lng], 6);
                                mapEl = el;
                                L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
                                    maxZoom: 18,
                                    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                                    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                                    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
                                    id: 'mapbox.streets'
                                }).addTo(map);

                                if(!deferGetMap){
                                    deferGetMap = $q.defer();
                                }
                                deferGetMap.resolve(map);
                                resolve(map)
                            }
                        );
                })
            }
            return promise;
        }


    }
}());