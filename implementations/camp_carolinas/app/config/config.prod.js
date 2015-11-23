/**
 * Created by patricepaquette on 12/14/2013.
 */

angular.module("common")
    .service("config", function(){
        return{
            dataBackendUrl: "http://www.gocampingamerica.com/scripts/gca-search/SearchRequest.php",
            backendUrl: "http://www.camp-california.com",
            assetsBackendUrl: "http://www.camp-california.com/components/com_campsearch/public/bin/assets/",
            parkImagesUrl: "http://www.gocampingamerica.com/"
        };
    });