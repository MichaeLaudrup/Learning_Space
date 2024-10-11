import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrivialQuestion } from 'src/app/shared/interfaces/trivial-question.interface';

@Component({
  selector: 'app-quiz-maker-results-page',
  templateUrl: './quiz-maker-results-page.component.html',
  styleUrls: ['./quiz-maker-results-page.component.scss']
})
export class QuizMakerResultsPageComponent implements OnInit {
  @Input() questionsWithAnswersChosen : Array<TrivialQuestion> = []; 
  score = 0; 
  constructor(private router: Router) {

  } 

  ngOnInit(): void {
    const localData = localStorage.getItem('questions-with-answers');
    if (localData) {
      this.questionsWithAnswersChosen = JSON.parse(localData);
      this.calcScore();
    } else {
      this.router.navigate(['results'])
    }
  }

  calcScore() {
    this.questionsWithAnswersChosen.forEach( questionData => {
      if (questionData.answerChosen === questionData.correct_answer) {
        this.score++;
      }
    })
  }
  
}
