/**
 * Created by Администратор on 6/21/16.
 */
(function(){
    'use strict';

    angular
        .module('leaflet')
        .provider('l', function(){

            var width = null;
            var height= null;
            return{
                $get: function(){
                    return {
                        width: width,
                        height: height
                    }
                },
                setMapSize: function(obj){
                    width = obj.width || width;
                    height = obj.height || height;
                }

            }
        })
}());