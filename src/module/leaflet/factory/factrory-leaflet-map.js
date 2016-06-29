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
            deferGetMap = null,
            scopeMap = null;

        return {
            destroyMap: destroyMap,
            getScope: getScope, // return scopeMAp
            initMap: initMap, //foo promise,
            getMap: getMap, // foo promise
            map: map //l.map
        };

        function getMap() {
            if(!deferGetMap){
                deferGetMap = $q.defer();
            }
            return deferGetMap.promise
        }

        function initMap(map) {
            deferGetMap.resolve(map);
        }

        function destroyMap(){
            deferGetMap = null;
        }

        function getScope() {
            return scopeMap;
        }
    }
}());