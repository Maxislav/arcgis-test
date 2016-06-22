/**
 * Created by mars on 6/22/16.
 */
(function () {
    "use strict";
    angular.module('leaflet')
        .directive('mapContainer', mapContainer)

    mapContainer.$inject = [];

    function mapContainer() {
        return {
            restrict: 'AC',
            controller: 'controllerMapContainer',
            link: function (scope, el, attr, cntrl) {
                cntrl.setSize(el)
            }
        }
    }
}());