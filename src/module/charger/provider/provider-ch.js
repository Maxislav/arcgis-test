/**
 * Created by mars on 6/29/16.
 */
(function(){
    angular.module('charger')
        .provider('ch', ch);

    function ch(){
        var srcLib = null;
        return{
            $get: function(){
                return {
                    srcLib: srcLib
                }
            },
            setSrcLib: function(src){
                srcLib = src;
                return this;
            }
        }
    }

}());