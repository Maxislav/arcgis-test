/**
 * Created by maxim on 6/21/16.
 */
(function(){
    "use strict";

    angular.module('leaflet')
        .directive('lfMap', lfMap);

    lfMap.$inject = ['factoryLoadScript'];
    function lfMap(factoryLoadScript){




        return {
            restrict: 'A',
            controller: function(){

            },
            link: function(scope, el, attr, cntrl){
                factoryLoadScript.load()
            }
        }
    }
}());
