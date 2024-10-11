import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutProyectPageComponent } from './pages/about-proyect-page/about-proyect-page.component';

const routes: Routes = [
  {
    path: '',
    component: AboutProyectPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutTheProjectRoutingModule { }
