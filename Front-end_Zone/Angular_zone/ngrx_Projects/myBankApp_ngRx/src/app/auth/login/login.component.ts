import { Component, OnDestroy, OnInit } from '@angular/core';
import { EmailValidator, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import * as UIActions from 'src/app/shared/ui.actions';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup; 
  cargando!:boolean; 
  suscripcion!: Subscription; 
  constructor( private authService: AuthService,
                private router:Router, 
                private store: Store<AppState>) {
   }

  ngOnInit(): void {
    this.loginForm = new FormGroup ( {
      email:new FormControl('maikel@gmail.com', [Validators.required, Validators.email]),
      password: new FormControl('123456', Validators.required)}); 
    
      this.suscripcion = this.store.select('ui').subscribe( ui => {
        this.cargando = ui.isLoading;
      })
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe(); 
  }

  login(){
    if(this.loginForm.invalid) return; 
    this.store.dispatch(UIActions.estaCargando())
    const {email, password} = this.loginForm.value;
    this.authService.loguearUsuario(email,password).then((responseData) =>{
      this.store.dispatch(UIActions.pararCargar())
      this.router.navigate(['/']); 
    }).catch( error => {
      this.store.dispatch(UIActions.pararCargar())
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Cool'
      })
    });  
  }

}
