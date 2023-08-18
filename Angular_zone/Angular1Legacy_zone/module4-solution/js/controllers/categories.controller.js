

angular.module('MenuApp').controller('CategoriesController', CategoriesController); 

CategoriesController.$inject = ['MenuDataService']; 

function CategoriesController(MenuDataService) {
    let ctrl = this; 
    MenuDataService.getAllCategories().then( categories => {
        ctrl.categories = categories; 
    })

    this.title = 'This are our food categories'; 
    
}