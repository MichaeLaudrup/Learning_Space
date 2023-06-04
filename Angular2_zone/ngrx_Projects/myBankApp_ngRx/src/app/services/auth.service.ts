import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import 'firebase/firestore'; 
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { desActivarUsuario, establecerUsuario } from '../auth/auth.actions';
import { quitarTransacciones } from '../ingresosGastos/flujo.actions';
import { Subscription } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user:Usuario; 
  private userSuscription: Subscription; 
  constructor( private anFireAuth: AngularFireAuth, public angularFireDB: AngularFirestore, private store: Store<AppState>) { 
    this.initAuthListener(); 
  }


  crearUsuario(nombre: string, email: string, password:string ){
    return this.anFireAuth.createUserWithEmailAndPassword(email,password).then(({user}) => {
      let usuario = new Usuario(user!.uid, nombre, email);
      return this.angularFireDB.doc(`${user!.uid}/usuario`).set({...usuario});
    }); 
  }

  loguearUsuario(email: string, password: string) {
    return this.anFireAuth.signInWithEmailAndPassword(email,password); 
  }

  logout(){
    return this.anFireAuth.signOut(); 
  }

  initAuthListener(){
    this.anFireAuth.authState.subscribe( (fbUser) => {
      if(fbUser){
        this.userSuscription = this.angularFireDB.doc(`${fbUser.uid}/usuario`).valueChanges().subscribe( (fireStoreUser:any) => {
          const user= <Usuario>Usuario.newFromFB(fireStoreUser)
          this.store.dispatch(establecerUsuario({user})); 
          this._user = user; 
          
        })
      }else{
        this.userSuscription?.unsubscribe(); 
        this._user = null; 
        this.store.dispatch(desActivarUsuario())
        this.store.dispatch(quitarTransacciones())
      }
    })
  }

  isAuth(){
    return this.anFireAuth.authState.pipe( 
      map( fuser => {
        return fuser != null; 
      }))
  }

  get user(){
    return { ...this._user}
  }
}
