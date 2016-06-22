/**
 * Created by Администратор on 6/22/16.
 */
(function () {
    'use strict';

    angular.module('app')
        .controller('controllerMain', controllerMain);
    controllerMain.$inject = ['$scope','factoryMarker'];

    function controllerMain( $scope, factoryMarker) {


        var scope = this;

        factoryMarker.getMarkerPosition()
            .then(function (d) {
                setMarkers.apply(scope, d);
            });

        function setMarkers(arr, map) {

            for (var i = 0; i < arr.length; i++) {
                var icon = factoryMarker.iconCreate($scope,arr[i]);
                var marker = L.marker(arr[i], {icon: icon});
                marker.addTo(map)
            }


        }


    }
}());