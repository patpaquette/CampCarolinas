/**
 * Created by patricepaquette on 2014-03-23.
 */

angular.module("campsearch-details")
  .controller("parkDetailsCtrl", function ($scope, $q, $location, backend, parkName, parkNID, searchQuery, config) {
    $scope.config = config;
    $scope.search_query = searchQuery;

    $scope.getGuestRatedSrc = function () {
      if ($scope.park_details) {
        var url = "http://travel.camping.com/guestrated/RatingsSummary.ashx?portalid=518&customerid=" + $scope.park_details.field_camp_guestreview_id_value;

        //console.log(url);
        return url;
      }

      return null;
    };

    $scope.getGuestRatedRecentReviewsSrc = function () {
      if ($scope.park_details) {
        var url = "http://travel.guestrated.com/Widget/Pages/MostRecentReviewsSingleProperty.aspx?custtypeid=8&portalid=518&customerid=" + $scope.park_details.field_camp_guestreview_id_value;

        //console.log(url);
        return url;
      }

      return null;
    };

    $scope.getGuestRatedSurveySrc = function () {
      if ($scope.park_details) {
        var url = "http://survey.guestrated.com/TakeSurvey.aspx?SurveyID=m2KH552&customerID=" + $scope.park_details.field_camp_guestreview_id_value + "&portalID=61";

        //console.log(url);
        return url;
      }

      return null;
    };

    $scope.getMapQuery = function () {
      if ($scope.park_details) {
        return $scope.park_details.street + ' ' + $scope.park_details.city + ' ' + $scope.park_details.province;
      }
      else {
        return '';
      }
    };

    $scope.getTaxonomiesArray = (function () {
      var cached = null;

      return function () {
        if (cached) {
          return cached;
        }

        if ($scope.park_details) {
          var ret = _.map($scope.park_details.taxonomies, function (values, title) {
            return {
              title: title,
              values: values
            };
          });

          cached = ret;

          return ret;
        }

        return [];
      };
    })();

    function truncateUrl(){
      jQuery(".group1").colorbox({rel:'group1'});

      var url = document.location.href;
      var urlArray = url.split('/').splice(0, 5);
      url = urlArray.join('/');
      //url = url.replace(new RegExp("/searchQuery,[^/]*", 'g'), '');

      window.history.replaceState({}, '', url);
    }

    //console.log("NID : " + parkNID);
    if(parkNID){
      backend.GetParkDetails({nid: parkNID})
        .then(function(details){
          $scope.park_details = details;
          $scope.taxonomies = $scope.getTaxonomiesArray();
          $scope.taxonomiesLeft = $scope.taxonomies.slice(0, Math.ceil($scope.taxonomies.length/2));
          $scope.taxonomiesRight = $scope.taxonomies.slice(Math.ceil($scope.taxonomies.length/2) + 1, $scope.taxonomies.length);
        });
    }
    else if (parkName) {
      backend
        .GetParkDetails({name: parkName})
        .then(function (details) {
          $scope.park_details = details;
          $scope.taxonomies = $scope.getTaxonomiesArray();
          $scope.taxonomiesLeft = $scope.taxonomies.slice(0, Math.ceil($scope.taxonomies.length/2));
        });
    }

  });