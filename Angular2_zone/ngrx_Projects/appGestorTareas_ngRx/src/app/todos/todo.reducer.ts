import { Action, createReducer, INITIAL_STATE, on } from "@ngrx/store";
import { Todo } from "./models/todo.model";
import * as Actions from "./todo.actions"


export const estadoInicial: Todo[] = [
     new Todo('Matar al villano'),
     new Todo('Salvar a la princesa'),
     new Todo('Hacer bebes a la princesa'),
     new Todo('beber mucha cerveza y ponerse gordo')

]; 
export const todoReducer = createReducer<Todo[], Action>(estadoInicial,
     on( Actions.crearTarea, (state, {texto}) => [...state, new Todo(texto)]),
     on(Actions.conmutarTarea, (state, {id}) => {
          return state.map((value) => { 
               if(value.id === id ){
                    let object =  {
                         ...value,
                         completado: !value.completado
                    } 
                    console.log(object);
                    return object
               }else{
                    return value; 
               }
                  
          }); 
     }),
     on(Actions.editar, (state, {id, texto})=> {
          return state.map( (tarea) =>{
               if(id !== tarea.id) return tarea; 
               return { ...tarea, texto }
          }); 
     }),
     on(Actions.eliminar, (state, {id}) => {
          return state.filter( (tarea) => {
               return (tarea.id !== id) 
          }); 
     }),
     on(Actions.conmutarTodasLasTareas, (state, {completado}) => {
          return state.map( value => {
               return {
                    ...value,
                    completado
               }
          }
          )
     }),
     on(Actions.eliminarTareasCompletadas, (state) => {
          return state.filter( (tarea) => !tarea.completado) 
     })
     );