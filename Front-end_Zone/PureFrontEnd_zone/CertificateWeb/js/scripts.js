
const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
const globalContainer = document.querySelector('.global-container');
const certificateForm = document.querySelector('.form-itself'); 
let studentName, lastName, date; 


const getDataAndMove = function(){
    globalContainer.classList.add('translateX100left');
    document.querySelector('#certificate-name').innerText = certificateForm.name.value + " " +certificateForm.lastName.value; 
    date = certificateForm.expedition_date.value.split('-'); 
    date = date[2] + " de " + months[date[1]-1] + " de " + date[0]; 
    document.querySelector('#certificate-date').innerText = date; 
    document.querySelector('body').style.overflow = "visible"; 
    console.log(date); 
    /* setTimeout(function () {
        document.querySelector(".form-container").style.display = "none"; 
    }, 2000); */

}

