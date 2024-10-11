import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {  Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy{
  nombreUsuario: string; 
  storeSuscription : Subscription; 
  constructor(private authService: AuthService, private router:Router, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.storeSuscription = this.store.select('auth').pipe( filter( (auth) => auth && (auth?.user !== null)  )).subscribe( ({user}) => {
      this.nombreUsuario = user.nombre; 
    })
  }

  ngOnDestroy(): void {
    this.storeSuscription.unsubscribe(); 
  }

  cerrarSesion(){
    this.authService.logout().then( () => {
      this.router.navigate(['/login'])
    });
  

  }

}
