/* ESTE ARCHIVO ES EL PRIMERO QUE SE EJECUTA AL LANZARSE LA APLICACION DE ANGULAR
A NO SER QUE SE INDIQUE LO CONSTRIO EN EL ARCHIVO main.ts */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ServerComponent } from './server/server.component';
import { ServersComponent } from './servers/servers.component';
import { DirectiveExerciseComponent } from './directive-exercise/directive-exercise.component';

@NgModule({
  declarations: [   //Se declaran los componentes que queremos que sean accesibles en toda la aplicacion
    AppComponent,
    ServerComponent,
    ServersComponent,
    DirectiveExerciseComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
