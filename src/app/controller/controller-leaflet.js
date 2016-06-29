/**
 * Created by Администратор on 6/22/16.
 */
(function () {
    'use strict';

    angular.module('app')
        .controller('controllerLeaflet', controllerLeaflet);

    controllerLeaflet.$inject = ['$scope','factoryMarker', 'factoryMapEvents', 'serviceParams'];

    function controllerLeaflet( $scope, factoryMarker, factoryMapEvents, serviceParams) {
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
                mopOnMouseMove();
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
            factoryMapEvents.mapOnClick(function(e){
                if(!angular.element(e.originalEvent.toElement).hasClass('arc')){
                    factoryMarker.reset()
                }
            });
        }

        function mopOnMouseMove(){
            factoryMapEvents.mapOnMouseMove(function(e){
                serviceParams.mousePosition.lat =  e.latlng.lat;
                serviceParams.mousePosition.lng =  e.latlng.lng
            })
        }

        $scope.$on('$destroy', function(){
            serviceParams.mousePosition.lat =  null;
            serviceParams.mousePosition.lng =  null;
            factoryMarker.destroyMarker();
            factoryMapEvents.destroy();
        })
    }
}());