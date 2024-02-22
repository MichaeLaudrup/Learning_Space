import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: 'quiz-maker', loadChildren: () => import('./modules/quiz-maker/quiz-maker.module').then(m => m.QuizMakerModule)
  },
  {
    path: 'about-the-proyect', loadChildren: () => import('./modules/about-the-proyect/about-the-project.module').then(m => m.AboutTheProjectModule)
  },
  {
    path: '**', redirectTo: 'quiz-maker'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
