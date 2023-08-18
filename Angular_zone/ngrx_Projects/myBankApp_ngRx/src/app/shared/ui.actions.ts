import { createAction } from '@ngrx/store';

export const estaCargando = createAction('[UI Component] esta Cargando');
export const pararCargar = createAction('[UI Component] se para de cargar' )