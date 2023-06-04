import { createReducer, on } from "@ngrx/store";
import * as Actions from "./contador.actions";

export const estadoInicial = 10; 

export const contadorReducer = createReducer( estadoInicial,
    on(Actions.incrementar, state => state + 1),
    on(Actions.decrementar, state => state - 1),
    on(Actions.multiplicar, (state, {numero:multiplicador}) => {
        return state *= multiplicador;
    }),
    on(Actions.dividir, (state, {numero:divisor})=> state /= divisor),
    on(Actions.reset, () => estadoInicial))
