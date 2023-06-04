import { createAction, props } from '@ngrx/store';
import { Transaccion } from '../models/transaccion.model';

export const establecerTransacciones = createAction(
    '[Flujo] Establecer transacciones',
    props<{transacciones: Transaccion[]}>()
);
export const quitarTransacciones = createAction('[Flujo] Quitar transaccione');