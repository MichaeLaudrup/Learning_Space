import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  appSubProjects = [
    {title: 'Apuntes teoricos curso', link: 'theory_zone'},
    {title: 'Selector :host and :host(.class)', link: 'first-contact'},
    {title: 'Global styles', link: ''},
  ]
  courseGoals = [
    { title:'Master Angular Styling', isActivatedGoal: true},
    { title:'Understand Angular Animations', isActivatedGoal: false},
    { title:'Master Angular Animations', isActivatedGoal: false},
  ];
}
