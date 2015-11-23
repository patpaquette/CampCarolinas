/**
 * Created by patricepaquette on 12/7/2013.
 */

function escapeRegExp(str){
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

angular.module("common")
    .filter("replace", function(){
        return function(input, searchValue, newValue){
            return input.replace(new RegExp(escapeRegExp(searchValue), 'g'), newValue);
        };
    });