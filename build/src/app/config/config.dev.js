/**
 * Created by patricepaquette on 2014-05-26.
 */

angular.module("config", [])
  .service("config", function(){
    return{
      dataBackendUrl: "http://www.gocampingamerica.com/scripts/gca-search/SearchRequest.php",
      backendUrl: "//http://192.168.59.129/CampCarolinas",
      assetsBackendUrl: "",
      parkImagesUrl: "http://www.gocampingamerica.com/"
    };
  });