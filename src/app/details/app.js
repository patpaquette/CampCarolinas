/**
 * Created by patricepaquette on 2014-03-23.
 */

angular.module("campsearch-details", ["templates-app", "templates-common", "ng", "ngRoute", "ui.bootstrap", "ngSanitize", "rt.encodeuri", "common"])
  .config(function ($routeProvider, $sceProvider) {
    $sceProvider.enabled(false);

    $routeProvider
      .when('/', {
        templateUrl: 'details/details.tpl.html',
        controller: 'parkDetailsCtrl',
        reloadOnSearch: false,
        resolve: {
          parkName: function () {
            var parkName = jQuery("#details-app").attr("park-name");
            return parkName;
          },
          searchQuery: function () {
            var searchQuery = jQuery("#details-app").attr("search-query");
            return searchQuery;
          },
          parkNID: function(){
            var parkNID = jQuery("#details-app").attr("park-NID");
            return parkNID;
          }
        }
      })
//      .when('/:parkName', {
//        templateUrl: 'details/details.tpl.html',
//        controller: 'parkDetailsCtrl',
//        reloadOnSearch: false,
//        resolve: {
//          parkName: function ($route) {
//            var parkName = $route.current.params.parkName;
//            console.log(parkName);
//            return parkName;
//          },
//          searchQuery: function ($route) {
//            return '';
//          }
//        }
//      })
      .otherwise('/');
  })
    .run(function(){
      jQuery(document).ready(function(){
        jQuery("#contactus-button").click(function(){
          jQuery("#contactus-tab").tab("show");
        });
      })
    });