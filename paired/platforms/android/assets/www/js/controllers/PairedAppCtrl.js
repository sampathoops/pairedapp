(function(){
angular.module('starter.controllers').controller('PairedAppCtrl',PairedAppCtrl);

//PairedAppCtrl.$inject = ['$cordovaDevice'];
  PairedAppCtrl.$inject = ['WardrobeMainData','$cordovaDevice','$state'];

  function PairedAppCtrl(WardrobeMainData,$cordovaDevice,$state){
          document.addEventListener("deviceready", initDevice, false);
          $state.go('app.wbtag');
          function initDevice(){
             //alert(window.localStorage.getItem('account_id'));
             //if(window.localStorage.getItem('account_id') == null){
                 var acctId = WardrobeMainData.saveDevice($cordovaDevice.getUUID(),$cordovaDevice.getPlatform(),$cordovaDevice.getModel(),saveAccountId);
                 //if(acctId == -1) show not connected to internet popup
             //}


           }

           function saveAccountId(accntId){
                        window.localStorage.setItem('account_id',accntId);
                        WardrobeMainData.getProducts(accntId,checkWardrobeCount);
                   }

          function checkWardrobeCount(wbproducts){
            if(wbproducts.length == 0)
              $state.go('app.wbtag');
            else
              //$state.go('app.wbbrowse');
              $state.go('app.wbtag');
          }
  }

})();
