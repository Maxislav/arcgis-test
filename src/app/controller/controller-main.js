/**
 * Created by Администратор on 6/22/16.
 */
(function () {
    'use strict';

    angular.module('app')
        .controller('controllerMain', controllerMain);

    controllerMain.$inject = ['$scope','factoryMarker', 'factoryLeafletMap'];

    function controllerMain( $scope, factoryMarker, factoryLeafletMap) {
        var map = null;
        var arrPosition = null;

        var scope = this;

        /**
         * Инициализация после загрузки скриптов.
         */
        factoryMarker.getMarkerPosition()
            .then(function (d) {
                arrPosition = d[0];
                map = d[1];
                mamOnClick();
                setMarkers.apply(scope, d);
            });


        $scope.drawPoly = function(scope){
            angular.forEach(factoryMarker.getPoly(scope), function(poly){
                poly.addTo(map).snakeIn()
            });
        };

        function setMarkers(arr, map) {
            angular.forEach(factoryMarker.getMarker($scope,arr), function(marker){
                marker.addTo(map)
            })
        }

        function mamOnClick(){
            factoryLeafletMap.mapOnClick(function(e){
                if(!angular.element(e.originalEvent.toElement).hasClass('arc')){
                    factoryMarker.reset()
                }
            });
        }
    }
}());