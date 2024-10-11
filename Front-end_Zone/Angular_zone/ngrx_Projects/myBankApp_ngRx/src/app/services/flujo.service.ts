import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import 'firebase/firestore'; 
import { map } from 'rxjs/operators';
import { Transaccion } from '../models/transaccion.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FlujoService {

  constructor(private firestore: AngularFirestore, private authService: AuthService) { 
  }

  crearTransaccion(ingreso: Transaccion){
    delete ingreso.uid; 
    return this.firestore.doc(`${this.authService.user.uid}/flujo-caja`)
    .collection('transacciones')
    .add({...ingreso})
  }

  initSincronizacionConFirebaseFlujo( uid: string){
    return this.firestore.collection(`${uid}/flujo-caja/transacciones`)
    .snapshotChanges()
    .pipe( map( ( snapShot) => (
      snapShot.map( doc => (
        {
          uid: doc.payload.doc.id,
          ...doc.payload.doc.data() as any
        }
      ))
    )))
  }

  borrarTransaccion(transaccionID: string){
    const uid = this.authService.user.uid; 
    return this.firestore.doc(`${uid}/flujo-caja/transacciones/${transaccionID}`).delete(); 
  }
}
