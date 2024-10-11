import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { filtrosValidos } from '../filtro/filtro.actions';
import { Todo } from '../models/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  listaTareas : Todo[]; 
  filtro: filtrosValidos; 
  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.subscribe( (estado: AppState) => {
      console.log(estado)
      this.listaTareas = estado.todos.slice(); 
      this.filtro = estado.filtro; 
    })
  }

}
