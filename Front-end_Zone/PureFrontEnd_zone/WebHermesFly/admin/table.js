

/* CONFIGURACION DEL SISTEMA */

let atributosActivados = [ 'title','first_name', 'last_name', 'gender', 'birthdate', 'age', 'hour' ]; 
let numColumnas = atributosActivados.length; //Numero columnas para correcto formateo a nivel estilo 

/* DATOS GLOBALES */
const cuerpoTabla = document.getElementById("cuerpo-tabla"); 
const cabeceraTabla = document.querySelector("#cabeceraCampos"); 
const urlBaseImagenes = "https://raw.githubusercontent.com/pixelastic/fakeusers/master/pictures/"; 
let datos; //Datos 

let ultimaModificacion = 'ninguna'; 

const cabeceraMostrarOcultar = document.querySelector(".filter-list");
const cabeceraOcultacion = function(){
    for(atributo of atributosActivados){
        let listItem = document.createElement('li');
        listItem.setAttribute('data-name', atributo);
        let listContent = document.createElement('span');
        listContent.innerText =embellecerTexto(atributo);
        listItem.insertAdjacentElement('afterbegin', listContent); 
        let listCheck = document.createElement('input');
        listCheck.setAttribute('type', 'checkbox');
        listCheck.setAttribute('checked', 'true');
        listItem.insertAdjacentElement('beforeend', listCheck); 
        cabeceraMostrarOcultar.appendChild(listItem);
    }
}

const crearBotonesCrud = function() {
    const botonesMarkup = `
        <td class="celda crud-cell" aria-colindex="6">
            <button onclick="editar(this)" data-modo="edicion">
                <span class="only-phone">Editar</span>
                <i class="las la-edit crud-icon"></i>
            </button>
        </td>
        <td class="celda crud-cell" aria-colindex="7">
            <button">
                <span class="only-phone">Suspender</span>
                <i class="las la-ban crud-icon"></i>
            </button>
        </td>
        <td class="celda crud-cell" aria-colindex="8">
            <button class="del-button" data-modo="eliminar">
                <span class="only-phone">Eliminar</span>
                <i class="las la-trash-alt crud-icon"></i>
            </button>
        </td>
        <td class="text-center crud-cell celda" aria-colindex="9">
           <span class="only-phone">Habilitar</span>
           <!-- Rounded switch -->
           <label class="switch">
               <input type="checkbox">
               <span class="slider round"></span>
           </label>               
        </td>
        `; 
    return botonesMarkup; 
}

const embellecerTexto = function (textoACambiar){
    return textoACambiar.split('_').map(palabra => palabra[0].toUpperCase()+palabra.slice(1)).join(' '); 
}

cabeceraOcultacion();
const cargarDatosTabla = function(usuarios, inicio = 1, fin = longitudPaginado){
    if(ultimaModificacion === 'ordenacion'){
        usuarios = datosOrdenados; 
    }else if(ultimaModificacion === 'filtrado'){
        //contenedorPaginas.innerHTML = ""; 
        usuarios = datosFiltrados; 
        //paginacionInicial(usuarios,1,3,paginaActual);
    }
    for(let index = inicio-1; (index < fin) && (index < usuarios.length); index++){
        const objetoUsuario = usuarios[index]; 
        const nuevaFilaDatos = document.createElement('tr'); 
        nuevaFilaDatos.classList.add('fila');
        nuevaFilaDatos.setAttribute('role', 'row');  
        nuevaFilaDatos.setAttribute('aria-rowindex', index+1 );
        let cuenta = 1; 
        for(let atributoActual of atributosActivados){
            let celda = document.createElement('td');
            celda.setAttribute('role', 'cell'); 
            celda.setAttribute('aria-colindex', cuenta); 
            cuenta++; 
            celda.classList.add('celda', `${atributoActual}-cell`); 
            celda.setAttribute('headers', atributoActual);
            
            //Algunos campos requieren tratamiento especial
            switch(atributoActual){
                case 'picture':
                    let pictureElement = document.createElement('picture'); 
                    let img = document.createElement('img'); 
                    img.setAttribute('src', urlBaseImagenes+objetoUsuario.picture );
                    img.classList.add('user-img');  
                    pictureElement.append(img); 
                    celda.append(pictureElement); 
                    break; 
                case 'birthdate': 
                    let fecha = new Date(+objetoUsuario[atributoActual]*1000); 
                    let fechaTexto =  ("0"+fecha.getDate()).slice(-2) + "/" + ("0" + (fecha.getMonth()+1)).slice(-2) + "/" + fecha.getFullYear(); 
                    celda.innerHTML =fechaTexto; 
                break; 
                default: 
                    celda.innerText = objetoUsuario[atributoActual]; 
            }
            nuevaFilaDatos.insertAdjacentElement('beforeend', celda); 
        } 
        nuevaFilaDatos.insertAdjacentHTML('beforeend',crearBotonesCrud(index));
        cuerpoTabla.appendChild(nuevaFilaDatos);
    } 
}

