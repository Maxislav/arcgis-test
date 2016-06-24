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
            load: load // promise
        };

        function load() {
            if (!defer) {
                defer = $q.defer();
                create();
            }
            return defer.promise;
        }


        function loadSync(arr, callback){
            if(arr.length){
                loadAsync(arr[0], function(){
                    arr.splice(0,1);
                    loadSync(arr, callback)
                });
            }else {
                callback && callback();
            }
        }

        function loadAsync(arr, callback){
            var countNeeded = arr.length, c = 0;
            angular.forEach(arr, function(a, i){
                if(angular.isObject(a)){
                    a = a.js
                }
                switch (true){
                    case /^.+\.css$/.test(a):
                        var link = document.createElement('link');
                        link.rel= "stylesheet";
                        link.href = a;
                        document.head.appendChild(link);
                        resolve();
                        break;
                    case /^.+\.js$/.test(a):
                        (function(){
                            var script = document.createElement('script');
                            script.onload = function(){
                                resolve();
                            };
                            script.src = a;
                            document.head.appendChild(script);
                        }(i));
                        break
                }
            });
            function resolve(){
                c++;
                if(countNeeded == c){
                    callback && callback();
                }
            }
        }


        function getCssHref(arr, cssHref){
            var _cssHref = cssHref || [];
            angular.forEach(arr, function(p){
                if(angular.isArray(p)){
                    _cssHref =  getCssHref(p, _cssHref)
                }else{
                    p.css && _cssHref.push(p.css);
                }
            });
            return _cssHref
        }

        function create(){
            loadAsync(getCssHref(l.srcLib), function(){

            });
            loadSync(l.srcLib, success);
            function success(){
                defer.resolve();
            }
        }
    }
}());