/**
 * Created by maxim on 6/21/16.
 */
(function(){
    "use strict";

    angular.module('leaflet')
        .directive('lfMap', lfMap);

    lfMap.$inject = ['factoryLoadScript', 'l'];
    function lfMap(factoryLoadScript, l){
        return {
            restrict: 'A',
            controller: function(l){
                var _el = null;
                this.init = function(el){
                    _el = el;
                    setSize();
                };
                function setSize(){
                    _el[0].style.width = l.width;
                    _el[0].style.height = l.height;
                };
            },
            link: function(scope, el, attr, cntrl){
                factoryLoadScript.load();
                cntrl.init(el);
            }
        }
    }
}());
