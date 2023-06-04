import { ActionReducerMap } from '@ngrx/store';
import * as UI from './shared/ui.reducer'
import * as AUTH from './auth/auth.reducer'
import * as FLUJO from './ingresosGastos/flujo.reducer'
export interface AppState {
   ui: UI.State,
   auth: AUTH.AuthState
   flujo: FLUJO.State
}

export const appReducers: ActionReducerMap<AppState> = {
   ui: UI.uiReducer,
   auth: AUTH.authReducer,
   flujo: FLUJO.flujoReducer
}