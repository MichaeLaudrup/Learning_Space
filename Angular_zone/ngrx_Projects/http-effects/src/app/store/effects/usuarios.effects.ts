import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { of } from "rxjs";
import { tap, mergeMap,map, catchError } from "rxjs/operators";
import { UsuarioService } from "src/app/services/usuario.service";
import * as USUARIOS_ACTIONS from  "../actions/usuarios.actions";

@Injectable()
export class UsuariosEffects {
    constructor( private actions$: Actions, private usuariosService: UsuarioService){}

    cargarUsuarios$ = createEffect(() =>
    this.actions$.pipe(
      ofType( USUARIOS_ACTIONS.cargarUsuarios),
      mergeMap(() =>
        this.usuariosService.getUsers().pipe(
          map((resp) => resp['data']),
          map((users) =>{
            return USUARIOS_ACTIONS.cargarUsuariosSuccess({ usuarios: users })}
          ),
          catchError( err => of(USUARIOS_ACTIONS.cargarUsuariosError({payload:err})))
        )
      )
    )
  );
}