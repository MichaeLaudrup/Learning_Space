

const numCasillasPorLado = 15;
let actualDirection = ""; 
let gameVelocity = 200; 


/* VARIABLES QUE MANTIENEN DATOS PARA LA LOGICA DEL JUEGO */

let snakePositions = [{x:4,y:5}, {x:5,y:5}, {x:6,y:5},{x:7,y:5}, {x:8,y:5}]; 
let actualHeadSpanElement;   //Elemento html de tipo span que contiene la cabeza de la serpiente
let actualFoodPosition = {x:-1, y:-1}; 




/* ELEMENTOS QUE SE UTILIZARAN EN TODO EL DOM */
const tablero = document.querySelector('.tablero'); 

const initConfig = function(){
    tablero.innerHTML = ""; 
    let anchoTablero = (window.innerHeight * 0.7);
    tablero.style.width = `${anchoTablero}px`; 
    tablero.style.gridTemplateColumns = `repeat(${numCasillasPorLado}, 1fr)`; 
    montarTablero(); 
    pintarSerpiente(); 
    actualHeadSpanElement = document.querySelector(`span[data-col="${snakePositions[0].x}"][data-row="${snakePositions[0].y}"] `);
    actualHeadSpanElement.classList.add('snake-head'); 
}

const montarTablero = function () {
    for(let i = 0; i < numCasillasPorLado; i++){
        for(let j = 0; j < numCasillasPorLado; j++){
            nuevaCasilla = document.createElement('span'); 
            nuevaCasilla.classList.add('cell'); 
            nuevaCasilla.setAttribute('data-row', `${i}`);
            nuevaCasilla.setAttribute('data-col', `${j}`);
            tablero.insertAdjacentElement('beforeend', nuevaCasilla); 
        }
    }
}

const generarComida = function() {
    let coincidencia, randomX,randomY; 
    actualFoodPosition = []; 
    do{
        coincidencia = false; 
        randomX = Math.trunc(Math.random() * (numCasillasPorLado)); 
        randomY = Math.trunc(Math.random() * (numCasillasPorLado)); 
        snakePositions.forEach(point => {
            if((point.x === randomX) && (point.y === randomY)){
                coincidencia = true; 
            }
        }); 
    }while(coincidencia === true); 
    document.querySelector(`span[data-col="${randomX}"][data-row="${randomY}"]`).classList.add('apple'); 
    actualFoodPosition = {x: randomX, y:randomY}; 


}

const pintarSerpiente = function() {
    snakePositions.forEach(point => {
        document.querySelector(`span[data-col="${point.x}"][data-row="${point.y}"] `).classList.add('snake-cell');
    })
}


const updateSnake = function(eatFoodEspecialCase = false) {
    actualHeadSpanElement.classList.remove('snake-head');  //Se quita la cabeza de la ultima posicion y se deja como una parte de cuerpo normal
    actualHeadSpanElement = document.querySelector(`span[data-col="${snakePositions[0].x}"][data-row="${snakePositions[0].y}"] `);  //Se actualiza a nivel de datos la cabeza de la serpiente
    actualHeadSpanElement.classList.add('snake-cell', 'snake-head');  //Se aplica las clases css propias de una celda de la serpiente a la nueva posicion de la cabeza
    let actualSnakeLenght = snakePositions.length; 
    let actualTail = document.querySelector(`span[data-col="${snakePositions[actualSnakeLenght-1].x}"][data-row="${snakePositions[actualSnakeLenght-1].y}"] `);
   
    if(!eatFoodEspecialCase){
        snakePositions.pop(); 
        actualTail.classList.remove('snake-cell'); 
    }
}

const comprobePosition = function () {
    if((actualFoodPosition.x === snakePositions[0].x ) && (actualFoodPosition.y === snakePositions[0].y) ){
        document.querySelector(`span[data-col="${actualFoodPosition.x}"][data-row="${actualFoodPosition.y}"]`).classList.remove('apple'); 
        generarComida(); 
        updateSnake(true); 
    }else if([{x:4,y:5}, {x:5,y:5}, {x:6,y:5},{x:7,y:5}, {x:8,y:5}].includes({x:0,y:0})){

    }else{
        updateSnake(); 
    }
}
let actualInterval; 
document.addEventListener('keydown', function(e){
    if((actualDirection === "toDown" || actualDirection === "toUp") && (e.key.endsWith("Down") || e.key.endsWith("Up") )) return; 
    if((actualDirection === "toLeft" || actualDirection === "toRight") && (e.key.endsWith("Left") || e.key.endsWith("Right") )) return; 
    clearInterval(actualInterval); 
    snakePositions.unshift({x:snakePositions[0].x,y:snakePositions[0].y}); 
    let degrees = 0; 
    switch(e.key){
        case "ArrowDown":
            snakePositions[0].y = (snakePositions[0].y +1) % numCasillasPorLado; 
            degrees = 90; 
            actualDirection = "toDown"; 
        break; 
        case "ArrowUp":
            snakePositions[0].y = (snakePositions[0].y === 0) ? (numCasillasPorLado-1) : snakePositions[0].y -1; 
            degrees = 270; 
            actualDirection = "toUp"; 
        break; 
        case "ArrowLeft":
            snakePositions[0].x = (snakePositions[0].x === 0) ? (numCasillasPorLado-1) : snakePositions[0].x -1; 
            actualDirection = "toLeft"; 
            degrees = 180;
        break; 
        case "ArrowRight":
            snakePositions[0].x = (snakePositions[0].x+1) % numCasillasPorLado; 
            actualDirection = "toRight"; 
            degrees = 0;
        break; 
        default: 
    }
    document.documentElement.style.setProperty('--rotate-degrees',`${degrees}deg`); 
    comprobePosition(); 
    actualInterval = setInterval(timeGameLogic, gameVelocity);  
}); 

const timeGameLogic = function(){
    snakePositions.unshift({x:snakePositions[0].x,y:snakePositions[0].y}); 
    switch(actualDirection){
        case "toLeft": 
            snakePositions[0].x = (snakePositions[0].x === 0) ? (numCasillasPorLado-1) : snakePositions[0].x -1;  
        break; 
        case "toRight": 
            snakePositions[0].x = (snakePositions[0].x+1) % numCasillasPorLado; 
        break; 
        case "toUp": 
            snakePositions[0].y = (snakePositions[0].y === 0) ? (numCasillasPorLado-1) : snakePositions[0].y -1; 
        break; 
        case "toDown": 
            snakePositions[0].y = (snakePositions[0].y +1) % numCasillasPorLado; 
        break; 
        default: 
    }
    comprobePosition(); 
}


window.addEventListener('resize', initConfig); //Cada vez que se redimensione el navegador se recalcula ancho de tablero
initConfig(); 
generarComida();


