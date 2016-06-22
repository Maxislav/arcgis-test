/**
 * Created by Администратор on 6/22/16.
 */
(function(){
   'use strict';

    angular.module('app')
        .factory('factoryMarker',factoryMarker)

    factoryMarker.$inject = ['$timeout', '$q', 'factoryLeafletMap', '$compile'];
    function factoryMarker($timeout, $q, factoryLeafletMap, $compile){
        var arrIcon = [];

        return {
            getMarkerPosition: getMarkerPosition, //promise.all [arr, map]
            iconCreate: iconCreate, //L.icon
            setActive: setActive, //L.icon
            arrIcon: arrIcon,
            reset: reset //foo
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

            arrIcon.push({
                position: position,
                icon: icon,
                scope: _scope
            });


            return icon;
        }
        function setActive(scope){
            var i = 0;
            while(i<arrIcon.length){
                if(arrIcon[i].scope == scope){
                    arrIcon[i].scope.cssClass = 'active'
                }else{
                    arrIcon[i].scope.cssClass = null;
                }
                i++;
            }
            i = null;
        }

        function reset(){
            var i = 0;

            while(i<arrIcon.length){
                arrIcon[i].scope.cssClass = null;
                i++;
            }
            i = null;
        }
    }
}());