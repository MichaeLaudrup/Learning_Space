(function () {
    "use strict";
    
    angular.module('public')
    .controller('myInfoController', myInfoController);
    
    myInfoController.$inject = ['UserDataService', 'MenuService']; 
    function myInfoController( UserDataService, MenuService) {
        var $ctrl = this; 
        this.init = function() {
            $ctrl.userData = UserDataService.getUserData(); 
            if($ctrl.userData && $ctrl.userData.favoriteMenu) {
                MenuService.getMenuItem($ctrl.userData.favoriteMenu).then( (data) => {
                    this.menuItemloaded = data.data; 
                })
            }
        }
    
    }
    
    })();