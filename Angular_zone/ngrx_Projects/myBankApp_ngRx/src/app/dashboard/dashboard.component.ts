import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { AuthState } from '../auth/auth.reducer';
import * as flujoActions from '../ingresosGastos/flujo.actions';
import { Transaccion } from '../models/transaccion.model';
import { FlujoService } from '../services/flujo.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  userSuscription : Subscription; 
  transaccionesSuscription : Subscription
  constructor(private store: Store<AppState>, private servFlujo: FlujoService) { }

  ngOnInit(): void {
    this.userSuscription = this.store.select('auth')
    .pipe( filter(( au) =>  { return ( au !== null) && (au.user !== null)}))
    .subscribe(( authState:AuthState)=> {
      this.transaccionesSuscription = this.servFlujo.initSincronizacionConFirebaseFlujo(authState.user.uid)
      .subscribe((transacciones) => {
        this.store.dispatch(flujoActions.establecerTransacciones({ transacciones}))
      })
    })
  }

  ngOnDestroy(): void {
    this.userSuscription.unsubscribe();
    this.transaccionesSuscription.unsubscribe();  
  }

}
