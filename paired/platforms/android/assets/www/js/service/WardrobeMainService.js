(function(){
angular.module('starter.controllers').service('WardrobeMainData',WardrobeMainData);

function WardrobeMainData($http){
          return {

                   saveDevice: function(uuid,os,model,cb) {
                      $http.get('http://198.91.88.86/home/rest/signup/saveDevice/'+uuid+'/'+model+'/'+os+'/NULL/NULL').
                                 success(function(data, status, headers, config) {
                                      cb(data);
                                 }).
                                 error(function(data, status, headers, config) {
                                      cb(-1);
                                   // log error
                                 });
                   },

                   getProducts: function(accountId,cb) {
                      $http.get('http://198.91.88.86/home/rest/signup/getWardrobeProducts/'+accountId+'/').
                              success(function(data, status, headers, config) {
                                   cb(data);
                              }).
                              error(function(data, status, headers, config) {
                                   alert('Error loading wardrobe data.');
                                   return [];
                                // log error
                              });

                   }
                 };
  }

})();
