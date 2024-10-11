import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PreciosAFuturoComponent } from './precios-afuturo/precios-afuturo.component';
import { TablaComponent } from './precios-afuturo/tabla/tabla.component';
import { FiltradoColumnasComponent } from './precios-afuturo/filtrado-columnas/filtrado-columnas.component';
import { FormFiltradoDatosComponent } from './precios-afuturo/form-filtrado-datos/form-filtrado-datos.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PreciosAFuturoComponent,
    TablaComponent,
    FiltradoColumnasComponent,
    FormFiltradoDatosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
