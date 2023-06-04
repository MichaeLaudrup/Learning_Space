import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';
import { cargarUsuarios } from 'src/app/store/actions';
import { AppState } from 'src/app/store/app.reducers';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
  listaUsuarios : Usuario[] = []; 
  loading: boolean = false; 
  error:any = null; 
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(cargarUsuarios());
    this.store.select('usuarios').subscribe( ( {users, loading, error}) => {
      this.listaUsuarios = users
      this.loading = loading; 
      this.error = error; 
    })
  }



}
