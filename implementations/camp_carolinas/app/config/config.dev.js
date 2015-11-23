/**
 * Created by patricepaquette on 2014-05-26.
 */

angular.module("config", [])
  .service("config", function(){
    return{
      dataBackendUrl: "http://gca-update.dev/scripts/gca-search/SearchRequest.php",
      backendUrl: "http://cc.dev",
      assetsBackendUrl: "",
      parkImagesUrl: "http://gca-update.dev"
    };
  });