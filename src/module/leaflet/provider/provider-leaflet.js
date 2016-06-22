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

                srcLib = {
                    js: null,
                    css: null
                },
                startCenter = {
                    lat: null,
                    lng: null
                };

            return{
                $get: function(){
                    return {
                        startCenter: startCenter,
                        height: height,
                        srcLib: srcLib,
                        width: width
                    }
                },
                setMapSize: function(obj){
                    width = obj.width || width;
                    height = obj.height || height;
                    return this;
                },
                setSrcLib: function(src){
                    srcLib.js = src.js;
                    srcLib.css = src.css;
                    return this;
                },
                setStartCenter: function(position){
                    startCenter.lat = position.lat;
                    startCenter.lng = position.lng;
                }
            }
        })
}());