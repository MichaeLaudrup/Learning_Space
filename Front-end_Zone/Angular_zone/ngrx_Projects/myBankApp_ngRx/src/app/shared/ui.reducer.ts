import { Action, createReducer, on } from '@ngrx/store';
import { estaCargando, pararCargar } from './ui.actions';

export interface State {
    isLoading: boolean; 
}

export const initialState: State = {
   isLoading: false,
}

export const uiReducer = createReducer<State, Action>(initialState,
    on(estaCargando, state => ({ ...state, isLoading: true})),
    on(pararCargar, state => ({ ...state, isLoading: false})),
);

