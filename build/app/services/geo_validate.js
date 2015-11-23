/**
 * Created by patricepaquette on 12/8/2013.
 */

/**
 * Created by patricepaquette on 12/8/2013.
 */

angular.module("common")
    .service("geo_validate", function(){
        var caProvinces =[
            { id:1, name: "ALBERTA", abbreviation: "AB" },
            { id:7, name: "BRITISH COLUMBIA", abbreviation: "BC" },
            { id:6, name: "MANITOBA", abbreviation: "MB" },
            { id:5, name: "NEW BRUNSWICK", abbreviation: "NB" },
            { id:10, name: "NEWFOUNDLAND AND LABRADOR", abbreviation: "NL" },
            { id:4, name: "NOVA SCOTIA", abbreviation: "NS" },
            { id:2, name: "ONTARIO", abbreviation: "ON" },
            { id:8, name: "PRINCE EDWARD ISLAND", abbreviation: "PE" },
            { id:3, name: "QUEBEC", abbreviation: "QC" },
            { id:9, name: "SASKATCHEWAN", abbreviation: "SK" }
        ];

        var usStates = [
            { id: 1,  name: 'ALABAMA', abbreviation: 'AL' },
            { id: 2,  name: 'ALASKA', abbreviation: 'AK' },
            { id: 3,  name: 'AMERICAN SAMOA', abbreviation: 'AS' },
            { id: 4,  name: 'ARIZONA', abbreviation: 'AZ' },
            { id: 5,  name: 'ARKANSAS', abbreviation: 'AR' },
            { id: 6,  name: 'CALIFORNIA', abbreviation: 'CA' },
            { id: 7,  name: 'COLORADO', abbreviation: 'CO' },
            { id: 8,  name: 'CONNECTICUT', abbreviation: 'CT' },
            { id: 9,  name: 'DELAWARE', abbreviation: 'DE' },
            { id: 10,  name: 'DISTRICT OF COLUMBIA', abbreviation: 'DC' },
            { id: 11,  name: 'FEDERATED STATES OF MICRONESIA', abbreviation: 'FM' },
            { id: 12,  name: 'FLORIDA', abbreviation: 'FL' },
            { id: 13,  name: 'GEORGIA', abbreviation: 'GA' },
            { id: 14,  name: 'GUAM', abbreviation: 'GU' },
            { id: 15,  name: 'HAWAII', abbreviation: 'HI' },
            { id: 16,  name: 'IDAHO', abbreviation: 'ID' },
            { id: 17,  name: 'ILLINOIS', abbreviation: 'IL' },
            { id: 18,  name: 'INDIANA', abbreviation: 'IN' },
            { id: 19,  name: 'IOWA', abbreviation: 'IA' },
            { id: 20,  name: 'KANSAS', abbreviation: 'KS' },
            { id: 21,  name: 'KENTUCKY', abbreviation: 'KY' },
            { id: 22,  name: 'LOUISIANA', abbreviation: 'LA' },
            { id: 23,  name: 'MAINE', abbreviation: 'ME' },
            { id: 24,  name: 'MARSHALL ISLANDS', abbreviation: 'MH' },
            { id: 25,  name: 'MARYLAND', abbreviation: 'MD' },
            { id: 26,  name: 'MASSACHUSETTS', abbreviation: 'MA' },
            { id: 27,  name: 'MICHIGAN', abbreviation: 'MI' },
            { id: 28,  name: 'MINNESOTA', abbreviation: 'MN' },
            { id: 29,  name: 'MISSISSIPPI', abbreviation: 'MS' },
            { id: 30,  name: 'MISSOURI', abbreviation: 'MO' },
            { id: 31,  name: 'MONTANA', abbreviation: 'MT' },
            { id: 32,  name: 'NEBRASKA', abbreviation: 'NE' },
            { id: 33,  name: 'NEVADA', abbreviation: 'NV' },
            { id: 34,  name: 'NEW HAMPSHIRE', abbreviation: 'NH' },
            { id: 35,  name: 'NEW JERSEY', abbreviation: 'NJ' },
            { id: 36,  name: 'NEW MEXICO', abbreviation: 'NM' },
            { id: 37,  name: 'NEW YORK', abbreviation: 'NY' },
            { id: 38,  name: 'NORTH CAROLINA', abbreviation: 'NC' },
            { id: 39,  name: 'NORTH DAKOTA', abbreviation: 'ND' },
            { id: 40,  name: 'NORTHERN MARIANA ISLANDS', abbreviation: 'MP' },
            { id: 41,  name: 'OHIO', abbreviation: 'OH' },
            { id: 42,  name: 'OKLAHOMA', abbreviation: 'OK' },
            { id: 43,  name: 'OREGON', abbreviation: 'OR' },
            { id: 44,  name: 'PALAU', abbreviation: 'PW' },
            { id: 45,  name: 'PENNSYLVANIA', abbreviation: 'PA' },
            { id: 46,  name: 'PUERTO RICO', abbreviation: 'PR' },
            { id: 47,  name: 'RHODE ISLAND', abbreviation: 'RI' },
            { id: 48,  name: 'SOUTH CAROLINA', abbreviation: 'SC' },
            { id: 49,  name: 'SOUTH DAKOTA', abbreviation: 'SD' },
            { id: 50,  name: 'TENNESSEE', abbreviation: 'TN' },
            { id: 51,  name: 'TEXAS', abbreviation: 'TX' },
            { id: 52,  name: 'UTAH', abbreviation: 'UT' },
            { id: 53,  name: 'VERMONT', abbreviation: 'VT' },
            { id: 54,  name: 'VIRGIN ISLANDS', abbreviation: 'VI' },
            { id: 55,  name: 'VIRGINIA', abbreviation: 'VA' },
            { id: 56,  name: 'WASHINGTON', abbreviation: 'WA' },
            { id: 57,  name: 'WEST VIRGINIA', abbreviation: 'WV' },
            { id: 58,  name: 'WISCONSIN', abbreviation: 'WI' },
            { id: 59,  name: 'WYOMING', abbreviation: 'WY'  }
        ];

        var californiaRegions = [
            {id: 1, name: "Central Coast"},
            {id: 2, name: "Central Valley"},
            {id: 3, name: "The Deserts"},
            {id: 4, name: "Gold Country"},
            {id: 5, name: "High Sierra"},
            {id: 6, name: "Inland Empire"},
            {id: 7, name: "Los Angeles Area"},
            {id: 8, name: "North Coast"},
            {id: 10, name: "Orange County"},
            {id: 12, name: "Shasta Cascade Trinity"},
            {id: 13, name: "San Diego Area"},
            {id: 14, name: "San Francisco Bay Area"}
        ];

        var getCaliforniaRegion = function(str){
            var regionName = str.replace(/[_-]/g, ' ');

            if(!regionName){
                return null;
            }

            return _.find(californiaRegions, function(region){
                regionName = regionName.toUpperCase();
                if(regionName == region.name.toUpperCase()){
                    return true;
                }

                return false;
            });
        };

        return {
            isState: function(str){
                if(!str){
                    return false;
                }

                return true && _.find(usStates, function(state){
                    str = str.toUpperCase();
                    if(str == state.name || str == state.abbreviation){
                        return true;
                    }

                    return false;
                });
            },
            getStateDef: function(str){
                if(!str){
                    return null;
                }

                return _.find(usStates, function(state){
                    str = str.toUpperCase();
                    if(str == state.name || str == state.abbreviation){
                        return true;
                    }

                    return false;
                });
            },
            getUSStates: function(){
                return usStates;
            },
            getCaliforniaRegion: getCaliforniaRegion,
            getCaliforniaRegions: function(){
                return californiaRegions;
            },
            getCaliforniaRegionById: function(id){
                return _.find(californiaRegions, function(region){
                    return region.id == id;
                });
            },
            isProvince: function(str){
                if(!str){
                    return false;
                }

                return true && _.find(caProvinces, function(province){
                    str = str.toUpperCase();
                    if(str == province.name || str == province.abbreviation){
                        return true;
                    }

                    return false;
                });
            },
            getProvinceDef: function(str){
                if(!str){
                    return null;
                }

                return _.find(caProvinces, function(province){
                    str = str.toUpperCase();
                    if(str == province.name || str == province.abbreviation){
                        return true;
                    }

                    return false;
                });
            },
            getCAProvinces: function(){
                return caProvinces;
            },
            getRegion: function(state, region){
                if(!region){
                    return null;
                }

                switch(state.abbreviation || state){
                    case 'CA':
                        return getCaliforniaRegion(region);
                    default:
                        return null;
                }
            }
        };
    });