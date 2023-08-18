import { ActionReducerMap } from '@ngrx/store';
import * as REDUCERS from './reducers';


export interface AppState {
   usuarios: REDUCERS.UsuariosState 
}



export const appReducers: ActionReducerMap<AppState> = {
   usuarios: REDUCERS.usuariosReducer
}