const insertarCabecera = function() {
    let numColumn = 1; 
    const filaCabeceraTabla = document.querySelector('#cabeceraCampos');
    for(let nombreCabecera of atributosActivados){
        const tableHead = document.createElement('th'); 
        tableHead.id = nombreCabecera; 
        tableHead.setAttribute('aria-colindex', numColumn); 
        tableHead.classList.add('head-cell', `${nombreCabecera}-cell`, 'celda'); 
        tableHead.setAttribute('rowspan', "2"); 
        tableHead.innerText = embellecerTexto(nombreCabecera); 
        filaCabeceraTabla.insertAdjacentElement('beforeend',tableHead);
        tableHead.innerHTML += `
            <i class="las la-sort ico-ordenacion iconoActivo" no-order data-num-buttom="0"></i>
            <i class="las la-sort-alpha-down ico-ordenacion" asc data-num-buttom="1"></i>
            <i class="las la-sort-alpha-down-alt ico-ordenacion" des data-num-buttom="2"></i>`; 
        //CASO ESPECIAL DONDE SE INSERTA EN LA COLUMNA UN TIPO DE ORDENACION
        switch(nombreCabecera){
            case 'picture':
                tableHead.dataset.typeOrder = 'no-order';  
                break;
            case 'birthdate':
                tableHead.dataset.typeOrder = 'date'; 
                break; 
            case 'age':
                tableHead.dataset.typeOrder = 'number';  
                break;
            case 'hour':
                tableHead.dataset.typeOrder = 'hour';  
                break;  
            default: 
                tableHead.dataset.typeOrder = 'text';  
        }
        numColumn++; 
    }
    const headAcciones = document.createElement('th'); 
    headAcciones.setAttribute('colspan',"4"); 
    headAcciones.classList.add('celda','head-cell', 'text-center'); 
    headAcciones.innerText = "Acciones"; 
    filaCabeceraTabla.insertAdjacentElement('beforeend', headAcciones); 
}


const limpiarTabla = function (){
    cuerpoTabla.innerHTML = ""; 
}

/* IMPLEMENTACION DE LA PAGINACION */
let longitudPaginado = 10; 
let numPaginas = 0; 
let contenedorPaginas = document.querySelector('.pages');
let paginaPrevia; 
let paginaActual = 1; 


const paginacionInicial = function (datos, ini, fin, actual) {
    const numRegistros = (ultimaModificacion === 'filtrado') ? datosFiltrados.length : (ultimaModificacion === 'ordenacion')  ? datosOrdenados.length : datos.length;
    numPaginas = Math.ceil(numRegistros/longitudPaginado);
    //Control de casos especiales

    if(ini === 0) ini = 1; 
    if(numPaginas === 1) ini = fin = 1; 
    if(numPaginas === 2) {fin = 2}; 
    for(let i = fin; i >= ini; i--){
        let paginaActual = (i === actual);
        let paginaDisparadora = (i === ini || i === fin); //Se determina si la pagina dispara una reorganizacion del control de paginas 
        contenedorPaginas.insertAdjacentElement('afterbegin', dameCajonPagina(i, paginaActual, paginaDisparadora)); 
    }
}


/**
 * Este metodo crea una elemento span con un numero de pagina dentro con el fin de facilitar
 * la construccion esquematica y los eventos propios de la paginacion, tambien se encarga
 * de establecer en cada uno de estos elementos la logica propia del evento que se dispara
 * al hacer clic en una determinada pagina
 * @param { number } num -  Numero de la pagina dentro del span
 * @param { boolean} esPaginaSeleccionada - Indica si el boton de la pagina que sea crea es la seleccionada (para marcarla de rojo)
 * @param { boolean} esPagDisparadora - Indica si la pagina hace que se dispare reactualizacion del componente de control de paginacion
 * @returns 
 */
