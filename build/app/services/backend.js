/**
 * Created with IntelliJ IDEA.
 * User: patricepaquette
 * Date: 11/9/2013
 * Time: 3:34 PM
 * To change this template use File | Settings | File Templates.
 */

angular.module("common")

  .factory("backend", function ($q, db_transforms, data_model, config) {
    var backendUrl = config.dataBackendUrl;

    return{
      GetStateInfo: function (stateDef) {
        var deferred = $q.defer();
        var params = {
          state_long: stateDef.name,
          state_short: stateDef.abbreviation
        };

        jQuery
          .getJSON(
            backendUrl + "?type=state_info&params=" + JSON.stringify(params)
          )
          .done(function (data) {
            var transformed = db_transforms.ToModel([data], data_model.state_info());

            deferred.resolve(transformed[0]);
          })
          .fail(function (jqxhr, textStatus, error) {
            deferred.reject(error);
          });

        return deferred.promise;
      },
      SearchByParkName: function (parkName, tags, stateDef) {
        if (!stateDef) {
          stateDef = {};
        }

        var deferred = $q.defer();
        var params = {
          park_name: parkName,
          state_long: stateDef.name,
          state_short: stateDef.abbreviation,
          tags: tags
        };

        jQuery
          .getJSON(
            backendUrl + "?type=park_name&params=" + encodeURIComponent(JSON.stringify(params))
          )
          .done(function (data) {
            deferred.resolve(db_transforms.ToParks(data));
          })
          .fail(function (jqxhr, texStatus, error) {
            deferred.reject(error);
          });

        return deferred.promise;
      },
      SearchByState: function (stateDef, tags, stateSpecificTags) {
        var deferred = $q.defer();
        var params = {
          state_long: stateDef.name,
          state_short: stateDef.abbreviation,
          tags: tags,
          park_features: stateSpecificTags
        };

        jQuery
          .getJSON(
            backendUrl + "?type=state&params=" + JSON.stringify(params)
          )
          .done(function (data) {
            deferred.resolve(db_transforms.ToParks(data));
          })
          .fail(function (jqxhr, textStatus, error) {
            deferred.reject(error);
          });

        return deferred.promise;
      },
      SearchByLocation: function (location, radius, tags, stateSpecificTags, callback) {
        var params = {
          location: location,
          radius: radius,
          tags: tags,
          park_features: stateSpecificTags
        };

        jQuery.getJSON(
          backendUrl + "?type=location&params=" + JSON.stringify(params),
          function (data, status, jqHXR) {
            if (callback) {
              data = db_transforms.ToParks(data);
              callback(data);
            }
          }
        );
      },
      GetOptions: function (callback) {
        jQuery.getJSON(
          backendUrl + "?type=taxonomies",
          function (data, status, jqHXR) {
            //console.log("test");
            if (callback) {
              data = db_transforms.ToOptions(data);
              data = _.groupBy(data, "category");
              callback(data);
            }
          }
        )
      },
      GetFeatures: function (callback) {
        var deferred = $q.defer();

        jQuery.getJSON(
          backendUrl + "?type=features",
          function (data, status, jqHXR) {
            data = db_transforms.ToFeatures(data);
            data = _.groupBy(data, "category");

            deferred.resolve(data);

            if (callback) {
              callback(data);
            }
          }
        );

        return deferred.promise;
      },
      GetParkDetails: function (callback) {
        jQuery.getJSON(
          backendUrl + "?type=park_taxonomies",
          function (data, status) {
            if (callback) {
              callback(data);
            }
          }
        );
      },
      GetParkDetails: function (params) {
        var deferred = $q.defer();
        _.each(params, function(value, key){
          params[key] = encodeURI(value);
        });

        var jsonParams = JSON.stringify(params);

        jQuery.getJSON(
          backendUrl + "?type=park_detail_w_taxonomies&params=" + jsonParams,
          function (data, status) {
            if (data) {
              //console.log(data);
              deferred.resolve(data);
            }
            else {
              deferred.reject();
            }
          }
        );

        return deferred.promise;
      }
    };
  });