import { createAction, props } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';

export const cargarUsuarios = createAction('[Usuarios] Cargar usuarios');
export const cargarUsuariosSuccess = createAction(
    '[Usuarios] Cargar usuarios Success',
    props<{usuarios: Usuario[]}>());

export const cargarUsuariosError = createAction(
    '[Usuarios] Cargar usuarios Error',
    props<{payload: any}>());