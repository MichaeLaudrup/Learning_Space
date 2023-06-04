import { createAction, props } from "@ngrx/store";

export const crearTarea = createAction(
    '[TODO] Crear tarea. ',
    props<{texto:string}>())

export const conmutarTarea = createAction(
    '[TODO] Conmutar tarea',
    props<{id: number}>() 
)

export const editar = createAction(
    '[TODO] Editar',
    props<{id:number, texto:string}>()
)

export const eliminar = createAction(
    '[TODO] Eliminar tarea.',
    props<{id:number}>()
)

export const conmutarTodasLasTareas = createAction(
    '[TODO] Conmutar todas las tareas',
    props<{completado:boolean}>()
)

export const eliminarTareasCompletadas = createAction(
    '[TODO] Eliminar tareas completadas'
)