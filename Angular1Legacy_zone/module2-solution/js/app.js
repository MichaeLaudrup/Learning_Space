(function() {
    angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListService', ShoppingListCheckOffService)


    ToBuyController.$inject = ['ShoppingListService']
    function ToBuyController(ShoppingListService) {
        const  toBuyController = this; 
        toBuyController.toBuyItems = ShoppingListService.getToBuyItems(); 
        toBuyController.moveToAlreadyBought = function (index) {
            ShoppingListService.moveToAlreadyBought(index); 
        } 
    }

    AlreadyBoughtController.$inject = ['ShoppingListService']
    function AlreadyBoughtController(ShoppingListService) {
        const alreadyBoughtController = this; 
        alreadyBoughtController.alreadyBoughtItems = ShoppingListService.getAlreadyBoughtItems();
    }

    function ShoppingListCheckOffService() {
        const shoppingListService = this; 
        let toBuyItems = [
            { name: "cookies", quantity: 10 },
            { name: "jam", quantity: 3 },
            { name: "milk", quantity: 2 },
            { name: "sweet potatoes", quantity: 5 },
            { name: "kichen", quantity: 1 }
        ]; 
        let boughtItems = []; 

        shoppingListService.getToBuyItems = function() {
            return toBuyItems; 
        }
        shoppingListService.getAlreadyBoughtItems = function() {
            return boughtItems; 
        }

        shoppingListService.moveToAlreadyBought = function(index) {
            boughtItems.push(toBuyItems[index]);
            toBuyItems.splice(index, 1); 
        }

    }
})()