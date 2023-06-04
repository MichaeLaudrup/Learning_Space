(function () {
    angular.module('MenuApp', [
        'data',
        'ui.router'
    ])
    .config(RoutesConfig); 

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$qProvider']; 

    function RoutesConfig( $stateProvider, $urlRouterProvider, $qProvider){
        $qProvider.errorOnUnhandledRejections(false);
        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('home', {
                url: '/home', 
                templateUrl: "./views/home.html"
            })

            .state('categories', {
                url: '/categories', 
                templateUrl: "./views/categories.html",
                controller: 'CategoriesController as CategoriesCtrl'
            })
            
            .state('items', {
                url: '/items/{categoryShortName}',
                templateUrl: "./views/items-list.html",
                controller: 'ListItemsController as ItemsCtrl',
                resolve: {
                    items : ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
                        return MenuDataService.getItemsForCategory($stateParams.categoryShortName).then( items => items.data); 
                    }]
                }
            })
    }
})()