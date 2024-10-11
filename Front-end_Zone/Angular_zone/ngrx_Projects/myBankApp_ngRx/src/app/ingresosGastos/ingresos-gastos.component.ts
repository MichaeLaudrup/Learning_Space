import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Transaccion } from '../models/transaccion.model';
import { FlujoService } from '../services/flujo.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { estaCargando, pararCargar } from '../shared/ui.actions';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-ingresos-gastos',
  templateUrl: './ingresos-gastos.component.html',
  styleUrls: ['./ingresos-gastos.component.css']
})
export class IngresosGastosComponent implements OnInit, OnDestroy {
  flujoForm: FormGroup;
  isIngreso: boolean = true; 
  cargando:boolean = false; 
  loadingSubscription: Subscription; 
  constructor( private servicioFlujo: FlujoService, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.flujoForm = new FormGroup({
      descripcion: new FormControl('', Validators.required),
      cantidad: new FormControl('', Validators.min(0))
    })
    this.loadingSubscription = this.store.select('ui').subscribe(({isLoading}) => {
      this.cargando = isLoading; 
    })
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe(); 
  }

  guardar(){
    setTimeout( () => {}, 2500)
    if(this.flujoForm.invalid) return; 
    const {descripcion, cantidad} = this.flujoForm.value; 
    const tipo = this.isIngreso ? 'ingreso' : 'gasto';
    this.store.dispatch(estaCargando())
    this.servicioFlujo.crearTransaccion(new Transaccion(descripcion, cantidad, tipo))
      .then( (ref) => {
        this.store.dispatch(pararCargar())
        this.flujoForm.reset(); 
        Swal.fire('Nueva transaccion almacenada', descripcion, 'success')
      })
      .catch((err) => {
        this.store.dispatch(pararCargar())
        Swal.fire('Error', descripcion, err.messagge, )
      });  
  }

}
