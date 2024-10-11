

const irAPortatiles = function (){
    window.location.href = '/portatiles.htm';
}


const irATelefonos = function (){
    window.location.href = '/phones.htm';
}



const irATelevisores = function (){
    window.location.href = '/tvs.htm';
}

window.addEventListener("load", () => {
   document.getElementsByClassName('spinner').item(0).classList.add('hidden');
   document.getElementsByClassName('hidden').item(0).classList.remove('hidden');  
})
