import { createAction, props } from '@ngrx/store';
import { Usuario } from '../models/usuario.model';

export const establecerUsuario = createAction(
    '[Auth Component] establecerUsuario',
    props<{ user: Usuario}>());

    
export const desActivarUsuario = createAction(
    '[Auth Component] quitar usuario activo')