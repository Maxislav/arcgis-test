/**
 * Created by Администратор on 6/22/16.
 */
(function () {
    'use strict';

    angular.module('leaflet')
        .controller('controllerMapContainer', controllerMapContainer);


    controllerMapContainer.$inject = ['$scope', 'factoryLeafletMap', 'l'];
    function controllerMapContainer($scope, factoryLeafletMap, l) {
        this.getScope = function () {
            return $scope;
        };

    }
}());