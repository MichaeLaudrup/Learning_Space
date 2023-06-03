
var test2 = function(x){

}


var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
var numbers = [0,1,2,3,4,5,6,7,8,9]; 
/**
 * 
 * @param {*} array 
 * @param {*} typeOfData 
 * @param {*} isReverse 
 */
var fillArray = function(array, typeOfData = 'letters', isReverse = false){

    console.log(arguments)
    if(typeof arguments[1] =="boolean") {
        isReverse = arguments[1];
        typeOfData = 'letters'
    }

    Array.from(arguments).forEach(arg => console.log(typeof arg))
    let possibleData = (typeOfData === 'letters') ? characters : numbers; 
    let lenght = possibleData.length; 

    for(let i = 0; i < 1000; i++){
        let randomPosition = Math.floor(Math.random() *lenght);  
        array.push(possibleData[randomPosition]); 
    }

    array = isReverse ? array.reverse() : array; 
    return array; 
}

console.log(fillArray([], 'numbers', true)); 
console.log(fillArray([], true)); 

var tester = function(functionCall){
    try{
        if(functionCall.includes('(')){  //Caso la funcion viene con parametros
            //Cogemos el nombre de la funcion
            let functionName = functionCall.slice(0, functionCall.indexOf('(')); 
            //Cogemos sus parametros
            let parameters = functionCall.slice(functionCall.indexOf('('), functionCall.indexOf(')')+1).replace(/\(/g,"").replace(/\)/g,"").replaceAll(/\"/g,"").split(','); 
            //Almacenamos la funcion en si misma en el plug-in
            tester.functionToTest = this[functionName];
            tester.functionName = functionName; 
            //Almacenamos los parametros de la funcion en el plug-in
            tester.params = parameters; 
        }else{  //Caso la funcion viene sin parametros
            tester.functionToTest = this[functionCall]; 
            tester.functionName = functionCall; 
            tester.params = []; 
        }  

        if(!tester.functionToTest){
            throw "No existe"
        }   
        else{
            tester.existFunction = true; 
        }     
    }catch(e){
        tester.existFunction = false; 
    }finally{
        return tester; 
    }
}

tester.assert = {
    existFunction: {
        test: function() {
            this.testResult = tester.existFunction; 
        },
        message: "Existe la función",
        testResult: undefined 
    },
    /* 
     * Comprobar si los parametros formales coinciden con los parametros actuales
     */
    noMissingParameters: {
        test: function () {
            this.testResult = (!tester.existFunction) ?  false : !(tester.functionToTest?.length === (tester.params.length+1)) ; 
            return tester; 
        },
        message: "Concordancia parámetro formales con parámetros actuales",
        testResult: undefined
    }




}

tester.testAndDisplay = function (){
    let tableBody = document.querySelector('tbody');
    
    for(test in tester.assert){
        let newRow = document.createElement('tr'); 
        let actualTest = tester.assert[test];
        actualTest.test(); 
        let testText = document.createElement('td'); 
        let testResult = document.createElement('td'); 
        testText.innerText = actualTest.message; 
        testResult.innerText = actualTest.testResult ? 'OK' : 'NO'; 
        newRow.insertAdjacentElement('afterbegin', testResult); 
        newRow.insertAdjacentElement('afterbegin', testText); 
        tableBody.insertAdjacentElement('beforeend',newRow); 
    }
}


tester('test2').testAndDisplay([],[]); 