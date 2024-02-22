import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutTheProjectRoutingModule } from './about-the-project-routing.module';
import { AboutProyectPageComponent } from './pages/about-proyect-page/about-proyect-page.component';


@NgModule({
  declarations: [
    AboutProyectPageComponent
  ],
  imports: [
    CommonModule,
    AboutTheProjectRoutingModule
  ]
})
export class AboutTheProjectModule { }
