/**
 * Created by maxim on 6/21/16.
 */
(function () {
    angular.module('leaflet')
        .factory('factoryLoadScript', factoryLoadScript)

    factoryLoadScript.$inject = ['$http', '$q', 'l'];

    function factoryLoadScript($http, $q, l) {
        var defer = null;
        var i = 0

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

            var linkLabel = document.createElement('link');
            linkLabel.rel= "stylesheet";
            linkLabel.href = 'src/lib/leaflet/leaflet.label.css';
            document.head.appendChild(linkLabel);

            var script = document.createElement('script');
            var scriptLabel = document.createElement('script');
            var scriptSnakeAnim = document.createElement('script');

            scriptSnakeAnim.onload = function(){
                resolve();
            };

            scriptLabel.onload = function(){
                resolve();
            };



            script.onload = function(){
                document.head.appendChild(scriptLabel);
                document.head.appendChild(scriptSnakeAnim);
            };

            scriptSnakeAnim.src = 'src/lib/leaflet/leaflet-polyline-snake-anim.js';
            scriptLabel.src = 'src/lib/leaflet/leaflet.label.js';
            script.src = l.srcLib.js;
            document.head.appendChild(script);

        }

        function resolve(){
            i++;
            if(i==2){
                defer.resolve();
            }

        }

    }
}());