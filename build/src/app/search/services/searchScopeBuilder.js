/**
 * Created by patricepaquette on 1/7/2014.
 */

angular.module("campsearch")
    .service('searchScopeBuilder', function (geo_validate) {
        var searchScopes = {
            "carolinas": {
                name: "carolinas",
                label: "Search only in the Carolinas",
                locationName: "the Carolinas",
                searchParams: [
                    {
                        type: "state",
                        location: "NC",
                        continent: "NA",
                        selectedState: geo_validate.getStateDef("NC"),
                        locationName: "North Carolina",
                        optionID: 'NC'
                    },
                    {
                        type: "state",
                        location: "SC",
                        continent: "NA",
                        selectedState: geo_validate.getStateDef("SC"),
                        locationName: "South Carolina",
                        optionID: 'SC'
                    }
                ]
            },
            "NA": {
                name: "NA",
                label: "Search all of North America",
                locationName: "North America",
                searchParams: [
                    {
                        type: "continent",
                        location: "NA",
                        continent: "NA",
                        optionID: 'NA'
                    }
                ]
            }
        };

        return {
            Build: function (params) {
                var state = geo_validate.getStateDef(params.state) || geo_validate.getProvinceDef(params.state);
                var region = geo_validate.getRegion(state, params.region);
                var scope = params.scope || ((state.abbreviation != 'CA') ? 'NA' : 'CA');

                searchScope = searchScopes[scope || 'CA'];

                searchScope.selectedState = state;
                searchScope.selectedRegion = region;


                searchScope.optionID = searchScope.location + ((searchScope.selectedRegion) ? ':' + searchScope.selectedRegion.name || '' : '');

                return searchScope;
            },
            GetScopes: function () {
                return searchScopes;
            }
        };
    });