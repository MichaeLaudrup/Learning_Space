


////VARIABLES GLOBALES DEL JUEGO //////////////
let completado = 0; //Puntuacion inicial 
let actualDrag; 
let numElementos; 
let numLibros, numPlantas; 
let mascaraTableroAReflejar; 
let mascaraTableroJugar; 


const obtenerNumeroAleatorioEntreMaxMin = function (min, max){
    return Math.floor((Math.random() *( (max+1) - min) + min)); 
}


const rellenarTablero = function (){
    let listaCuadriculasTableroAReflejar = Array.from(document.getElementsByClassName('cuad-estatica'));  
    let conteoPlantas = 0; 
    let conteoLibros = 0; 
    let insertaPlanta = true; 
    while((conteoPlantas + conteoLibros) < numElementos){
        const posicionRandom = obtenerNumeroAleatorioEntreMaxMin(0,19); 
        if(!(mascaraTableroAReflejar[posicionRandom] === 1)){
            mascaraTableroAReflejar[posicionRandom] = 1; 
            listaCuadriculasTableroAReflejar[posicionRandom].insertAdjacentHTML(
                'afterbegin', 
                insertaPlanta ?  `<img class="drag-drop" src="./img/plant.png" alt="">` : `<img class="drag-drop"src="./img/books.png" alt=""></img>`
            ); 
            if(insertaPlanta) conteoPlantas++; 
            if(!insertaPlanta) conteoLibros++; 
            if(conteoPlantas === numPlantas) insertaPlanta = false; 
        }
    }
}

const rellenarPiezasDeslizables = function(){
    const contenedorPiezas = document.getElementById('contenedor-piezas'); 
    let insertarPlanta = true; 
    let conteo = 0; 
    while(conteo <( numLibros + numPlantas)){
        contenedorPiezas.insertAdjacentHTML(
            'afterbegin',
            insertarPlanta ?  `<img class="drag-drop" src="./img/plant.png" alt="">` : `<img class="drag-drop"src="./img/books.png" alt=""></img>`
        )
        conteo++; 
        if(conteo === numPlantas) insertarPlanta = false; 
    }
}


const calcularDatosIniciales = function(){

    //Se obtiene el numero de elementos (entre 8 y 12)
    numElementos = obtenerNumeroAleatorioEntreMaxMin(8,12);
    
    //Se distribuyen el num de elementos totales entre un numero aleatorio de libros y plantas
    numLibros = numElementos - (obtenerNumeroAleatorioEntreMaxMin(1,numElementos)); 
    numPlantas = numElementos - numLibros; 
    completado = 0; 


    //Se rellenan dos vectores con 20 posiciones puestas a cero representativas de los dos tableros
    mascaraTableroAReflejar = new Array(20).fill(0); 
    mascaraTableroJugar = new Array(20).fill(0); 

    rellenarTablero(); 

    rellenarPiezasDeslizables(numPlantas); 

    console.log('num elem: ', numElementos, 'num libros', numLibros, 'num plantas', numPlantas); 
    console.log(mascaraTableroAReflejar); 
}


calcularDatosIniciales(); 
////////////////////////////////IMPLEMENTACION DE DRAG AND DROP /////////////////////////////////////////////

const listaItems_drag_drop = document.getElementsByClassName('drag-drop'); 
const listaCuadriculasEscuchadoras = document.getElementsByClassName('cuad-drop'); 

Array.from(listaItems_drag_drop).forEach(element => {
    element.addEventListener('dragstart', e => {
        actualDrag = e.target; 
    })
});

Array.from(listaCuadriculasEscuchadoras).forEach(e => {
    e.addEventListener('dragover', e => {
        e.preventDefault(); 
    }); 

    e.addEventListener('drop', e => {
        console.log(e.target); 
        e.target.appendChild(actualDrag); 
    }); 
}); 
///////////////////////////////////////////////////////////////////////////////////////////////////////////