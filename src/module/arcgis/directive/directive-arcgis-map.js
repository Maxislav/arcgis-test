/**
 * Created by Администратор on 6/29/16.
 */

(function(){
    'use strict';

    angular.module('arcgis')
        .directive('arcgisMap', arcgisMap);

    function arcgisMap(){
        return{
            restrict: 'AC',
            link: function(scope, el, attr){
                require([
                    "esri/Map",
                    "esri/views/MapView",
                    "dojo/domReady!"
                ], function(Map, MapView) {
                    var map = new Map({
                        basemap: "streets"
                    });

                    var view = new MapView({
                        container: el[0],  // Reference to the DOM node that will contain the view
                        map: map ,             // References the map object created in step 3
                        scale: 5000000,          // Sets the initial scale to 1:5,000,000
                        center: [-101.17, 21.78]
                    });
                });
            }
        }

    }
}());
