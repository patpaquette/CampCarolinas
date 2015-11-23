/**
 * Created with IntelliJ IDEA.
 * User: patricepaquette
 * Date: 11/10/2013
 * Time: 11:55 AM
 * To change this template use File | Settings | File Templates.
 */

angular.module("common")
    .factory('data_mapper', function(){
        return function(from, model, invertModel){
            if(invertModel) {
                _.each(model, function(value, key){
                    model[key] = value[value.length-1];
                });

                model = _.invert(model);

                _.each(model, function(value, key){
                    model[key] = [value];
                });
            }

            _.each(model, function(fields, mapped_field){
                _.every(fields, function(field){
                    model[mapped_field] = from[field];

                    if(model[mapped_field]) {
                        return false;
                    }
                    return true;
                });
            });

            return model;
        };
    })
    .factory('db_transforms', function(data_mapper, data_model, $sce){
        function toModel(resultSet, model){
            return _.map(resultSet, function(row){
                return data_mapper(row, model);
            });
        }

        return {
            ToModel: toModel,
            ToParkInfo: function(resultSet){
                var info = toModel(resultSet, data_model.park_info())[0];

                info.overview = $sce.trustAsHtml(info.overview);
                info.attractions = $sce.trustAsHtml(info.attractions);
                info.rules = $sce.trustAsHtml(info.rules);
                info.additional_resources = $sce.trustAsHtml(info.additional_resources);

                return info;
            },
            ToParks: function(resultSet){
                var parks =  _.map(resultSet, function(row){
                    return data_mapper(row, data_model.park());
                });

                _.each(parks, function(park){
                    park.guestreview_snippet_url = $sce.trustAsResourceUrl("http://travel.guestrated.com/Widget/Pages/SearchResultRating.aspx?custtypeid=8&portalid=518&customerid="+ park.guestreview_id);
                });

                return parks;
            },
            ToOptions: function(resultSet){
                var mappedOptions = _.map(resultSet, function(row){
                    return data_mapper(row, data_model.option());
                });

                mappedOptions = _.filter(mappedOptions, function(option){
                    var mapping_data = _.find(options_mapping_data, function(mapping_data){
                        if(mapping_data.option == option.name){
                            return true;
                        }

                        return false;
                    });

                    if(mapping_data && mapping_data.blacklisted === 0){
                        return true;
                    }

                    return false;
                });

                _.each(mappedOptions, function(option){
                    option.name = option.name.replace('/', ' / ');

                    option.state_association = "gca";
                    if(option.category == "Park Site Options"){
                        option.category = "Park Services";
                    }
                });

                mappedOptions = _.sortBy(mappedOptions, "name");

                return mappedOptions;
            },
            ToFeatures: function(resultSet){
                var mappedFeatures = _.map(resultSet, function(row){
                    return data_mapper(row, data_model.feature());
                });

                _.each(mappedFeatures, function(feature){
                    if(feature.category == "Park Site Options"){
                        feature.category = "Park Services";
                    }
                });

                mappedFeatures = _.sortBy(mappedFeatures, "name");

                return mappedFeatures;
            }
        };
    });

