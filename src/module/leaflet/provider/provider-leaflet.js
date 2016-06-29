/**
 * Created by Администратор on 6/21/16.
 */
(function(){
    'use strict';

    angular
        .module('leaflet')
        .provider('l', function(){

            var width = null,
                height = null,
                startCenter = {
                    lat: null,
                    lng: null
                };

            return{
                $get: function(){
                    return {
                        startCenter: startCenter,
                        height: height,
                        width: width
                    }
                },
                setMapSize: function(obj){
                    width = obj.width || width;
                    height = obj.height || height;
                    return this;
                },
                setStartCenter: function(position){
                    startCenter.lat = position.lat;
                    startCenter.lng = position.lng;
                }
            }
        })
}());