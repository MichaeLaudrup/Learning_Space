angular.module('MenuApp').controller('ListItemsController', ListItemsController); 

ListItemsController.$inject = ['items']; 
function ListItemsController(items) {
    console.log(items)
    this.items = items.menu_items; 
}