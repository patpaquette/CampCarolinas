/**
 * Created by patricepaquette on 12/18/2013.
 */

angular.module('common')
    .filter("capitalizeFirst", function(){
        return function(word){

            if(!word || word == ''){
                return '';
            }

            var outWord = word.toLowerCase();

            return outWord.charAt(0).toUpperCase() + outWord.slice(1);
        };
    });