const dameCajonPagina = function (num, esPaginaSeleccionada = false, esPagDisparadora = false){
    const span = document.createElement('span');
    span.innerHTML = num; 
    if(esPaginaSeleccionada){  //Si es la pagina seleccionada del usuario se le marca de un color para que sea visible que es la seleccionada
        span.classList.add('actual-page'); 
        paginaPrevia = span; //Se dice que esta pagina es la previamente seleccionada para futuros controles
    }
    span.addEventListener('click', function(e) {
        limpiarTabla(); 
        paginaActual = num; 
        if(num === 1){  //Si se hace click en la pagina 1 se reactualiza el controlador de paginacion al estado inicial
            contenedorPaginas.innerHTML = ""; 
            paginacionInicial(datos, 1, 3, 1); 
        }else if(num === numPaginas){
            contenedorPaginas.innerHTML = ""; 
            paginacionInicial(datos, numPaginas-2, numPaginas, num); 
        }else{
            if(esPagDisparadora) {
                contenedorPaginas.innerHTML = ""; 
                paginacionInicial(datos, num-1, num+1, num); 
            }else{
                paginaPrevia.classList.remove('actual-page'); 
                span.classList.add('actual-page'); 
            }
        } 
        const inicio = (num===1) ? 1 : ((num-1)*longitudPaginado+1); 
        const fin = inicio + longitudPaginado-1; 
        cargarDatosTabla(datos, inicio, fin); 
        reajustarColumnas(); 
    }); 
    return span; 
}

const irPaginaPrevia = function(){
    if(paginaActual === 1) return; 
    if(paginaActual === numPaginas) contenedorPaginas.children[1].click(); 
    else contenedorPaginas.children[0].click(); 
}

const siguientePagina = function(){
    if(paginaActual === numPaginas) return; 
    if(paginaActual === 1) contenedorPaginas.children[1].click(); 
    else contenedorPaginas.children[2].click(); 
}

const primeraPagina = function() {
    limpiarTabla(); 
    cargarDatosTabla(datos); 
    contenedorPaginas.innerHTML = ""; 
    paginacionInicial(datos,1,3,1); 
}

const ultimaPagina = function() {
    limpiarTabla(); 
    cargarDatosTabla(datos); 
    contenedorPaginas.innerHTML = ""; 
    paginacionInicial(datos,numPaginas-2,numPaginas,1, numPaginas); 
    contenedorPaginas.children[2].click(); 
}


/* SISTEMA DE REAJUSTE DE NUMERO DE REGISTROS */

const updatePageSize = function(event) {
    if (longitudPaginado === event.target.value) return; //Si tiene el mismo valor que la anterior longitud de pagina no se hace nada  
    longitudPaginado = +event.target.value; 
    limpiarTabla(); 
    contenedorPaginas.innerHTML = ""; 
    cargarDatosTabla(datos); 
    paginacionInicial(datos, 1,3, 1); 
}

/* =================================================
             FIN PARTE DE PAGINACION 
======================================================*/



const solicitarDatos = function() {
    const request = new XMLHttpRequest(); 
    request.open('GET', 'http://127.0.0.1:5500/admin/data.json' ); 
    request.send(); 
    request.addEventListener('load', function(){
       datos = JSON.parse(this.responseText);
       insertarCamposCalculados(datos);  
       cargarDatosTabla(datos); 
       insertarCabecera(); 
       reajustarColumnas();  
       paginacionInicial(datos, 1, 3, 1); 
    });
}

solicitarDatos(); 

const insertarCamposCalculados = function(datosBase){
    datosBase.forEach(usuario => {
        usuario.age = calcularEdad(usuario.birthdate);
        usuario.hour = calcularHora(usuario.birthdate); 
    }); 
}

const calcularEdad = function(ticksPerSecond) {
    let today = new Date(); 
    let birthDate = new Date((+ticksPerSecond) * 1000); 
    let edad = today.getFullYear() - birthDate.getFullYear(); 
    let mes = today.getMonth - birthDate.getMonth(); 
    if(mes < 0 || (mes === 0 && today.getDate() < birthDate.getDate()))  age--; 
    return edad; 
}

const calcularHora = function(ticksPerSecond) {
    let date = new Date(ticksPerSecond*1000);
    let hour = ("0" +date.getHours()).slice(-2); 
    let minuts = ("0" + date.getMinutes()).slice(-2);  
    return `${hour}:${minuts}`;
}


