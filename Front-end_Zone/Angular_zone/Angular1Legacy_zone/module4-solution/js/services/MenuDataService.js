
MenuDataService.$inject = ['$http'];
function MenuDataService($http) {
    this.getAllCategories = function () {
        return $http.get('https://davids-restaurant.herokuapp.com/categories.json'); 
    }

    this.getItemsForCategory = function (categoryShortName) {
        return $http.get('https://davids-restaurant.herokuapp.com/menu_items.json?category=' + categoryShortName); 
    }
}

angular.module('data').service('MenuDataService', MenuDataService); 