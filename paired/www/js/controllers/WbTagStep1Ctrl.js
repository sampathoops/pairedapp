(function(){
angular.module('starter.controllers').controller('WbTagStep1Ctrl',WbTagStep1Ctrl);

  WbTagStep1Ctrl.$inject = ['WardrobeMainData','$state','$scope'];

  function WbTagStep1Ctrl(WardrobeMainData,$state,$scope){
          var wbtagstep1 = this;

          wbtagstep1.showMens = function(){
             sessionStorage.setItem('selectedGender','Men');
             $state.go('app.wbtagstep2');
          };

          wbtagstep1.showWomens = function(){
             sessionStorage.setItem('selectedGender','Women');
             $state.go('app.wbtagstep2');
          };
  }

})();
