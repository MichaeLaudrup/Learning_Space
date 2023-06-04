import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directive-exercise',
  templateUrl: './directive-exercise.component.html',
  styleUrls: ['./directive-exercise.component.css']
})
export class DirectiveExerciseComponent implements OnInit {
  display:boolean = true; 
  clicks_log: number[] = []; 
  numClicks: number = 0; 
  constructor() { }

  ngOnInit(): void {
  }

  buttonClicked() :void{
    this.display = !this.display;
    this.numClicks++; 
    this.clicks_log.push(this.numClicks);


  }

}
