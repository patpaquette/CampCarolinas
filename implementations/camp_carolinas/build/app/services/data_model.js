/**
 * Created with IntelliJ IDEA.
 * User: patricepaquette
 * Date: 11/9/2013
 * Time: 3:32 PM
 * To change this template use File | Settings | File Templates.
 */

angular.module("common")

.factory("data_model", function(){
        return {
            state_info: function(){
                return {
                    "nid": ["nid"],
                    "vid": ["vid"],
                    "title": ["title"],
                    "overview": ["field_state_overview_value"],
                    "attractions": ["field_state_attractions_value"],
                    "rules": ["field_state_rules_value"],
                    "additional_resources": ["field_state_useful_value"]
                };
            },
            park: function(){
                return {
                    "nid": ["nid"],
                    "name": ["title"],
                    "street": ["street"],
                    "city": ["city"],
                    "province": ["province"],
                    "region": ["region"],
                    "postal_code": ["postal_code"],
                    "latitude": ["lat"],
                    "longitude": ["lng"],
                    "distance": ["distance"],
                    "description": ["field_park_description_value"],
                    "park_tier": ["field_park_tier_value"],
                    "promo_text": ["field_camp_promo_text_value"],
                    "guestreview_id": ["field_camp_guestreview_id_value"],
                    "thumbnail_path": ["thumbnail_path"]
                };
            },
            option: function(){
                return{
                    "id": ["tid"],
                    "category": ["vocabulary_name"],
                    "name": ["term_name"]
                };
            },
            feature: function(){
                return{
                    "id": ["fid"],
                    "category": ["category_name"],
                    "name": ["feature_name"]
                };
            }
        };
    });