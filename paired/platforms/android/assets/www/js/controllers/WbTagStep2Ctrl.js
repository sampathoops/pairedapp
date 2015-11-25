(function(){
angular.module('starter.controllers').controller('WbTagStep2Ctrl',WbTagStep2Ctrl);

  WbTagStep2Ctrl.$inject = ['WardrobeMainData','$state','$scope'];

  function WbTagStep2Ctrl(WardrobeMainData,$state,$scope){
          var wbtagstep2 = this;
          wbtagstep2.showMens = false;
          wbtagstep2.showWomens = false;
          wbtagstep2.selectedCategory = '';

          if(sessionStorage.getItem('selectedGender')!=null
              && sessionStorage.getItem('selectedGender')=='Men'){
                wbtagstep2.showMens = true;
          } else {
                wbtagstep2.showWomens = true;
          }

          wbtagstep2.catListMen = JSON.parse('[{"category_id":"1","value":"Formal Shirts","callable":"formal shirt"},{"category_id":"2","value":"Casual Shirts","callable":"shirt"},{"category_id":"3","value":"T-Shirts","callable":"T-shirt"},{"category_id":"4","value":"Formal Trousers","callable":"trouser"},{"category_id":"5","value":"Denims","callable":"jeans"},{"category_id":"6","value":"Chinos","callable":"chino"},{"category_id":"7","value":"Hoodie","callable":"hoodie"},{"category_id":"8","value":"Blazer","callable":"blazer"},{"category_id":"9","value":"Sweater","callable":"sweater"},{"category_id":"10","value":"Rain Jacket","callable":"jacket"}]');//create a method to retun applicable categories based on gender after integrating with API
          wbtagstep2.catListWomen = JSON.parse('[{"category_id":"10","value":"Casual Tops","callable":"Top"},{"category_id":"15","value":"Leggins","callable":"leggins"}]');//create a method to retun applicable categories based on gender after integrating with API

          wbtagstep2.selectCategory = function(category,e){
             $('.ion-checkmark').css('visibility','hidden');
             e.target.parentNode.children[2].style.visibility = 'visible';
             sessionStorage.setItem('selectedCat',category.value);
             sessionStorage.setItem('selectedCatId',category.category_id);
             sessionStorage.setItem('selectedCatCallabeName',category.callable);
             //alert(category.value);
          };

          wbtagstep2.goToStep1 = function(){
            $state.go('app.wbtagstep1');
          };

          wbtagstep2.goToStep3 = function(){
             $state.go('app.wbtagstep3');
          };
  }

})();
