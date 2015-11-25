(function(){
angular.module('starter.controllers').controller('WbTagCtrl',WbTagCtrl);

  WbTagCtrl.$inject = ['WardrobeMainData','$state','$scope'];

  function WbTagCtrl(WardrobeMainData,$state,$scope){
          var wbTag = this;

          wbTag.goToStep1 = function(){
             $state.go('app.wbtagstep1');
          }
  }

})();
