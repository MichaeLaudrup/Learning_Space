import { Action } from "../ngrx-vanillaJS/ngrx";
/* CARECTERISTICAS DE UN REDUCER
    - La funcion reducer SIEMPRE tiene que devolver un estado.
    - La funcion tiene que ser pura (no altera nada). */
export function contadorReducer( oldState = 10, action: Action){
    switch(action.type){
        case 'INCREMENTAR': 
            return oldState+=1; 
        case 'DECREMENTAR': 
            return oldState-=1; 
        case 'MULTIPLICAR': 
            return oldState*action.payload;
        case 'DIVIDIR': 
            return oldState / action.payload; 
        case 'RESET': 
            return oldState = 0; 
        default:
            return oldState; 
    }
}