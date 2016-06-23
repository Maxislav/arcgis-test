/**
 * Created by Администратор on 6/22/16.
 */
(function () {
    'use strict';

    angular.module('app')
        .controller('controllerMain', controllerMain);

    controllerMain.$inject = ['$scope','factoryMarker'];

    function controllerMain( $scope, factoryMarker) {
        var map = null;
        var arrPosition = null;

        var scope = this;

        factoryMarker.getMarkerPosition()
            .then(function (d) {
                arrPosition = d[0];
                map = d[1];
                matOnClick();
                setMarkers.apply(scope, d);
            });

        function setMarkers(arr, map) {
            angular.forEach(factoryMarker.getMarker($scope,arr), function(marker){
                marker.addTo(map)
            })
        }

        function drawPoly(){

        }

        $scope.drawPoly = function(position){

            angular.forEach(factoryMarker.getPoly(position), function(poly){
                poly.addTo(map).snakeIn()
            });

        };

        function matOnClick(){
            map.on('click', function(e){
                if(!angular.element(e.originalEvent.toElement).hasClass('arc')){
                    factoryMarker.reset()
                }
            })
        }
    }
}());