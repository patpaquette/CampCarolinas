/**
 * Created by patricepaquette on 1/7/2014.
 */

angular.module("campsearch")
    .service('searchScopeBuilder', function(geo_validate){
        var searchScopes = {
            CA: {
                type:"state",
                location: "CA",
                continent: "NA",
                selectedState: geo_validate.getStateDef("CA"),
                locationName: "California",
                optionID: 'CA'
            },
            NA: {
                type: "continent",
                location: "NA",
                continent: "NA",
                locationName: "North America",
                optionID: 'NA'
            }
        };

        return {
        Build:
            function(params){
                var state = geo_validate.getStateDef(params.state) || geo_validate.getProvinceDef(params.state);
                var region = geo_validate.getRegion(state, params.region);
                var scope = params.scope || ((state.abbreviation != 'CA')?'NA':'CA');

                searchScope = searchScopes[scope || 'CA'];

                searchScope.selectedState = state;
                searchScope.selectedRegion = region;


                searchScope.optionID = searchScope.location + ((searchScope.selectedRegion)?':' + searchScope.selectedRegion.name || '':'');

                return searchScope;
            }
        };
    });