const buscarReglaConSelector = function (selectorBuscado){
    let i = 0; 
    listaReglas =  Array.from(document.styleSheets[3].cssRules); 
    while(i < listaReglas.length){
        if(listaReglas[i].selectorText === selectorBuscado)
            return listaReglas[i];
        i = i +1;  
    }
}

/* OPERACIONES DE FILTRADO DE COLUMNAS */
let reglas = {}; 


const buscarReglasCssParaColumnas = function() {
    const hojaEstilo = document.styleSheets[3];
    atributosActivados.forEach( atributo => {
        let index = hojaEstilo.insertRule(`[headers="${atributo}"] , #${atributo} { display: ''}`); 
        reglas[atributo] = hojaEstilo.cssRules[index];
    }); 
}

buscarReglasCssParaColumnas(); 

const reajustarColumnas = function() {
    Array.from(document.querySelectorAll('.head-cell')).forEach( headCell => {
        headCell.style.width = `${100/numColumnas}%`;  
    }); 
    Array.from(document.querySelectorAll('tfoot td')).forEach(celda => {
        celda.setAttribute('colspan', numColumnas+4); 
    });
}


document.querySelector('.filter-list').addEventListener('click', function(event){
    if(event.target.nodeName === 'UL') return; //Si el elemento donde se hizo click no es span, input no nos interesa
    let listItem = (event.target.nodeName !== 'LI') ?  event.target.parentElement: event.target; 
    if(event.target.nodeName !== 'INPUT') {
        let estadoCheck = listItem.querySelector('[type="checkbox"]'); 
        estadoCheck.checked = !estadoCheck.checked ;  
    }
    let nombreCampoOcultar = listItem.dataset.name;

    if(reglas[nombreCampoOcultar].style.display === 'none'){
        reglas[nombreCampoOcultar].style.display = ''; 
        numColumnas++; 
    }else{
        reglas[nombreCampoOcultar].style.display = 'none'; 
        numColumnas--; 
    }
    reajustarColumnas();  
}); 



/* SISTEMA DE ORDENACION */

let datosOrdenados = []; 

const actualizarBotonOrdenacion = function(botonOrdenacion){
    botonOrdenacion.style.display = 'none'; 
    botonOrdenacion.classList.toggle('iconoActivo');
    let numeroSiguienteBoton = ((+botonOrdenacion.dataset.numButtom) + 1) % 3;
    let siguienteBoton = botonOrdenacion.parentElement.querySelector(`[data-num-buttom="${numeroSiguienteBoton}"]`); 
    siguienteBoton.style.display = 'inline-block'; 
    siguienteBoton.classList.toggle('iconoActivo');

}
let criteriosOrdenacion = []; 

const comparadorStandard = function( a, b ){
    return a === b?0:a < b?-1:1;
}

const ordenacionCompleja = function() {
    let copiaDatos = (datosFiltrados.length === 0) ? datos.slice() : datosFiltrados; 
    copiaDatos.sort( (a,b) => {
        for(let numCampo = 0; numCampo < criteriosOrdenacion.length; numCampo++){
            let { comparador, nombreCampo, orden  } = criteriosOrdenacion[numCampo];
            if( comparador === undefined )
                comparador = comparadorStandard;
            let comparacion = comparador(a[nombreCampo],b[nombreCampo]);
            if(comparacion !== 0) {
                return comparacion*orden; 
            }
        }
        return 0;
    }); 
    return copiaDatos; 
}

let ordenOrdenacion = []; 

