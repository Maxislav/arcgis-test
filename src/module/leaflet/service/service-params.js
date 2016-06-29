/**
 * Created by mars on 6/29/16.
 */
(function(){
  angular.module('leaflet')
      .service('serviceParams', serviceParams)
    function serviceParams(){
        this.mapEl = null;
    }
}());