var options_mapping_data = JSON.parse('' +
    '[{"option":"Arcade/Game Room","category":"Park Amenities","blacklisted":0},'+
    '{"option":"BBQ Grills","category":"Park Amenities","blacklisted":0},'+
    '{"option":"Bike Rentals","category":"Park Amenities","blacklisted":0},'+
    '{"option":"Boat Rentals","category":"Park Amenities","blacklisted":0},'+
    '{"option":"Chapel/Religious Services","category":"Park Amenities","blacklisted":0},'+
    '{"option":"Convenience Store","category":"Park Amenities","blacklisted":0},'+
    '{"option":"Covered Pavillion Area","category":"Park Amenities","blacklisted":0},'+
    '{"option":"Electric Car Charging Stations","category":"Park Amenities","blacklisted":0},'+
    '{"option":"Firewood","category":"Park Amenities","blacklisted":0},'+
    '{"option":"Forest Access","category":"Park Amenities","blacklisted":0},'+
    '{"option":"Golf Cart Rentals","category":"Park Amenities","blacklisted":0},'+
    '{"option":"Hot Tub/Sauna","category":"Park Amenities","blacklisted":0},'+
    '{"option":"Internet Access","category":"Park Amenities","blacklisted":0},'+
    '{"option":"Laundry Facilities","category":"Park Amenities","blacklisted":0},'+
    '{"option":"Marina","category":"Park Amenities","blacklisted":0},'+
    '{"option":"Picnic Area","category":"Park Amenities","blacklisted":0},'+
    '{"option":"Playground","category":"Park Amenities","blacklisted":0},'+
    '{"option":"Pool","category":"Park Amenities","blacklisted":0},'+
    '{"option":"Recreation Hall","category":"Park Amenities","blacklisted":0},'+
    '{"option":"Restaurant/Snack Bar","category":"Park Amenities","blacklisted":0},'+
    '{"option":"Restroom/Shower Facilities","category":"Park Amenities","blacklisted":0},'+
    '{"option":"TV/Satellite Service","category":"Park Amenities","blacklisted":0},'+
    '{"option":"Vending","category":"Park Amenities","blacklisted":0},'+
    '{"option":"Waterfront","category":"Park Amenities","blacklisted":0},'+
    '{"option":"Club/Meeting Room","category":"Park Amenities","blacklisted":0},'+
    '{"option":"Horse Facility","category":"Park Amenities","blacklisted":0},'+
    '{"option":"Cell Phone Service","category":"Park Amenities","blacklisted":1},'+
    '{"option":"Fenced Pet Area","category":"Park Amenities","blacklisted":1},'+
    '{"option":"ATV/Four Wheeling","category":"Park Recreation","blacklisted":0},'+
    '{"option":"Basketball","category":"Park Recreation","blacklisted":0},'+
    '{"option":"Biking Trails","category":"Park Recreation","blacklisted":0},'+
    '{"option":"Bird Watching","category":"Park Recreation","blacklisted":0},'+
    '{"option":"Boating","category":"Park Recreation","blacklisted":0},'+
    '{"option":"Canoeing","category":"Park Recreation","blacklisted":0},'+
    '{"option":"Exercise Facilities","category":"Park Recreation","blacklisted":0},'+
    '{"option":"Fishing","category":"Park Recreation","blacklisted":0},'+
    '{"option":"Frisbee Golf","category":"Park Recreation","blacklisted":0},'+
    '{"option":"Golf Course","category":"Park Recreation","blacklisted":0},'+
    '{"option":"Hiking/Nature Trails","category":"Park Recreation","blacklisted":0},'+
    '{"option":"Horseback Riding","category":"Park Recreation","blacklisted":0},'+
    '{"option":"Horseshoes","category":"Park Recreation","blacklisted":0},'+
    '{"option":"Kayaking","category":"Park Recreation","blacklisted":0},'+
    '{"option":"Mini Golf","category":"Park Recreation","blacklisted":0},'+
    '{"option":"Paddleboats","category":"Park Recreation","blacklisted":0},'+
    '{"option":"River Rafting","category":"Park Recreation","blacklisted":0},'+
    '{"option":"Shuffle Board","category":"Park Recreation","blacklisted":0},'+
    '{"option":"Skate Park","category":"Park Recreation","blacklisted":0},'+
    '{"option":"Swimming - Indoor","category":"Park Recreation","blacklisted":0},'+
    '{"option":"Swimming - Outdoor","category":"Park Recreation","blacklisted":0},'+
    '{"option":"Tennis","category":"Park Recreation","blacklisted":0},'+
    '{"option":"Volleyball","category":"Park Recreation","blacklisted":0},'+
    '{"option":"Water Park/Slides","category":"Park Recreation","blacklisted":0},'+
    '{"option":"Day Spa Facilities","category":"Park Recreation","blacklisted":0},'+
    '{"option":"Entertainment","category":"Park Recreation","blacklisted":0},'+
    '{"option":"Gaming/Casino","category":"Park Recreation","blacklisted":0},'+
    '{"option":"Senior Activities","category":"Park Recreation","blacklisted":0},'+
    '{"option":"Water Skiing","category":"Park Recreation","blacklisted":0},'+
    '{"option":"Wildlife Viewing","category":"Park Recreation","blacklisted":0},'+
    '{"option":"Winter Snowplay","category":"Park Recreation","blacklisted":0},'+
    '{"option":"Snowmobiling","category":"Park Recreation","blacklisted":1},'+
    '{"option":"Group Camping Area","category":"Park Site Options","blacklisted":0},'+
    '{"option":"Park Models","category":"Park Site Options","blacklisted":0},'+
    '{"option":"Pull Through Sites","category":"Park Site Options","blacklisted":0},'+
    '{"option":"Seasonal","category":"Park Site Options","blacklisted":0},'+
    '{"option":"Accom Big Rigs","category":"Park Site Options","blacklisted":0},'+
    '{"option":"Tent Sites","category":"Park Site Options","blacklisted":0},'+
    '{"option":"Cabins","category":"Park Site Options","blacklisted":1},'+
    '{"option":"Condos","category":"Park Site Options","blacklisted":1},'+
    '{"option":"Lodge Rooms","category":"Park Site Options","blacklisted":1},'+
    '{"option":"Rental Trailers","category":"Park Site Options","blacklisted":1},'+
    '{"option":"Slide out Sites","category":"Park Site Options","blacklisted":1},'+
    '{"option":"Teepees","category":"Park Site Options","blacklisted":1},'+
    '{"option":"Yurts","category":"Park Site Options","blacklisted":1},'+
    '{"option":"Short Term Leases","category":"Park Site Options","blacklisted":1},'+
    '{"option":"20 Amp Service","category":"Park Services","blacklisted":0},'+
    '{"option":"30 Amp Service","category":"Park Services","blacklisted":0},'+
    '{"option":"50 Amp Service","category":"Park Services","blacklisted":0},'+
    '{"option":"Dumpstation","category":"Park Services","blacklisted":0},'+
    '{"option":"Full Hookups","category":"Park Services","blacklisted":0},'+
    '{"option":"Gas/Diesel","category":"Park Services","blacklisted":0},'+
    '{"option":"Propane","category":"Park Services","blacklisted":0},'+
    '{"option":"RV Maintenance/Repair","category":"Park Services","blacklisted":0},'+
    '{"option":"Group Discounts","category":"Park Services","blacklisted":0},'+
    '{"option":"WiFi","category":"Park Services","blacklisted":0},'+
    '{"option":"4G Wi-Fi","category":"Park Services","blacklisted":1},'+
    '{"option":"Higher Amp Service","category":"Park Services","blacklisted":1},'+
    '{"option":"Age Restricted (55+)","category":"Park Lifestyles","blacklisted":0},'+
    '{"option":"Extended Stay","category":"Park Lifestyles","blacklisted":0},'+
    '{"option":"Family Friendly","category":"Park Lifestyles","blacklisted":0},'+
    '{"option":"Handicapped Access","category":"Park Lifestyles","blacklisted":0},'+
    '{"option":"Motorcoach Only","category":"Park Lifestyles","blacklisted":0},'+
    '{"option":"No Alcohol","category":"Park Lifestyles","blacklisted":0},'+
    '{"option":"Open Year Round","category":"Park Lifestyles","blacklisted":0},'+
    '{"option":"Pet Friendly","category":"Park Lifestyles","blacklisted":0},'+
    '{"option":"Clubs Welcome","category":"Park Lifestyles","blacklisted":0},'+
    '{"option":"Nude Recreation","category":"Park Lifestyles","blacklisted":0},'+
    '{"option":"Timeshare/Ownership","category":"Park Lifestyles","blacklisted":0},'+
    '{"option":"Adult 21 And Over","category":"Park Lifestyles","blacklisted":1},' +
    '{"option":"AARP","category":"Park Affiliation","blacklisted":0},'+
    '{"option":"AAA","category":"Park Affiliation","blacklisted":0},'+
    '{"option":"Best Parks in America","category":"Park Affiliation","blacklisted":0},'+
    '{"option":"Club Yogi","category":"Park Affiliation","blacklisted":0},'+
    '{"option":"Encore","category":"Park Affiliation","blacklisted":0},'+
    '{"option":"Enjoy America","category":"Park Affiliation","blacklisted":0},'+
    '{"option":"Family Campers & RVers","category":"Park Affiliation","blacklisted":0},'+
    '{"option":"Family Motor Coach Association","category":"Park Affiliation","blacklisted":0},'+
    '{"option":"Good Sam Club","category":"Park Affiliation","blacklisted":0},'+
    '{"option":"Happy Camper Club","category":"Park Affiliation","blacklisted":0},'+
    '{"option":"KOA Value Kard Rewards","category":"Park Affiliation","blacklisted":0},'+
    '{"option":"Military","category":"Park Affiliation","blacklisted":0},'+
    '{"option":"Passport America","category":"Park Affiliation","blacklisted":0},'+
    '{"option":"Resort Parks International","category":"Park Affiliation","blacklisted":0},'+
    '{"option":"Sun Communities","category":"Park Affiliation","blacklisted":0},'+
    '{"option":"Thousand Trails","category":"Park Affiliation","blacklisted":0},'+
    '{"option":"Municipal Parks","category":"Park Affiliation","blacklisted":0},'+
    '{"option":"Privately Operated Parks","category":"Park Affiliation","blacklisted":0},'+
    '{"option":"RVing Rewards","category":"Park Affiliation","blacklisted":1}]');
    