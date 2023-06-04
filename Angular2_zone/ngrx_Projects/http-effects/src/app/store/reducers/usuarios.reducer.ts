import { createReducer, on } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';
import { cargarUsuarios, cargarUsuariosSuccess, cargarUsuariosError} from '../actions';

export interface UsuariosState {
    users: Usuario[],
    loader: boolean,
    loading: boolean,
    error: any 
}

export const usuariosInitial: UsuariosState = {
   users : [],
   loader: false,
   loading: false,
   error: null
}

export const usuariosReducer = createReducer(usuariosInitial,
     on( cargarUsuarios, (estado) => { return {...estado, loading:true}}),
     on( cargarUsuariosSuccess, (estado, {usuarios}) => { return {...estado, loading:false, loader: true, users: [ ...usuarios]}}),
     on( cargarUsuariosError, (estado, {payload}) => { return {...estado, loading:false, loader: false, error:{url:payload.url, name: payload.name, messagge: payload.messagge} }}))