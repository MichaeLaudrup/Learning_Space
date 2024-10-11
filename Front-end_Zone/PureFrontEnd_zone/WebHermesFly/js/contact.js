
    const hideCookie = function(){
        document.getElementById('cookie-message').style = 'display:none'; 
    }

    let arrayInputs = Array.from(document.querySelectorAll('.input-box input')); 

    arrayInputs.forEach(input => {
        input.addEventListener('keyup', function(){
            let inputActual = this; 
            if(inputActual.value !== "")
                this.parentElement.querySelector('label').classList.add('label-up')
            else
            this.parentElement.querySelector('label').classList.remove('label-up')
        }); 
    })


    let formulario = document.querySelector('.contact-form-container form'); 
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 
    let regexNombre = /^[a-z]{5,16}$/
    
    document.querySelector('#submit').addEventListener('click', function(e){
        e.preventDefault(); 
        let email = formulario.emailContact.value;
        let nombre = formulario.nameContact.value; 
        
        if(!regexEmail.test(email)){
            formulario.emailContact.style.backgroundColor = 'rgba(255, 0, 0, 0.6)'; 
            this.parentElement.querySelector('#no-valid-email').style = ' display: inline-block !important'; 
        }else{
            formulario.emailContact.style.backgroundColor = ''; 
            document.querySelector('#no-valid-email').style.display = 'none'; 
        }

        if(!regexNombre.test(nombre)){
            formulario.nameContact.style.backgroundColor = 'rgba(255, 0, 0, 0.6)'; 
            this.parentElement.querySelector('#no-valid-name').style = ' display: inline-block !important'; 
        }else{
            formulario.nameContact.style.backgroundColor = ''; 
            this.parentElement.querySelector('#no-valid-name').style = 'none'; 
        } 
    })


    





