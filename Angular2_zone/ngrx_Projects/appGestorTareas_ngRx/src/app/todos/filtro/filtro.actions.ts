import { createAction, props } from "@ngrx/store";

export type filtrosValidos = 'todos' | 'completados' | 'pendientes'
export const filtrar = createAction(
    '[FILTRO] filtrar según texto', 
    props<{filtro:filtrosValidos}>()
)