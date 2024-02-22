import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizMakerQuestionsPageComponent } from './pages/quiz-maker-questions-page/quiz-maker-questions-page.component';
import { QuizMakerResultsPageComponent } from './pages/quiz-maker-results-page/quiz-maker-results-page.component';

const routes: Routes = [
  { path: 'questions', component: QuizMakerQuestionsPageComponent},
  { path: 'results', component: QuizMakerResultsPageComponent},
  { path: '**', redirectTo: 'questions'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizMakerRoutingModule { 
}
