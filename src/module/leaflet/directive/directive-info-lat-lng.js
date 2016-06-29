/**
 * Created by mars on 6/22/16.
 */
(function(){
    'use strict';

    angular.module('leaflet')
        .directive('leafletInfoLatLng', infoLatLng);

    infoLatLng.$inject =['factoryMapEvents'];
    function infoLatLng(factoryMapEvents){
        return {
            restrict: 'AC',
            templateUrl: 'src/module/leaflet/template/info-lat-lng.html',
            require: '^mapContainer',
            link: function(scope, el, attr, cntrl){
                factoryMapEvents.initMoveEvent(cntrl.getScope());
                scope.position = factoryMapEvents.mousePosition
            }
        }
    }
}());