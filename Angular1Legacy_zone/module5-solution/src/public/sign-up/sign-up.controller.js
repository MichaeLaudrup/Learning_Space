(function () {
    "use strict";
    
    angular.module('public')
    .controller('signUpController', singUpController);
    
    singUpController.$inject = ['MenuService', 'UserDataService']; 
    function singUpController(MenuService, UserDataService) {
        this.processForm = function() {
            this.notFound = false; 
            if(this.user.favoriteMenu) {
                MenuService.getMenuItem(this.user.favoriteMenu).then( (data) => {
                    this.found = true; 
                    UserDataService.saveUserData(this.user); 
                })
                .catch( (err) => {
                    this.notFound = true; 
                })
            }
        }
    
    }
    
    })();