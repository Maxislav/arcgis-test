/**
 * Created by maxim on 6/21/16.
 */
(function () {
    "use strict";

    angular.module('leaflet')
        .directive('lfMap', lfMap);

    lfMap.$inject = [];

    function lfMap() {
        return {
            restrict: 'AC',
            require: '^mapContainer',
            link: function (scope, el, attr, cntrl) {
                cntrl.setMap(el);
                el[0].style.width = '100%';
                el[0].style.height = '100%';
            }
        }
    }
}());
