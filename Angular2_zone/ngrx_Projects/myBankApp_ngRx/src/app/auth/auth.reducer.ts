import { Action, createReducer, on } from "@ngrx/store";
import { Usuario } from "../models/usuario.model"
import { desActivarUsuario, establecerUsuario } from "./auth.actions";


export interface AuthState {
    user:Usuario
}

export const initialState = null; 


export const authReducer = createReducer<AuthState, Action>(initialState, 
    on(establecerUsuario, (state ,{user}) => {return { ...state, user: {...user}}}),
    on(desActivarUsuario, (state) => { return {...state, user: null}})); 