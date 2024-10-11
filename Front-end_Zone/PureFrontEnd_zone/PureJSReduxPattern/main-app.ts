import { createStore, Store } from "redux";
import { incrementadorAction, multiplicarAction } from "./contador/contador.actions";
import { contadorReducer } from "./contador/contador.reducer";
import { Action, Reducer } from "./ngrx-vanillaJS/ngrx";

const store:Store = createStore(contadorReducer); 
store.subscribe( () => {
    console.log('Subs:', store.getState())
})

store.dispatch(incrementadorAction); 
