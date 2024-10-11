import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Actions from './contador/contador.actions';
import { AppState } from './app.reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ngrx_Projects';
  contador:number;
  
  constructor(private store: Store<AppState>){
    this.contador = 10; 
  }
  ngOnInit(): void {
    this.store.select('contador').subscribe( (contador) => {
      this.contador = contador; 
    })
  }

  incrementar(){
    this.store.dispatch( Actions.incrementar()); 
  }

  decrementar(){
    this.store.dispatch( Actions.decrementar())
  }
}
