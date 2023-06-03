

carrousel_of_tabs = document.querySelector('.tab-carrousel'); 
let actualTab = 1; 

const goToTab = function(actualTab, previousTab){
    carrousel_of_tabs.classList.remove(`page-${previousTab}`)
    carrousel_of_tabs.classList.add(`page-${actualTab}`)
}

const previousTab = function(e){
    e.preventDefault(); 
    if(actualTab === 1) return; 
    goToTab(actualTab-1, actualTab); 
    actualTab--; 
}

const nextTab = function(e){
    e.preventDefault(); 
    if(actualTab === 3) return; 
    goToTab(actualTab+1, actualTab); 
    actualTab++; 
}

Array.from(document.querySelectorAll('.form__input')).forEach(input => {
    input.addEventListener('input', function(event){
        if(input.lenght === 0){
            input.nextElementSibling.classList.remove('form__label-text-up');
        }else{
            input.nextElementSibling.classList.add('form__label-text-up');
        }
        
        
    }); 
}); 

document.querySelector('input[type="date"]').innerHTML = ""; 