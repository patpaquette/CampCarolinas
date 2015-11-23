/**
 * Created by patricepaquette on 12/17/2013.
 */

angular.module("common")
    .directive('lazyLoad', ['$window', '$q', function ($window, $q) {
        function load_script(src) {
            var s = document.createElement('script'); // use global document since Angular's $document is weak
            s.src = src;
            document.body.appendChild(s);
        }
        function lazyLoadApi(src) {
            var deferred = $q.defer();
            $window.initialize = function () {
                deferred.resolve();
            };
            // thanks to Emil Stenström: http://friendlybit.com/js/lazy-loading-asyncronous-javascript/
            if ($window.attachEvent) {
                $window.attachEvent('onload', function(){
                    load_script(src);
                });
            } else {
                $window.addEventListener('load', function(){
                    load_script(src);
                }, false);
            }
            return deferred.promise;
        }
        return {
            restrict: 'E',
            scope: {
                src: "@src"
            },
            link: function (scope, element, attrs) { // function content is optional
                // in this example, it shows how and when the promises are resolved
                if ($window.google && $window.google.maps) {

                } else {
                    lazyLoadApi().then(function () {
                        //console.log('promise resolved');
                        if ($window.google && $window.google.maps) {
                            //console.log('gmaps loaded');
                        } else {
                            //console.log('gmaps not loaded');
                        }
                    }, function () {
                        //console.log('promise rejected');
                    });
                }
            }
        };
    }]);