/**
 * Created by mars on 6/22/16.
 */
(function () {
    "use strict";
    angular.module('leaflet')
        .directive('mapContainer', mapContainer)

    mapContainer.$inject = ['l', 'factoryLoadScript'];
    function mapContainer(l, factoryLoadScript) {
        return {
            restrict: 'AC',
            controller: function () {
                var mapEl = null;
                var myMap = null;

                this.setSize = function (el) {
                    el[0].style.width = l.width;
                    el[0].style.height = l.height;
                };

                this.setMap = function (el) {
                    factoryLoadScript
                        .load()
                        .then(
                            function () {
                                myMap = L.map(el[0]).setView([l.startCenter.lat, l.startCenter.lng], 6);
                                mapEl = el;
                                L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
                                    maxZoom: 18,
                                    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                                    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                                    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
                                    id: 'mapbox.streets'
                                }).addTo(myMap);
                            }
                        );

                };

            },
            link: function (scope, el, attr, cntrl) {
                cntrl.setSize(el)
            }
        }
    }
}());