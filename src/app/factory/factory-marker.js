/**
 * Created by Администратор on 6/22/16.
 */
(function(){
   'use strict';

    angular.module('app')
        .factory('factoryMarker',factoryMarker)

    factoryMarker.$inject = ['$timeout', '$q', 'factoryLeafletMap', '$compile'];
    function factoryMarker($timeout, $q, factoryLeafletMap, $compile){
        var arrMarker = [];

        return {
            getMarkerPosition: getMarkerPosition, //promise.all [arr, map]
            iconCreate: iconCreate, //L.icon
            arrMarker: arrMarker, //L.icon
            setActive: setActive //L.icon
        };

        function getMarkerPosition(){
            /**
             * Имитация погрузки координат с сервера
             */
            return $q.all([
                $timeout(function(){
                    return [
                        [49, 26],
                        [50, 29],
                        [48, 34]
                    ]
                }, 1000),
                factoryLeafletMap
                    .getMap()
            ])
        }

        function iconCreate(scope, position){
            var _scope = scope.$new();
            _scope.position = position;
            var template = '<div class="table" ng-click="clickMarker(position)" lf-marker ><div class="table-cell"><div ><div class="arc" ng-class="cssClass"></div></div></div></div>'
            var linkFn = $compile(template);
            var content = linkFn(_scope);
            var icon = L.divIcon({
                className: 'my-div-icon',
                html: content[0],
                iconSize: L.point(50, 50)
            });

            arrMarker.push({
                position: position,
                icon: icon,
                scope: _scope
            });


            return icon;
        }
        function setActive(scope){
            var i = 0;
            while(i<arrMarker.length){
                if(arrMarker[i].scope == scope){
                    arrMarker[i].scope.cssClass = 'active'
                }else{
                    arrMarker[i].scope.cssClass = null;
                }
                i++;
            }
            i = null;
        }

    }
}());