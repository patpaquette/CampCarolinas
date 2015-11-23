/**
 * Created with IntelliJ IDEA.
 * User: patricepaquette
 * Date: 11/9/2013
 * Time: 2:36 PM
 * To change this template use File | Settings | File Templates.
 */

angular.module("campsearch")
  .controller("searchCtrl", function ($filter, $q, $scope, $modal, $routeParams, $location, backend, geo_validate, config, searchScopeBuilder) {
    $scope.state_info = undefined;
    $scope.resultParks = [];
    $scope.pagedResultParks = [];
    $scope.pagination = {
      numberOfPages: null,
      currentPage: null,
      defaultResultPerPage: 10,
      resultPerPage: 10
    };
    $scope.searchOptions = {};
    $scope.searchType = "location";
    $scope.resultMessageData = null;
    $scope.searchScopes = {
      CA: {
        type: "state",
        location: "CA",
        selectedState: geo_validate.getStateDef("CA"),
        locationName: "California",
        optionID: 'CA'
      },
      NA: {
        type: "continent",
        location: "NA",
        locationName: "North America",
        optionID: 'NA'
      }
    };
    $scope.searchScope = $scope.searchScopes.CA;
    $scope.searchScopeParamsString = "['CA','CA']";

    $scope.searchForm = {
      input: "",
      options: {
        radius: "25"
      },
      taxonomies: {}
    };
    $scope.config = config;


    $scope.ApplyChangeSearchScope = function (params) {
      $scope.ChangeSearchScope.apply(this, eval(params));
    };

    $scope.ChangeSearchScope = function (scope, state, region) {
      if (scope) {
        $scope.searchScope = searchScopeBuilder.Build({
          scope: scope,
          state: state,
          region: region
        });

        $scope.searchScopeParamsString = "[";
        $scope.searchScopeParamsString += (scope) ? "'" + scope + "'" : "";
        $scope.searchScopeParamsString += (state) ? ",'" + state + "'" : "";
        $scope.searchScopeParamsString += (region) ? ",'" + region + "'" : "";
        $scope.searchScopeParamsString += "]";

        //hack, should refactor asap
        if (scope == "NA") {
          $scope.searchScopeParamsString = "['NA']";
        }
      }
    };

    $scope.OpenMap = function (searchScope) {
      var mapModal = $modal.open({
        templateUrl: "ca-regions-map-modal.html",
        controller: modalMapCtrl,
        resolve: {
          searchScope: function () {
            return searchScope;
          },
          config: function () {
            return config;
          }
        }
      });

      mapModal
        .opened
        .then(function () {
//                    jQuery("#map_ca").mapster({
//                        mapKey: 'state'
//                    });

          function tryInitHighlight() {
            if (jQuery("#map_ca, #map_us").length > 0) {
              jQuery("#map_ca, #map_us").maphilight({
                groupBy: "alt"
              });
            }
            else {
              setTimeout(function () {
                tryInitHighlight();
              }, 500);
            }
          }

          tryInitHighlight();
        });

      mapModal
        .result
        .then(function (region) {
          if (searchScope.location == "CA") {
            $scope.ChangeRegion(region);
          }
          else if (searchScope.location == "NA") {
            $scope.ChangeState(region);
          }
        });
    };

    $scope.ToggleSearchType = function () {
      $scope.searchType = ($scope.searchType == "location") ? "park_name" : "location";
    };

    $scope.ToggleSearchScope = function () {
      $scope.searchScope = ($scope.searchScope.location == "CA") ? $scope.searchScopes.NA : $scope.searchScopes.CA;
      $scope.GetSearchScopeCategories($scope.searchScope);
    };

    $scope.ParkResultOnClick = function (outgoing_url) {
      $context = $scope.BuildSearchContextParameters();
      $location.search($context);
      window.location.href = outgoing_url;
    };

    $scope.Search = function () {
      var input = $scope.searchForm.input || '';
      var stateDef;
      var radius = $scope.searchForm.options.radius;
      var searchType = "location";
      $scope.selectedGeneralTags = $scope.GetSelectedGeneralTags();
      $scope.selectedStateSpecificTags = $scope.GetSelectedStateSpecificTags();
      $scope.selectedTags = $scope.MergeTagsTypes($scope.selectedGeneralTags, $scope.selectedStateSpecificTags);
      var tags = $scope.GetTagIDs($scope.selectedGeneralTags);
      var stateSpecificTags = $scope.GetTagIDs($scope.selectedStateSpecificTags);

      //console.log(tags);
      //console.log(stateSpecificTags);

      $context = $scope.BuildSearchContextParameters();
      $location.search($context);

      initSearchVariables();

      if ($scope.searchType == "location") {
        var split_input = input.split(new RegExp('( *,+ *)', 'g'));

        if (input === '' && $scope.searchScope.selectedState) {
          searchType = "state";
          stateDef = $scope.searchScope.selectedState;
        }
        else if (input === '') {
          return;
        }
        else if ($scope.searchScope.location == "CA" && split_input.length == 1) {
          searchType = "location";
          stateDef = geo_validate.getStateDef("CA");
          input = split_input[0] + ", CA";

        }
        else if ($scope.searchScope.location == 'NA' &&
          split_input.length == 1 &&
          $scope.searchScope.selectedState) {
          searchType = "location";
          input = split_input[0] + ", " + $scope.searchScope.selectedState.abbreviation;
        }
        else if (geo_validate.isState(input) || geo_validate.isState(split_input[0])) {
          searchType = "state";
          input = geo_validate.getStateDef(input);
        }

        if (searchType == "location") {
          $scope.loading = true;

          backend.SearchByLocation(input, radius, tags, stateSpecificTags, function (data) {
            $scope.resultMessageData.message = "Parks within " +
              radius +
              " miles from " +
              input;// +
            //(($scope.searchScope.locationName)?" in " + $scope.searchScope.locationName + "":"") +
            //(($scope.searchScope.selectedRegion)?" (" + $scope.searchScope.selectedRegion.name + ")":"");
            $scope.receiveParkData(data);
            $scope.$apply();
          });
        }
        else if (searchType == "state") {
          $scope.SearchByState(stateDef, tags, stateSpecificTags);
        }
      }
      else if ($scope.searchType = "park_name") {
        $scope.state_info = $scope.searchScope.selectedState;
        $scope.loading = true;

        backend
          .SearchByParkName(input, tags, $scope.state_info)
          .then(function (parks) {
            $scope.resultMessageData.message = "Parks matching name \"" +
              input + "\"" + (($scope.searchScope.selectedState) ? " in " + $filter("capitalizeFirst")($scope.searchScope.selectedState.name) + (($scope.searchScope.selectedRegion) ? " (" + $scope.searchScope.selectedRegion.name + ")" : "") : "");
            $scope.receiveParkData(parks);
          })
          .then(null, function (error) {
            //console.log(error);
            $scope.loading = false;
          });
      }
    };

    $scope.SearchByState = function (stateDef, tags, stateSpecificTags) {
      initSearchVariables();

      $scope
        .GetStateInfo(stateDef)
        .then(function (info) {
          $scope.resultMessageData.message = "Parks in " + info.title + (($scope.searchScope.selectedRegion) ? " (" + $scope.searchScope.selectedRegion.name + ")" : "");
        });

      backend
        .SearchByState(stateDef, tags, stateSpecificTags)
        .then(function (data) {
          $scope.receiveParkData(data);
        })
        .then(null, function (error) {
          //console.log(error);
          $scope.loading = false;
        });
    };

    $scope.GetStateInfo = function (stateDef) {
      $scope.loading = true;
      var deferred = $q.defer();

      backend
        .GetStateInfo(stateDef)
        .then(function (info) {
          $scope.state_info = info;
          $scope.loading = false;
          deferred.resolve(info);
        })
        .then(null, function (error) {
          //console.log(error);
          $scope.loading = false;
          deferred.reject(error);
        });

      return deferred.promise;
    };

    $scope.ChangeRegion = function (regionName) {
      var region = geo_validate.getCaliforniaRegion(regionName) || {};
      $scope.ChangeSearchScope('CA', 'CA', region.name);
      $scope.SearchByState($scope.searchScope.selectedState);
    };

    $scope.ChangeState = function (stateName) {
      $scope.ChangeSearchScope('NA', stateName, null);
      $scope.SearchByState($scope.searchScope.selectedState);
    };

    $scope.GetSearchScopeCategories = function (searchScope) {
      if (searchScope.location == "CA") {
        $scope.searchScopeCategories = [
          {id: 0, name: "All Regions"}
        ];
        $scope.searchScopeCategories = $scope.searchScopeCategories.concat(geo_validate.getCaliforniaRegions());
      }
      else if (searchScope.location == "NA") {
        $scope.searchScopeCategories = [
          {id: 0, name: "All States/Provinces"}
        ];
        $scope.searchScopeCategories = $scope.searchScopeCategories.concat(geo_validate.getUSStates());
        $scope.searchScopeCategories = $scope.searchScopeCategories.concat(geo_validate.getCAProvinces());
      }

      $scope.selectedCategory = $scope.searchScopeCategories[0];
    };

    $scope.GetSearchOptions = function () {

    };

    $scope.ChangeSearchScopeCategory = function (category) {
      $scope.selectedCategory = category;
    };

    $scope.getParkDetailUrl = function (park) {
      var name = park.name;
      var nid = park.nid;
      var context = $scope.BuildSearchContextParameters();
      var searchQuery = $scope.GenerateUrl(context);
      name = name.replace("'", "%27");
      return config.backendUrl + "/park-details/" + name.split(' ').join('-') + "?nid=" + nid + "&searchQuery=" + encodeURIComponent(searchQuery);
      //return config.backendUrl + "/component/com_campsearch/task,ParkDetail/nid," + nid + "/searchQuery," + encodeURIComponent(searchQuery) +"/";
    };

    $scope.receiveParkData = function (parks) {
//            if($scope.searchType != "park_name"){
      if ($scope.searchScope.location == "CA") {
        parks = _.filter(parks, function (park) {
          return park.province == "CA";
        });
      }
      else if ($scope.searchScope.location == "NA" && $scope.selectedCategory.id > 0) {
        parks = _.filter(parks, function (park) {
          return park.province == $scope.selectedCategory.abbreviation;
        });
      }

      if ($scope.searchScope.selectedRegion) {
        parks = _.filter(parks, function (park) {
          return park.region == $scope.searchScope.selectedRegion.name;
        });
      }
//            }

      $scope.loading = false;
      $scope.resultParks = parks;
      $scope.groupByPage(parks);

      if ($scope.pagedResultParks.length === 0) {
        $scope.resultMessageData.errorMessage = "No results found.";
      }
      //console.log($scope.pagedResultParks);

      $scope.MaximizeCellHeight();
    };

    $scope.groupByPage = function (parks) {
      $scope.pagedResultParks = [];
      $scope.pagination.numberOfPages = Math.ceil(parks.length / $scope.pagination.resultPerPage);

      for (var i = 0; i < $scope.pagination.numberOfPages; i++) {
        var start = i * $scope.pagination.resultPerPage;
        var end = start + $scope.pagination.resultPerPage;

        $scope.pagedResultParks[i] = parks.slice(start, end);
      }
    };

    $scope.GetSelectedGeneralTags = function () {
      var selectedTags = {};

      _.each($scope.searchOptions, function (options, category) {
        selectedTags[category] = _.filter(options, function (option) {
          return option.selected && option.state_association == "gca";
        });
      });

      return selectedTags;
    };

    $scope.GetSelectedStateSpecificTags = function () {
      var selectedTags = {};

      _.each($scope.searchOptions, function (options, category) {
        selectedTags[category] = _.filter(options, function (option) {
          return option.selected && option.state_association != "gca";
        });
      });

      return selectedTags;
    };

    $scope.GetTagIDs = function (searchOptions) {
      var nestedIds = _.map(searchOptions, function (options, category) {
        return _.map(options, function (option) {
          return option.id;
        });
      });

      return _.flatten(nestedIds);
    };

    $scope.MergeTagsTypes = function (type1, type2) {
      var merged = _.clone(type1);

      _.each(type2, function (options, category) {
        if (!merged[category]) {
          merged[category] = [];
        }

        merged[category] = merged[category].concat(options);
        merged[category] = _.sortBy(merged[category], "name");
      });

      return merged;
    };

    $scope.changePageIndex = function (pageIndex) {
      $scope.pagination.currentPage = pageIndex;
    };

    function initSearchVariables() {
      $scope.state_info = null;
      $scope.resultParks = [];
      $scope.pagedResultParks = [];
      $scope.pagination.currentPage = 1;
      resetResultMessageData();
    }

    function init() {
      $scope.searchOptions = [];

      resetResultMessageData();
      $scope.GetSearchScopeCategories($scope.searchScope);

      jQuery(document).ready(function () {
        jQuery("#search-option > ul > li").on("click", (function () {
          var buffer = jQuery("#search-option > ul > li").filter(":first");

          return function () {
            jQuery(buffer).removeClass("tab-active");
            jQuery(this).addClass("tab-active");
            buffer = jQuery(this);
          };
        })());

        jQuery("#state-overview > ul > li").on("click", (function () {
          var buffer = jQuery("#state-overview > ul > li").filter(":first");

          return function () {
            jQuery(buffer).removeClass("tab-active");
            jQuery(this).addClass("tab-active");
            buffer = jQuery(this);
          };
        })());
      });

      async.parallel([
        function (callback) {
          backend.GetOptions(function (data) {
            callback(null, data);
          });
        },
        function (callback) {
          backend
            .GetFeatures()
            .then(function (data) {
              callback(null, data);
            });
        }],
        function (err, results) {
          $scope.searchOptions = results[0];

          //merge the two type of options - tags(backward compatibility) and features - and put them on the
          //scope
          _.each(results[1], function (options, category) {
            if (!$scope.searchOptions[category]) {
              $scope.searchOptions[category] = [];
            }

            $scope.searchOptions[category] = $scope.searchOptions[category].concat(options);
            $scope.searchOptions[category] = _.sortBy($scope.searchOptions[category], "name");
          });

          var params = $scope.ParseUrlParams();

          $scope.BuildSearchContextFromParameters(params);

          if ($routeParams.search) {
            $scope.Search();
          }

          //console.log($scope.searchForm.options.radius);
          $scope.$apply();
        }
      );
    }

    $scope.MaximizeCellHeight = function () {
      jQuery(".result-row > .row").each(function () {
        jQuery(this).children('.cell').height(jQuery(this).height());
      });
    };

    $scope.GetCaliforniaRegions = function () {
      return geo_validate.getCaliforniaRegions();
    };

    $scope.ParseUrlParams = function () {
      //url parameters
      var params = {};
      params.input = $routeParams.input || '';
      params.radius = $routeParams.radius || 25;
      params.searchType = $routeParams.searchType || "location";
      params.state = $routeParams.state;
      params.region = $routeParams.region;
      params.continent = $routeParams.continent;

      var selectedTags;
      var selectedFeatures;

      if ($routeParams.tags) {
        selectedTags = $routeParams.tags.split(',');
      }
      if ($routeParams.features) {
        selectedFeatures = $routeParams.features.split(',');
      }

      var tags = selectedTags || [];
      var features = selectedFeatures || [];

      params.options = tags.concat(features);

      return params;
    };

    $scope.BuildSearchContextFromParameters = function (params) {
      //url parameters
      $scope.searchForm.input = params.input;
      $scope.searchForm.options.radius = parseInt(params.radius);
      $scope.searchType = params.searchType;

      if (params.state) {
        $scope.ChangeSearchScope('CA', params.state, params.region);
      }
      else if (params.continent) {
        $scope.ChangeSearchScope(params.continent);
      }
      else {
        $scope.ChangeSearchScope('CA', 'CA');
      }

      _.each(params.options, function (option_id) {
        _.every($scope.searchOptions, function (category) {
          return !_.find(category, function (option) {
            if (option.id == option_id) {
              option.selected = true;
              return true;
            }

            return false;
          });
        });
      });
    };

    $scope.BuildSearchContextParameters = function (input, radius, searchType, searchScope, tags, features) {
      var params = {
        input: $scope.searchForm.input,
        searchType: $scope.searchType,
        continent: (!$scope.searchScope.selectedState) ? $scope.searchScope.continent : null,
        state: ($scope.searchScope.selectedState) ? $scope.searchScope.selectedState.abbreviation : null,
        region: ($scope.searchScope.selectedRegion) ? $scope.searchScope.selectedRegion.name : null,
        tags: ($scope.GetTagIDs($scope.GetSelectedGeneralTags())).join(','),
        features: ($scope.GetTagIDs($scope.GetSelectedStateSpecificTags())).join(','),
        radius: $scope.searchForm.options.radius,
        search: 1
      };

      _.each(params, function (value, key) {
        if (!value || value == "") {
          delete params[key];
        }
      });

      return params;
    };

    $scope.GenerateUrl = function (searchContext) {
      var paramUrl = _.map(searchContext,function (val, key) {
        return key + "=" + val;
      }).join('&');

      return paramUrl;
    };

    $scope.ToggleShowAll = function () {
      $scope.pagination.showAllResults = !$scope.pagination.showAllResults;
      $scope.ChangeLimitPerPage(($scope.pagination.showAllResults) ? $scope.resultParks.length : $scope.pagination.defaultResultPerPage);
    };

    $scope.ChangeLimitPerPage = function (limit) {
      $scope.pagination.resultPerPage = limit;
      $scope.pagination.numberOfPages = Math.ceil($scope.resultParks.length / limit);
      $scope.groupByPage($scope.resultParks);
    };

    function resetResultMessageData() {
      $scope.resultMessageData = $scope.resultMessageData = {
        message: null,
        errorMessage: null,
        tags: []
      };
    }

    init();
  });

var modalMapCtrl = function ($scope, $modalInstance, searchScope, config) {
  $scope.searchScope = searchScope;
  $scope.config = config;

  //console.log($scope.config);

  $scope.ChangeRegion = function (region) {
    $scope.region = region;
    $scope.ok();
  };

  $scope.ok = function () {
    $modalInstance.close($scope.region);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};