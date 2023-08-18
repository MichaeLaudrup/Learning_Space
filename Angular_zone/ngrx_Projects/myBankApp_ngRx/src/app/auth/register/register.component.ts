import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import { estaCargando, pararCargar } from 'src/app/shared/ui.actions';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy{
  registroForm!: FormGroup;
  uiSubcription!: Subscription;
  cargando : boolean; 
  constructor(private authService: AuthService, private router: Router, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.registroForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    })

    this.uiSubcription = this.store.select('ui').subscribe( ui => {
      this.cargando = ui.isLoading; 
    })
  }

  ngOnDestroy(): void {
    this.uiSubcription.unsubscribe(); 
  }

  crearUsuario(){
    if(this.registroForm.invalid) return;
    this.store.dispatch(estaCargando()); 
    const {nombre, email, password} = this.registroForm.value; 
    this.authService.crearUsuario(nombre, email, password).then( data => {
      this.store.dispatch(pararCargar()) 
      this.router.navigate(['/'])
    }).catch( error => {
      this.store.dispatch(pararCargar()) 
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Cool'
      })
    }); 
  }

}
