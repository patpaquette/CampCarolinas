/**
 * Created by patricepaquette on 2014-05-26.
 */

angular.module("config", [])
  .service("config", function(){
    return{
      dataBackendUrl: "http://www.gocampingamerica.com/scripts/gca-search/SearchRequest.php",
      backendUrl: "http://campingcarolinas.infiltrade.com",
      assetsBackendUrl: "http://campingcarolinas.infiltrade.com/public",
      parkImagesUrl: "http://www.gocampingamerica.com/"
    };
  });