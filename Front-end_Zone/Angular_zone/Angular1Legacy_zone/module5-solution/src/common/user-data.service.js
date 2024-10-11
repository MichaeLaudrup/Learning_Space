(function () {
    "use strict";
    
    angular.module('common')
    .service('UserDataService', MenuService);
    
    
    MenuService.$inject = [];
    function MenuService() {
      var service = this;
      service.saveUserData = function (userData) {
        service.userData = userData; 
        console.log(service.userData); 
      };

      service.getUserData = function () {
        return service.userData; 
      }
    
    }
})();