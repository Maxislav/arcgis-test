/**
 * Created by mars on 6/22/16.
 */
(function () {
    "use strict";
    angular.module('leaflet')
        .directive('mapContainer', mapContainer)

    mapContainer.$inject = ['l', 'factoryLoadScript', 'factoryLeafletMap'];
    function mapContainer(l, factoryLoadScript, factoryLeafletMap) {
        return {
            restrict: 'AC',
            controller: function ($scope) {
                var mapEl = null;
                var myMap = null;

                this.setSize = function (el) {
                    el[0].style.width = l.width;
                    el[0].style.height = l.height;
                };

                this.setMap = function (el) {
                    factoryLeafletMap.initMap(el)
                };

                this.getScope = function(){
                    return $scope;
                }



            },
            link: function (scope, el, attr, cntrl) {
                cntrl.setSize(el)
            }
        }
    }
}());