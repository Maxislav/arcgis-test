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
            restrict: 'AC',
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

                this.setMap = function (){
                    var mymap = L.map(_el[0]).setView([l.startCenter.lat, l.startCenter.lng], 6);

                    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
                        maxZoom: 18,
                        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
                        id: 'mapbox.streets'
                    }).addTo(mymap);
                }
            },
            link: function(scope, el, attr, cntrl){
                factoryLoadScript.load().then(function(){
                    cntrl.setMap();
                });
                cntrl.init(el);
            }
        }
    }
}());
