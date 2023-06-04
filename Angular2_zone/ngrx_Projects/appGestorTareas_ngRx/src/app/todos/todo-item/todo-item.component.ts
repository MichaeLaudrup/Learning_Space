import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Todo } from '../models/todo.model';
import * as Actions from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input('tarea') tarea: Todo; 
  @ViewChild('inputTxt') inputTxtHTML: ElementRef; 
  chkCompletado: FormControl;
  txtInput: FormControl;
  modoEditando: boolean = false; 
  constructor( private store: Store<AppState>) {
    
   }

  ngOnInit(): void {
    this.chkCompletado = new FormControl(this.tarea.completado);
    this.txtInput = new FormControl(this.tarea.texto, Validators.required);
    this.chkCompletado.valueChanges.subscribe( valor => {
      this.store.dispatch(Actions.conmutarTarea({id: +this.tarea.id}))
    })
  }

  doubleClickTrigger(){
    this.modoEditando = true;
    this.txtInput.setValue(this.tarea.texto) 
    setTimeout(()=> { this.inputTxtHTML.nativeElement.select(); }, 1)
  }

  terminarEdicion(){
    this.modoEditando = false; 
    if(this.txtInput.invalid || (this.txtInput.value === this.tarea.texto)) return; 
    this.store.dispatch(Actions.editar({id: this.tarea.id, texto: this.txtInput.value}))
  }

  eliminarTarea(){
    this.store.dispatch(Actions.eliminar( {id: this.tarea.id}))
  }

}
