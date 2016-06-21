/**
 * Created by maxim on 6/21/16.
 */
(function () {
    angular.module('leaflet')
        .factory('factoryLoadScript', factoryLoadScript)

    factoryLoadScript.$inject = ['$http', '$q'];

    function factoryLoadScript($http, $q) {
        var defer = null;

        return {
            load: load
        };

        function load() {
            if (!defer) {
                defer = $q.defer();
                create();
            }
            return defer.promise;
        }
        function create(){
            var link = document.createElement('link');
            link.rel= "stylesheet";
            link.href = '../src/lib/leaflet/leaflet.css';
            document.head.appendChild(link)
        }
    }
}());