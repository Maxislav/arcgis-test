/**
 * Created by Администратор on 6/22/16.
 */
(function(){
   'use strict';

    angular.module('leaflet')
       .controller('controllerMapContainer', controllerMapContainer);


    controllerMapContainer.$inject = ['$scope', 'factoryLeafletMap', 'l'];
     function controllerMapContainer($scope, factoryLeafletMap, l){
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
     }
}());