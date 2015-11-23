/**
 * Created by patricepaquette on 2014-03-23.
 */

angular.module('campsearch', ["templates-app", "ng", "ngRoute", "ui.bootstrap", "ngSanitize", "rt.encodeuri", "common"])

  .config(function myAppConfig($routeProvider, $sceProvider) {
    jQuery.support.cors = true;
    $sceProvider.enabled(false);

    $routeProvider
      .when('/park-details/:parkName', {
        templateUrl: 'search/details.tpl.html',
        controller: 'parkDetailsCtrl',
        reloadOnSearch: false
      })
      .when('/', {
        redirectTo: function () {
          //console.log(window.location.href);
          var urlArray = window.location.href.split('/');
          var offset = 3;

          //console.log(urlArray);

          if (urlArray[offset] == "find-a-park") {
            if (urlArray[offset + 1] == "tents-allowed") {
              return "/by-state/ca?tags=" + JSON.stringify(["2433"]);
            }
            else if (urlArray[offset + 1] == "rent-a-cabin-or-onsite-rv") {
              return "/by-state/ca?tags=" + JSON.stringify(["2424"]);
            }
            else if (urlArray[offset + 1] == "wifi") {
              return "/by-state/ca?features=" + JSON.stringify(["17"]);
            }
            else if (urlArray[offset + 1] != '#') {
              var state = urlArray[offset + 1];
              var region = urlArray[offset + 2];

              if (region) {
                return "/by-region/" + state + "/" + region;
              }
              else if (state && state != '#') {
                return "/by-state/" + state;
              }
            }
          }
        },
        templateUrl: 'search/search.tpl.html',
        controller: "searchCtrl",
        reloadOnSearch: false
      })
      .when('/:search/:state/:region', {
        templateUrl: 'search/search.tpl.html',
        controller: "searchCtrl",
        reloadOnSearch: false
      })
      .when('/:search/:state', {
        templateUrl: 'search/search.tpl.html',
        controller: "searchCtrl",
        reloadOnSearch: false
      })
      .otherwise('/');

  })

  .run(function ($rootScope, $location) {
    /*$rootScope.$on('$routeChangeSuccess', function () {
     var rv = -1; // Return value assumes failure.
     if (navigator.appName == 'Microsoft Internet Explorer')
     {
     var ua = navigator.userAgent;
     var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
     if (re.exec(ua) != null)
     rv = parseFloat( RegExp.$1 );
     }

     if (navigator.appName == 'Microsoft Internet Explorer' && rv < 10) {
     $location.path("/browser-support");
     }
     })*/
  })

  .controller('AppCtrl', function () {
  })
;