/**
 * Created by mars on 6/22/16.
 */
(function(){
    'use strict';

    angular.module('leaflet')
        .directive('infoLatLng', infoLatLng)

    function infoLatLng(){
        return {
            restrict: 'AC',
            templateUrl: 'src/module/leaflet/template/info-lat-lng.html',
            link: function(scope, el, attr){

            }
        }
    }
}());