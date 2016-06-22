/**
 * Created by mars on 6/22/16.
 */
(function () {
    "use strict";
    angular.module('leaflet')
        .directive('mapContainer', mapContainer)

    mapContainer.$inject = ['l'];

    function mapContainer(l) {
        return {
            restrict: 'AC',
            controller: 'controllerMapContainer',
            link: function (scope, el, attr, cntrl) {
                el[0].style.width = l.width;
                el[0].style.height = l.height;

            }
        }
    }
}());