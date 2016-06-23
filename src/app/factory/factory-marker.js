/**
 * Created by Администратор on 6/22/16.
 */
(function(){
   'use strict';

    angular.module('app')
        .factory('factoryMarker',factoryMarker);

    factoryMarker.$inject = ['$timeout', '$q', 'factoryLeafletMap', '$compile'];
    function factoryMarker($timeout, $q, factoryLeafletMap, $compile){
        var arrIcon = [];
        var arrMarker = [];
        var arrPoly = [];
        var arrMarkerOption = [];
        var map = null;


        return {
            getMarkerPosition: getMarkerPosition, //return promise.all [arr, map]
            iconCreate: iconCreate, //return L.icon
            setActive: setActive, //void
            getMarker: getMarker, //return [L.marker, ...]
            arrIcon: arrIcon, // [L.icon, ...]
            getPoly: getPoly, //return [L.polyline, ...]
            reset: reset // void
        };

        function getMarkerPosition(){

            return $q.all([
                $timeout(function(){
                    /**
                     * Имитация подгрузки координат с сервера
                     */
                    var response = [
                        [49, 26],
                        [50, 29],
                        [48, 34],
                        [50, 33]
                    ];
                    for(var i=0; i<response.length; i++){
                        arrMarkerOption.push(response[i])
                    }
                    return arrMarkerOption
                }, 1000),
                factoryLeafletMap
                    .getMap().then(function(_map){
                    map = _map;
                    return _map
                })
            ])
        }

        function removePoly(){
            angular.forEach(arrPoly, function(poly){
                map.removeLayer(poly)
            });
            arrPoly.length = 0;
        }

        function getPoly(position){
            removePoly();
            angular.forEach(arrMarker, function(marker){
                if(marker.position!=position){
                    arrPoly.push(  L.polyline([ position, marker.position ], {snakingSpeed: 1000}).bindLabel('Even polylines can have labels.')      ) ;
                }
            });
            return arrPoly;
        }

        function getMarker(scope, arrPosition){

            angular.forEach(arrPosition, function(position){
                var _scope  = scope.$new();
                var icon = iconCreate(_scope, position);

                var marker = L.marker(position, {icon: icon});

                //todo лабел у маркеров
                //marker.bindLabel('<p>A sweet static label!</p>', { direction: 'top' });
                marker.position = position;
                marker.scope = _scope;
                arrMarker.push(marker);
            });
            return arrMarker
        }


        function iconCreate(_scope, position){
            _scope.position = position;
            var template = '<div class="table" ng-click="clickMarker(position)" lf-icon >' +
                '<div class="table-cell">' +
                '<div ><div class="arc" ng-class="cssClass"></div></div>' +
                '</div></div>';
            var linkFn = $compile(template);
            var content = linkFn(_scope);
            var icon = L.divIcon({
                className: 'my-div-icon',
                html: content[0],
                iconSize: L.point(50, 50)
            });
            return icon;
        }


        /**
         *
         * @param scope
         */
        function setActive(scope){
           angular.forEach(arrMarker, function(marker){
               if(marker.scope == scope){
                   marker.scope.cssClass = 'active'
               }else{
                   marker.scope.cssClass = null
               }
           });
        }

        function reset(){
            removePoly();
            angular.forEach(arrMarker, function(marker){
                marker.scope.cssClass = null
            })
        }
    }
}());