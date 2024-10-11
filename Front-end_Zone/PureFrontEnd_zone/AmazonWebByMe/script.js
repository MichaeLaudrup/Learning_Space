
//DOM ELEMENTS SELECTION
let headBand_sliders = document.querySelector('.slider-headband');

let actualSlider = 1; 


const goToSlider = function(numActualSlider, numPreviousSlider) {
    headBand_sliders.classList.remove(`slider-${numPreviousSlider}-active`); 
    headBand_sliders.classList.add(`slider-${numActualSlider}-active`); 
}


const previousSlider = function () {
    if(actualSlider === 1) return; 
    let lastSlider = actualSlider; 
    actualSlider = lastSlider-1; 
    goToSlider(actualSlider, lastSlider); 

}

const nextSlider = function () {
    if(actualSlider === 3) return; 
    let lastSlider = actualSlider; 
    actualSlider = lastSlider+1; 
    goToSlider(actualSlider, lastSlider); 
}

const hideSpecialMenu = function(x){
    x.classList.remove("special-menu-open"); 
    shadow.setAttribute('on','false');
    document.querySelector('body').style.overflowY = 'scroll'; 
}


let specialMenu = document.querySelector('.special-menu'); 
const shadow = document.querySelector('.shadow'); 
const showSpecialMenu = function(){
    specialMenu.classList.add("special-menu-open"); 
    shadow.setAttribute('on','true'); 
    document.querySelector('body').style.overflowY = 'hidden'; 
}
