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
        var arrPoly = [];
        var arrMarkerOption = [];
        var map = null;


        return {
            getMarkerPosition: getMarkerPosition, //return promise.all [arr, map]
            iconCreate: iconCreate, //return L.icon
            setActive: setActive, //void
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
                        [48, 34]
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
            angular.forEach(arrMarkerOption, function(opt){
                if(opt!=position){
                    arrPoly.push(  L.polyline([ position, opt ], {snakingSpeed: 1000}).bindLabel('Even polylines can have labels.')      ) ;
                }
            });
            return arrPoly;
        }



        function iconCreate(scope, position){
            var _scope = scope.$new();
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
            arrIcon.push({
                position: position,
                icon: icon,
                scope: _scope
            });
            return icon;
        }


        /**
         *
         * @param scope
         */
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
            removePoly();
            angular.forEach(arrIcon, function(icon){
                icon.scope.cssClass = null
            })
        }
    }
}());