const cabeceraCampos = document.getElementById('cabeceraCampos'); 
cabeceraCampos.addEventListener( 'click', function (event){
        if(!event.target.classList.contains('ico-ordenacion')) return; //Si no es un click a un icono de ordenacion se ignora el evento
        criteriosOrdenacion = []; 
        actualizarBotonOrdenacion(event.target);
        //CODIGO PARA CONTROLAR EL ORDEN EN EL QUE SE VAN EJECUTANDO LOS CAMPOS
        if(!ordenOrdenacion.includes(event.target.parentElement.id)) ordenOrdenacion.push(event.target.parentElement.id); 
        else if(event.target.hasAttribute('des'))  ordenOrdenacion.splice(ordenOrdenacion.indexOf(event.target.parentElement.id),1 ); 
        datosOrdenados = datos.slice(); //Se copian los datos en otro vector para desvincular las ordenaciones de los datos originales
        arrayCeldasCabecera = cabeceraCampos.children; 
        for(let i = 0; i < (arrayCeldasCabecera.length-1); i++){
            let nuevoCriterioOrdenacion = {}; 
            celdaActual = arrayCeldasCabecera[i]; 
            let iconoActual = celdaActual.querySelector('.iconoActivo');  
            if(!celdaActual.hasAttribute('asc') && !iconoActual.hasAttribute('no-order')){ //Si el icono actual de ordenacion tiene al atributo asc significa que esa columna no tiene ordenacion
                nuevoCriterioOrdenacion.nombreCampo = celdaActual.id; 
                nuevoCriterioOrdenacion.orden = iconoActual.hasAttribute('asc') ? 1 : -1; 
                criteriosOrdenacion.push(nuevoCriterioOrdenacion);  
            }
        }
        limpiarTabla(); 
        reordenarCampos(); 
        if(criteriosOrdenacion.length !== 0){ //Si hay algo que ordenar pues se procede a hacer la ordenacion
            datosOrdenados = ordenacionCompleja(); 
        }else{
            if(datosFiltrados.length !== 0){
                datosOrdenados = datosFiltrados; 
            }
        }
        //Despues de ordenarlos vamos a la pagina actual
        const inicio = (paginaActual===1) ? 1 : ((paginaActual-1)*longitudPaginado+1); 
        const fin = inicio + longitudPaginado-1; 
        ultimaModificacion = 'ordenacion'; 
        cargarDatosTabla((datosOrdenados.length === 0) ? datos : datosOrdenados, inicio,fin ); 
}); 


const reordenarCampos = function() {
    let resultadoFinal = [];
    for(indiceCampo in ordenOrdenacion){
        let criterioBuscado = criteriosOrdenacion.find( element => element.nombreCampo === ordenOrdenacion[indiceCampo]); 
        resultadoFinal.push(criterioBuscado); 
    } 
    criteriosOrdenacion = resultadoFinal; 
}




datosFiltrados = []; 
const inputBuscador = document.querySelector('[name="search"]'); 

inputBuscador.addEventListener('keyup', function(){
    const filtradoActual = this.value.toLowerCase(); 
    datosFiltrados = []; 
    datos.forEach( usuario => {
        if(usuarioContienePalabraClave(usuario, filtradoActual)){
            datosFiltrados.push(usuario); 
        }
    }); 
    limpiarTabla(); 
    ultimaModificacion = (datosFiltrados.length !== 0 ) ? 'filtrado' : 'ninguno'; 
    cargarDatosTabla(datosFiltrados); 
    contenedorPaginas.innerHTML = ""; 
    if(datosFiltrados.length === 0){
        paginacionInicial(datosFiltrados,1,3,1); 
    }else{
        paginacionInicial(datos, 1,3,1)
    }
    contenedorPaginas.children[0].click(); 
});


const usuarioContienePalabraClave = function(usuario, palabraClave) {
    for(propiedad of atributosActivados){
        if(propiedad === 'birthdate'){
            let fecha = new Date(usuario[propiedad].birthdate*1000); 
            var atributoActual = ("0" + fecha.getDate).slice(-2) + ("0" + fecha.getDate()).slice(-2) + fecha.getFullYear(); 
        } else{
            var atributoActual = usuario[propiedad].toString().toLowerCase();
        }
       if(atributoActual.indexOf(palabraClave) !== -1){
             return true; 
       }
    } 
    return false; 
}

let modoEditar = true; 
let filaEnEstadoNormal; 
const editar= function(e){
    if(modoEditar){
        modoEditar = false; 
        const rowElement = e.parentElement.parentElement; 
        const listadoCeldasFila = Array.from(rowElement.querySelectorAll('td'));
        filaEnEstadoNormal = listadoCeldasFila; 
        for(let i = 0; i < atributosActivados.length; i++){
            let data = listadoCeldasFila[i].innerText; 
            listadoCeldasFila[i].innerHTML = `<input class="edition-input" type="text" value="${data}"></input>`; 
        } 
        e.querySelector('i').classList.remove('la-edit'); 
        e.querySelector('i').classList.add('la-save'); 
        let nuevoBoton = document.createElement('button');
        nuevoBoton.onclick = editar; 
        let nuevoIcono = document.createElement('i'); 
        nuevoIcono.classList.add('las', 'la-window-close', 'crud-icon');
        nuevoIcono.onclick = editar; 
        nuevoBoton.append(nuevoIcono) 
        e.append(nuevoBoton); 
    }else{
        modoeditar =true; 
       
    }
}
