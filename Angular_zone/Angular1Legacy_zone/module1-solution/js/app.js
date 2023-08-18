(function() {
    'use strict'; 
    angular.module('LunchCheck', [])
    .controller('LunchCheckController', lunchCheckController);

    lunchCheckController.$inject = ['$scope']; 
    function lunchCheckController ($scope) {
        $scope.textInput = "";
        $scope.message = ""; 

        $scope.processTextInput = function () {
            let elements = $scope.textInput.split(','); 
            let numElements = 0; 
            elements.forEach(element => {
                if(element.trim() !== "") {
                    numElements++; 
                }
            })
            $scope.message = (numElements === 0) ? 'Please enter data first' : ((numElements <= 3 ? 'Enjoy!' :'Too much!') );
        }
    }
})()