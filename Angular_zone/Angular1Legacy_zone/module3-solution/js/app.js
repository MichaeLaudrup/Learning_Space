(function(){
    var module = angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('menuSearchService', MenuSearchService)
        .directive('foundItems', FoundItemsDirective)
        .constant('APIBasePath', 'https://davids-restaurant.herokuapp.com' )
    
    NarrowItDownController.$inject = ['$scope', 'menuSearchService']
    function NarrowItDownController($scope, menuSearchService) {
        this.searchText = 'egg'; 
        this.found = [];
        this.showMessage = false; 

        this.processQuery = function(){
            if(this.searchText === "" || this.searchText === undefined) {
                this.showMessage = true; 
                this.found = []; 
                return; 
            }; 

            menuSearchService.getMatchedMenuItems(this.searchText).then( this.updateList.bind(this))
        }
        this.updateList = function (list) {
            this.found = list;
            if(this.found.length === 0){
                this.showMessage = true
            }  
        }

        this.removeItem = function (index) {
            this.found.splice(index,1); 
        }
    }

    MenuSearchService.$inject = ['$http', 'APIBasePath']; 
    function MenuSearchService($http, APIBasePath){

        this.getMatchedMenuItems = function (searchTerm) {
            const requestOptions = {
                method: 'GET', 
                url: APIBasePath + '/menu_items.json',
                params: {searchTerm},
            }
            return $http(requestOptions).then( function ({data}) {
                if(data.menu_items.length > 0){
                    return data.menu_items.filter( function (menuItem){
                        return menuItem.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
                    })
                }
            })
        }
    }

    function FoundItemsDirective() {
        const ddo = {
            templateUrl: 'views/foundItems.html',
            scope: {
                foundItems2: '<',
                onRemove: '&',
            },

        }
        return ddo; 
    }

})()