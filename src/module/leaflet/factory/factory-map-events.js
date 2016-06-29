/**
 * Created by mars on 6/22/16.
 */
(function () {
    'use strict';

    angular.module('leaflet')
        .factory('factoryMapEvents', factoryMapEvents);

    factoryMapEvents.$inject = ['factoryLeafletMap'];

    function factoryMapEvents(factoryLeafletMap) {

        var mousePosition = {
                lat: null,
                lng: null
            },
            map,
            objFooEvent = {},
            idFoo = 0;

        function initMoveEvent(scope) {
            factoryLeafletMap.getMap().then(function (_map) {
                _map.on('mousemove', function (e) {
                    mousePosition.lat = e.latlng.lat;
                    mousePosition.lng = e.latlng.lng;
                    _map.$scope.$digest()
                });

            })
        }

        return {
            initMoveEvent: initMoveEvent,
            mousePosition: mousePosition,
            mapOnClick: mapOnClick, //void
            maOffClick: maOffClick // void
        };


        function mapOnClick(foo) {
            foo.__id = idFoo;
            objFooEvent[idFoo] = foo;
            idFoo++;
            var click = mapClick.bind({
                foo: foo
            });
            factoryLeafletMap.getMap()
                .then(function(map){
                    map.on('click', click);
                });
        }

        function maOffClick(foo) {
            factoryLeafletMap.getMap().then(function(map){
                if (foo) {
                    map.off('click', objFooEvent[foo.__id]);
                    delete objFooEvent[foo.__id]
                } else {
                    map.off('click');
                }
            })
        }

        function mapClick(e) {
            this.foo && this.foo(e);
            factoryLeafletMap.getMap().then(function(map){

            })
        }
    }

}());