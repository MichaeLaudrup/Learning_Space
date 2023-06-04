import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Route, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { GoalComponent } from './goal/goal.component';
import { QuoteComponent } from './quote/quote.component';
import { TheoryCourseComponent } from './theory-course/theory-course.component';

const routes : Route[] = [
  {path: 'theory_zone', component:  TheoryCourseComponent},
  {path: 'first-contact', component: GoalComponent},
  {path: 'global-styles', component: QuoteComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    GoalComponent,
    QuoteComponent,
    TheoryCourseComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
