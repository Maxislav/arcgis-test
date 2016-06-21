/**
 * Created by maxim on 6/21/16.
 */
(function () {
    angular.module('leaflet')
        .factory('factoryLoadScript', factoryLoadScript)

    factoryLoadScript.$inject = ['$http', '$q', 'l'];

    function factoryLoadScript($http, $q, l) {
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
            link.href = l.srcLib.css;
            document.head.appendChild(link);

            var script = document.createElement('script');
            script.onload = function(){
                defer.resolve();
            };
            script.src = l.srcLib.js;
            document.head.appendChild(script);

        }
    }
}());