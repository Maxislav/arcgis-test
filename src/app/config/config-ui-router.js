/**
 * Created by mars on 6/29/16.
 */
(function(){

    angular.module('app')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise("/leaflet");

        $stateProvider
            .state('leaflet', {
                url: '/leaflet',
                templateUrl: 'src/app/template/leaflet.html',
                controller: 'controllerLeaflet',
                resolve: {
                    $loadScript: function(factoryLoadScript){
                        return factoryLoadScript.load();
                    }
                }
            })
            .state('arcgis', {
                url: '/arcgis',
                templateUrl: 'src/app/template/arcgis.html',
                controller: 'controllerArcgis',
                resolve: {
                    $loadScript: function(factoryLoadScript){
                        return factoryLoadScript.load();
                    }
                }
            })
    }
}());