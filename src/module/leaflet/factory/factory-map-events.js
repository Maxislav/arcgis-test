/**
 * Created by mars on 6/22/16.
 */
(function () {
    'use strict';

    angular.module('leaflet')
        .factory('factoryMapEvents', factoryMapEvents);

    factoryMapEvents.$inject = ['factoryLeafletMap'];

    function factoryMapEvents(factoryLeafletMap) {

        var objFooEvent = {},
            idFoo = 0;

        return {

            mapOnMouseMove: mapOnMouseMove, //void
            mapOffClick: mapOffClick, // void
            mapOnClick: mapOnClick, //void
            destroy: destroy //void
        };


        function mapOnMouseMove(foo){
            foo.__id = idFoo;
            objFooEvent[idFoo] = foo;
            idFoo++;
            factoryLeafletMap.getMap()
                .then(function(map){
                    var mousemove = mouseMove.bind({
                        foo: foo,
                        $scope: map.$scope
                    });
                    map.on('mousemove', mousemove);
                });
        }

        function mapOffMouseMove(foo){
            factoryLeafletMap.getMap().then(function(map){
                if (foo) {
                    map.off('mousemove', objFooEvent[foo.__id]);
                    delete objFooEvent[foo.__id]
                } else {
                    map.off('mousemove');
                }
            })
        }

        function  mouseMove(e){
            this.foo && this.foo(e);
            this.$scope && this.$scope.$digest();
        }

        function mapOnClick(foo) {
            foo.__id = idFoo;
            objFooEvent[idFoo] = foo;
            idFoo++;

            factoryLeafletMap.getMap()
                .then(function(map){
                    var click = mapClick.bind({
                        foo: foo,
                        $scope: map.$scope
                    });
                    map.on('click', click );
                });
        }

        function mapOffClick(foo) {
            factoryLeafletMap.getMap().then(function(map){
                if (foo) {
                    map.off('click', objFooEvent[foo.__id]);
                    delete objFooEvent[foo.__id]
                } else {
                    map.off('click');
                }
            })
        }

        function destroy(){
            mapOffClick();
            mapOffMouseMove();
        }

        function mapClick(e) {
            this.foo && this.foo(e);
            this.$scope && this.$scope.$digest();
        }
    }

}());