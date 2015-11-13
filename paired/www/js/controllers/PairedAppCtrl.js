(function(){
angular.module('pairedModule').controller('PairedAppCtrl',PairedAppCtrl);

//PairedAppCtrl.$inject = ['$cordovaDevice'];

  function PairedAppCtrl($scope){

          //document.addEventListener("deviceready", initDevice, false);

          function initDevice(){
            alert('initDevice');
                    }
  }

})();
