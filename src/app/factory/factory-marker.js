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
                        {
                            name: 'Lviv',
                            latLng :   [49.8, 24.00]
                        },
                        {
                            name: 'Kiev',
                            latLng: [50.5, 30.5]
                        },
                        {
                            name: 'Harkov',
                            latLng: [50.2, 36]
                        },
                        {
                            name: 'Zaporozhie',
                            latLng: [47.8, 35.2]
                        }
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

        function getPoly(scope){
            removePoly();
            angular.forEach(arrMarker, function(marker){
                if(marker.scope!=scope){
                    arrPoly.push(  L.polyline([ scope.position, marker.position ], {snakingSpeed: 1000}).bindLabel(scope.name+" -> "+marker.scope.name)      ) ;
                }
            });
            return arrPoly;
        }

        function getMarker(scope, arrOts){

            angular.forEach(arrOts, function(opt){
                var _scope  = scope.$new();
                _scope.name = opt.name;
                var icon = iconCreate(_scope, opt.latLng);

                var marker = L.marker(opt.latLng, {icon: icon});
                marker.bindPopup(markerPopupCreate(_scope));

                //todo лабел у маркеров
                //marker.bindLabel('<p>A sweet static label!</p>', { direction: 'top' });
                marker.position = opt.latLng;
                marker.scope = _scope;
                arrMarker.push(marker);
            });
            return arrMarker
        }

        function markerPopupCreate(_scope){

            var template = '<div>{{name}}</div>'
            var linkFn = $compile(template);
            var content = linkFn(_scope);
            return content[0]

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
                iconSize: L.point(25, 25)
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