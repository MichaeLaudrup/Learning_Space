import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { Transaccion } from 'src/app/models/transaccion.model';
import { FlujoService } from 'src/app/services/flujo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit, OnDestroy {
  storeSubscription: Subscription;
  transacciones: Transaccion[];  
  constructor(private store: Store<AppState>, private flujoServicio: FlujoService) { }

  ngOnInit(): void {
    this.storeSubscription = this.store.select('flujo').subscribe( ( {transacciones}) => {
      this.transacciones = transacciones.slice(); 
    })
  }

  ngOnDestroy(): void {
    this.storeSubscription.unsubscribe(); 
  }

  borrar(tid:string){
    this.flujoServicio.borrarTransaccion(tid).then( () => {
      Swal.fire('Borrado', 'Transacción borrada con exito', 'success')
    }).catch( (err) => {
      Swal.fire('Borrado', err.messagge, 'warning')
    })
    
  }

}
