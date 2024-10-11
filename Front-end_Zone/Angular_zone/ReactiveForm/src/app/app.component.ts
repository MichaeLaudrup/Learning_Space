import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  formulario: FormGroup; 
  status_array = ['estable', 'critico', 'finalizado']
  ngOnInit(): void {
    this.formulario = new FormGroup({
      project_name: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required, this.emailProhibito),
      project_status: new FormControl()
    });
  }

  procesarYEnviarForm(){
      console.log(this.formulario.value); 
  }

  emailProhibito( control:FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve,reject) => {
      setTimeout(function(){
        if(control.value === 'Test'){
          resolve({ emailProhibido: true})
        }else{
          resolve(null); 
        }
      }, 2000);
    }); 
    return promise; 
  }

}
