
    /* ======================================================================== */
    /* ======================== SLIDER BANNER PUBLICITARIO===================== */
    /* ======================================================================== */
    var countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
    const arraySlider = Array.from(document.getElementsByClassName('slider'));       //Se carga una unica vez todos los slider en un array
    const arrayPuntos = Array.from(document.getElementsByClassName('slider-point')); //Se cargan todos los botones del slider en un array
    
    let sliderActual = 0; //Se establece que inicialmente el slider es el mas a la izquierda

   const moverA = function(sliderPrevio){
        //Por cada slider lo desplazamos a la configuracion slider-x tal que x indica mediante css que slider se va a mostrar ahora (0,1 o 2)
        arraySlider.forEach( slider => {
            slider.classList.add(`slider-${sliderActual}`);
            slider.classList.remove(`slider-${sliderPrevio}`); 
        }); 
        cambiarPunto(sliderPrevio); 
   }

    function moverDerecha () {
        const sliderPrevio = sliderActual; 
        sliderActual = (sliderActual+1)% 3; 
        moverA(sliderPrevio); 
    }

    const moverIzquierda = function () { 
        const sliderPrevio = sliderActual; 
        sliderActual = sliderActual -1; 
        if(sliderActual === -1) sliderActual = 2; 
        moverA(sliderPrevio); 
    }

    const cambiarPunto = function (numSliderPrevio){
        arrayPuntos.forEach((punto, numPunto) =>{
            if(numPunto === sliderActual) punto.classList.add('slider-point--active'); 
            if(numPunto === numSliderPrevio) punto.classList.remove('slider-point--active'); 
        }); 
    } 
    
    const moverAlPunto = function (number){
        const sliderPrevio = sliderActual; 
        sliderActual = number; 
        esperarTiempoPrudencial=true; 
        moverA(sliderPrevio); 
    }

    document.getElementById('left-arrow').addEventListener('click', function(e)  {
        esperarTiempoPrudencial = true; 
        moverIzquierda(); 
    }); 
    document.getElementById('right-arrow').addEventListener('click', function(e) {
        esperarTiempoPrudencial = true; 
        moverDerecha(); 
    }); 

    document.getElementById('contenedor-banner').addEventListener("mouseover", function(e){
        pausa=true; 
    }); 

    document.getElementById('contenedor-banner').addEventListener("mouseout", function(e){
        pausa=false; 
    });



    /* *********** IMPLEMENTACION MOVIMIENTO A LO LARGO DEL TIEMPO Y BOTON PLAY PAUSE */
    let pausa = false; //Inicialmente ha pausa
    let esperarTiempoPrudencial = true; 
    let movimientoIzqADer = true; 

    const movimiento = function() {
        if(!pausa){
            if(!esperarTiempoPrudencial){
                if(sliderActual === 2 || (sliderActual === 1 && !movimientoIzqADer)){
                    moverIzquierda(); 
                } else if(sliderActual === 0){
                    moverDerecha(); //Si el slider actual es el primero entonces vamos al del medio
                }else if(sliderActual === 1 && movimientoIzqADer){
                    moverDerecha(); 
                }
                if(sliderActual === 2) movimientoIzqADer = false; 
                if(sliderActual === 0) movimientoIzqADer = true; 
            }
            esperarTiempoPrudencial = false; 
        }
        setTimeout(movimiento, 10000); // Change image every 10 seconds
    }
    movimiento();

    /* ======================================================================== */
    /* ======================== NAVEGADOR DEL MOVIL =========================== */
    /* ======================================================================== */
    const botonMovil = document.getElementsByClassName("btn-mobile-nav")[0]; 
    botonMovil.addEventListener('click', (e) =>  {
        document.getElementsByClassName('contenedor-cabecera')[0].classList.toggle('nav-open'); 
    }); 

    const hideCookie = function(){
        document.getElementById('cookie-message').style = 'display:none'; 
    }
    
    const getDataAndUpdateList = function (element) {
            let regex = element.value;
            if(regex.length < 3){
                searchResultsList.innerHTML = ""; 
                return; 
            } 

            let separatedWords = regex.split('+')
            regex = separatedWords[0]; 


            const request = new XMLHttpRequest(); 
            request.open('GET', `https://islavisual.com/api?q=${regex}&format=json&action=search` ); 
            request.send(); 
            request.addEventListener('readystatechange', function(){
               
               if(this.readyState ===4 && this.status === 200){
                    datos = this.responseText;
                    datos = JSON.parse(datos).results; 
                    if(separatedWords.length > 1){
                        let secondWord = separatedWords[1]; 
                        datos = datos.filter( resultado => {
                            if(resultado.source.indexOf(secondWord) === -1){
                                return false;
                            } else{
                                console.log(resultado.source)
                                return true; 
                            }  
                        })
                    }
                    
                    if(datos.length !== 0){
                        updateList(datos, regex); 
                    }else{
                        searchResultsList.innerHTML = ""; 
                    }
               }  
            });
    }
    let searchResultsList = document.querySelector('.search-results > ul'); //PONER AQUI TU PROPIO ELEMENTO
    let searchBar = document.querySelector('.nav__search-input');
    let actualRow = 0; 

    const updateList = function (datos, regex) {
        searchResultsList.style.display = "";
        searchResultsList.innerHTML = ""; 
        var xCount = 0;
        datos.forEach( item => {
            if(xCount > 10) return;
            if(item.source.indexOf(regex) != -1){
                let new_li_item = document.createElement(`li`); 
                if(xCount === 0) new_li_item.classList.add('list__li-search--active');  
                new_li_item.innerHTML = item.source.replace(/-/g, " ").replace(/\.php/ig, '').replace(new RegExp(regex, 'ig'), '<b>' + regex + '</b>'); 
                searchResultsList.appendChild(new_li_item);
                actualRow = 0;  
                new_li_item.onclick =  function(e) {
                    var input = e.target.closest('div').previousElementSibling.previousElementSibling;
                    input.value = e.target.innerText;
                    searchResultsList.style.display = "none"; 
                    setTimeout(function(){this.focus(); }.bind(input), 150);
                }
                xCount++;
            }
        });
    }


    
    const navigateSearchResultList = function(event) {      
        let previous = actualRow; 
        searchResultListItems =  searchResultsList.querySelectorAll("li"); 
        if(event.keyCode === 38){ //Flecha arriba
           event.preventDefault(); 
           if(actualRow === 0)
               actualRow = 10; 
           else 
               actualRow--; 
        }else if(event.keyCode === 40){ // Flecha abajo
            event.preventDefault(); 
           if(actualRow === 10)
               actualRow = 0; 
           else 
               actualRow++; 
        }else if(event.keyCode === 13 ){ //Pulsacion tecla enter
            event.preventDefault(); 
            event.target.value = searchResultListItems[actualRow].innerText;
            searchResultsList.style.display = "none";  
        }else if(event.keyCode === 8){
            getDataAndUpdateList(event.target)
        }else{
            return; 
        }

        searchResultListItems[previous]?.classList.remove('list__li-search--active');
        searchResultListItems[actualRow]?.classList.add('list__li-search--active');
    }

    const hiddeSearchResults = function(){
        searchResultsList.innerHTML = ""; 

    }



    /* TESTING ZONE */
    let datos; 
    var test1 = function (cssSelector) {
        datos = []; 
        const divs = Array.from(document.querySelectorAll(cssSelector)); 
        for(let i = 0; i < divs.length; i++){
            let div = divs[i]; 
            datos.push(div.innerHTML); 
        }

        return datos.length;
    }

    var test2 = function(cssSelector) {
        datos = [];
        const divs =  Array.from($(cssSelector)); 
        divs.forEach(div => {
            datos.push(div.innerHTML); 
        }); 
        return datos.length; 

    }
