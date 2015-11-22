(function(){
angular.module('starter.controllers').controller('WbTagStep3Ctrl',WbTagStep3Ctrl);

  WbTagStep3Ctrl.$inject = ['WardrobeMainData','$state','$scope'];

  function WbTagStep3Ctrl(WardrobeMainData,$state,$scope){
          var wbtagstep3 = this;
          wbtagstep3.selectedCat = '';
          wbtagstep3.selectedCatCallabeName = '';
          wbtagstep3.selectedCatId = '';

          if(sessionStorage.getItem('selectedCat')!=null
              && sessionStorage.getItem('selectedCat')!=''){
                wbtagstep3.selectedCat = sessionStorage.getItem('selectedCat');
                wbtagstep3.selectedCatCallabeName = sessionStorage.getItem('selectedCatCallabeName');
                wbtagstep3.selectedCatId = sessionStorage.getItem('selectedCatId');
                alert(wbtagstep3.selectedCatId)
          }

          wbtagstep3.goToTagHome = function(){
                       $state.go('app.wbtag');
                    };

          wbtagstep3.tagProduct = function(){
                                $state.go('app.wbtag');
                             };
  }

})();
