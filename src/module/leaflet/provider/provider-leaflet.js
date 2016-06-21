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
                };

            return{
                $get: function(){
                    return {
                        width: width,
                        height: height,
                        srcLib: srcLib
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
                }

            }
        })
}());