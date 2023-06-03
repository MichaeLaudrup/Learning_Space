const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');



const hideCookie = function(){
    document.getElementById('cookie-message').style = 'display:none'; 
}


let submitOneTime = false;
let password1 =  document.querySelector('#password-registration'); 
let password2 =  document.querySelector('#repeat-password-registration'); 

const conmuteToState = function(inputElement, state) {
	inputBox = inputElement.parentElement;
	if(state === 'ok'){
		inputBox.querySelector('.messagge-error').style.display = ""; 
		inputBox.querySelector('i').classList.remove('las','la-times','err'); 
		inputBox.querySelector('i').classList.add('las','la-check','ok'); 
	}else{
		inputBox.querySelector('.messagge-error').style.display = "inline-block";
		inputBox.querySelector('i').classList.remove('las','la-check','ok'); 
		inputBox.querySelector('i').classList.add('las','la-times','err'); 
	}
}

const checkEmail = function(emailInputElement){
	if(emailInputElement.validity.patternMismatch || emailInputElement.validity.valueMissing ){
		conmuteToState(emailInputElement, 'nook');  
	}else{
		conmuteToState(emailInputElement, 'ok');  
	}

}

const checkPassword = function (password1, password2){
	if((password1.value) !== password2.value || password1.value === "" || password2.value === ""){
		conmuteToState(password1, 'nook');  
		conmuteToState(password2, 'nook');  
	}else{
		conmuteToState(password1, 'ok');  
		conmuteToState(password2, 'ok');  
	}
}

document.getElementById('registration-submit').addEventListener('click', function(e){
	e.preventDefault(); 
	let emailInputElement = this.parentElement['email-registration']; 
	checkEmail(emailInputElement); 
	let password1 = this.parentElement['password-registration']; 
	let password2 = this.parentElement['repeat-password-registration']; 
	checkPassword(password1, password2);
	submitOneTime = true; 
})


Array.from(document.querySelectorAll('.input-box input')).forEach(input => {
	input.addEventListener('keyup', function(e){
		if(this.value !== ""){
			document.querySelector(`#${this.id} + label`).classList.add('label-up')
		}else{
			document.querySelector(`#${this.id} + label`).classList.remove('label-up')
		}
		//solo se hace la comprobacion en tiempo real si previamente se ha dado ha submit
		//para no molestar al usuario con mensajes de error cuando no corresponde
		if(submitOneTime){
			checkEmail(this); 
			checkPassword(password1,password2)
		}
	});
	
	
}); 


let estadoActual = 'registro'; 


let tarjetaRegistro = document.querySelector('.registro'); 
let tarjetaLogin = document.querySelector('.login'); 


document.querySelector('.sign-selector').addEventListener('click', function(e){
	if(estadoActual === e.target.id) return; 
	e.target.parentElement.querySelector(`#${estadoActual}`).classList.toggle('btn--actived');
	e.target.classList.toggle('btn--actived'); 
	estadoActual = e.target.id; 
	tarjetaRegistro.classList.toggle('hide-target'); 
	tarjetaLogin.classList.toggle('hide-target'); 


	
}); 