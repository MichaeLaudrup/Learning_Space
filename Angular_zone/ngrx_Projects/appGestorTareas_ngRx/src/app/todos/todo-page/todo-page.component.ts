import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { conmutarTodasLasTareas } from '../todo.actions';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.css']
})
export class TodoPageComponent implements OnInit {
  completado:boolean = false; 
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  marcarTodas(){
    this.completado = !this.completado; 
    this.store.dispatch(conmutarTodasLasTareas({completado: this.completado})); 
  }

}
