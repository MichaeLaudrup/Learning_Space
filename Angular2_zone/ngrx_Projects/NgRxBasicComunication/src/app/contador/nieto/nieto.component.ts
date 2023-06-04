import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { reset } from '../contador.actions';

@Component({
  selector: 'app-nieto',
  templateUrl: './nieto.component.html',
  styleUrls: ['./nieto.component.css']
})
export class NietoComponent implements OnInit {
  contador !: number; 
  constructor( private store:Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('contador').subscribe( (contador:number ) => {this.contador = contador}); 
  }
  reset(){
    this.store.dispatch(reset()); 
  }



}
