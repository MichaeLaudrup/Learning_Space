import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Student } from './student';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


//El hero service se crea y se injecta alla donde es declarado
@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private studentsUrl =  'http://localhost:8080/students'; //Url donde la API estara montada
  
  //Se establecen las opciones para los metodos POST, PUT y DELETED, espicificando que el tipo de dato
  //que se envia es de tipo JSON
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }) 
  };


  //Se obtienen instancias de : 
  constructor(
    private http: HttpClient, //HttpCliente para hacer peteciones GET, PUT, POST y DELETE
    private _snackBar: MatSnackBar, //Una barra de notificaciones que es insertada con Javascript para notificar de exito o fracaso en operaciones
    private _router: Router) { } //Un objeto tipo Router para moverse por rutas propias de angular cuando surgen determinados eventos


  /*Este metodo de vuelve un Observable no consumido por suscribe de tal forma que es el propio componente
   *que llama a este metodo el encargado de consumir la respuesta y actuar acorde a ella 
   */
  getStudents(): Observable<Student[]> {
      const result =  this.http.get<Student[]>(this.studentsUrl);
      return result; 
  }


  /*
   * Este metodo solicita a la API el almacenamiento de un nuevo estudiante y notifica en caso de exito o en caso de fracaso
   * no devuelve nada dado que la peticion se consume en el propio metodo. 
  */
  saveStudent(name:string, email:string): void {
    const dataJSON = `
    {
      "name":"${name}",
       "email": "${email}",
       "disabled":false
    }`; //Se declara un nuevo tipo JSON con el formato que espera de un Estudiante la API

    //Se realiza una peticion HTTP POST para postear el nuevo estudiante
    this.http.post<Student>(this.studentsUrl, dataJSON,this.httpOptions).subscribe(
          //Funcion ejecutada en caso de exito de la http post
          student => {
            this._router.navigate(["/students"]); //En caso de exito de vuelve a la tabla principal
            document.documentElement.style.setProperty('--snack-color', "#a1f09e"); //Se establece que la barra de notificacion sera de color verde con variable CSS
            this.openSnackBar(`Se ha insertado con exito a ${student.name} con el id numero ${student.id}`, 'OK'); //Se muestra la barra de notificacion verde indicando exito
          },
          //Funcion ejecutada en caso de error de la http post 
          err => {
            this.openSnackBar(`${err.error}`, 'OK', 'fail'); //Se notifica del error al usuario
          });
    }
    

    /*
     * Se habre una notificacion en la parte inferior de la pantalla en caso de exito o fracaso en una operacion
     * @ param - String: Message - Mensaje a mostrar en la notificacion
     * @param - String action - Texto que se pondra en el boton para cerrar la notificacion
     * @param - String?: mode - [success | fail] en el primera caso imprimira la notifiacion en verde, en el segundo en rojo
     *
     */
    openSnackBar(message: string, action: string, mode:String = 'success') {
      if(mode === 'success') document.documentElement.style.setProperty('--snack-color', "#a1f09e");//Se establece que la barra de notificacion sera de color verde con variable CSS
      if(mode === 'fail') document.documentElement.style.setProperty('--snack-color', "red"); //Se establece color de barra de notificacion a rojo con variable cSS
      this._snackBar.open(message, action); //Se muestra barra grafica con notificacion
    }


    /*
     * Elimina el estudiante recibido como parametro
     * @param student: Student - Studieante que se va a eliminar
    */
    deleteStudent(student:Student) : Observable<Student> {
      return this.http.delete<Student>(this.studentsUrl+`/${student.id}`, this.httpOptions);
    }

    /*
     * Hace una peticion HTTP a la API para recuperar un estudiante segun su identificador
     * @param number: Id - identificador numerico del estudiante
     *
     */
    getStudentById(id: Number): Observable<Student>{
      return this.http.get<Student>(`${this.studentsUrl}/${id} `);
    }

    moveTo(path:String){
      this._router.navigate([path]);
    }
    /* 
     * Se actualiza un estudiante recibido como parametro
     * @param Student:student - estudiante a modificar 
     */
    updateStudent(student:Student){
      const dataJSON = `
      {
        "name":"${student.name}",
         "email": "${student.email}",
         "disabled":"${student.disabled}"
      }`;
      return this.http.put<Student>(this.studentsUrl+`/${student.id}`,dataJSON, this.httpOptions).subscribe(
        () => {
          this.moveTo("students"); 
          this.openSnackBar(`Se ha editado con exito a ${student.name} con el id numero ${student.id}`, 'OK'); 
        },
        (err) => {     
          this.openSnackBar(`${err.error}`, 'OK', 'fail'); 
        }); 
    }
}