/*     console.time('test1 [Selector CSS con JS Vanilla]')
    test1('div');
    console.timeEnd('test1 [Selector CSS con JS Vanilla]')
    console.time('test2 [Selector CSS con JQuery]')
    test2('div')
    console.timeEnd('test2 [Selector CSS con JQuery]')
 */

    


    let tF = function(functionSelector) {
        if(functionSelector.includes('(')){  //Caso la funcion viene con parametros
            //Cogemos el nombre de la funcion
            let functionName = functionSelector.slice(0, functionSelector.indexOf('(')); 
            //Cogemos sus parametros
            let parameters = functionSelector.slice(functionSelector.indexOf('('), functionSelector.indexOf(')')+1).replace(/\(/g,"").replace(/\)/g,"").replaceAll(/\"/g,"").split(','); 
            //Almacenamos la funcion en si misma en el plug-in
            tF.functionToTest = this[functionName];
            tF.functionName = functionName; 
            //Almacenamos los parametros de la funcion en el plug-in
            tF.params = parameters; 
        }else{  //Caso la funcion viene sin parametros
            tF.functionToTest = this[functionSelector]; 
            tF.functionName = functionSelector; 
            tF.params = []; 
        }  
        return tF; 
    }

    

    tF.test = function() {
        switch(tF.functionName){
            case 'test1':
            case 'test2':
                let numElementsDOM = document.querySelectorAll(tF.params[0]).length; 
                let numElementsTest= tF.functionToTest(tF.params[0]);
                console.log(numElementsDOM, numElementsTest);   
                if(numElementsDOM === numElementsTest) return 'OK'
            break; 
            default: 
                console.log('No test case specified'); 
        }
        
    }

/*     let test1Plug = tF('test1("div")');
    let test2Plug = tF('test2("div")');  
    console.log(test1Plug.functionToTest, test1Plug.params)
    console.log(test2Plug.functionToTest, test2Plug.params)
    console.log(test1Plug.test()); 
    console.log(test2Plug.test()) */




    
   








