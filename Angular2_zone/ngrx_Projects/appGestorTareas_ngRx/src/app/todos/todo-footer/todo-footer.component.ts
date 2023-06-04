import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { filtrosValidos } from '../filtro/filtro.actions';
import { filtrar } from '../filtro/filtro.actions';
import { eliminarTareasCompletadas } from '../todo.actions';
@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent implements OnInit {
  filtro: filtrosValidos; 
  pendientes: number = 0; 
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.subscribe( (estado: AppState) => {
      this.filtro = estado.filtro; 
      this.pendientes = estado.todos.filter( tarea => !tarea.completado).length; 
    }); 
  }

  cambiarFiltro( filtro:filtrosValidos){
    this.store.dispatch( filtrar({filtro}))
  }

  eliminarCompletados(){
    this.store.dispatch(eliminarTareasCompletadas())
  }

}
