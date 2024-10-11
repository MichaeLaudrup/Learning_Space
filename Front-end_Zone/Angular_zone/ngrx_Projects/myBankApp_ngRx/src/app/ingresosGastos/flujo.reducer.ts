import { Action, createReducer, on } from '@ngrx/store';
import { Transaccion } from '../models/transaccion.model';
import * as flujoActions from './flujo.actions'; 

export interface State {
    transacciones: Transaccion[]; 
}

export const initialState: State = {
    transacciones: [] 
}

export const flujoReducer = createReducer<State, Action>(
    initialState,
    on(flujoActions.establecerTransacciones, (estado, {transacciones}) => ({ ...estado, transacciones: [...transacciones]})),
    on(flujoActions.quitarTransacciones, (estado) => ({...estado, transacciones: []})))
