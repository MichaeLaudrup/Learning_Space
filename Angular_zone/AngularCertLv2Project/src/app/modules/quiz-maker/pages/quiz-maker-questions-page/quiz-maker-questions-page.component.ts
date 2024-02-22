import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { TriviaService } from 'src/app/core/services/trivia-service/trivia.service';
import { TriviaQuizRequest } from 'src/app/shared/interfaces/trivia-quiz-request.interface';
import { TrivialQuestion } from 'src/app/shared/interfaces/trivial-question.interface';

@Component({
  selector: 'app-quiz-maker-questions-page',
  templateUrl: './quiz-maker-questions-page.component.html',
  styleUrls: ['./quiz-maker-questions-page.component.scss']
})
export class QuizMakerQuestionsPageComponent implements OnInit {
  questions : Array<TrivialQuestion> = [];
  showSubmitBtn = false;

  constructor(private triviaService: TriviaService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    localStorage.clear();
  }

  generateQuestions(trivialQuizRequest: TriviaQuizRequest) {
    this.triviaService.getQuizQuestions(trivialQuizRequest).subscribe((questionsResponse) => {
      this.questions = questionsResponse.results;
    });
  }

  goToResultsPage() {
    localStorage.setItem('questions-with-answers', JSON.stringify(this.questions));
    this.router.navigate(['quiz-maker/results']);
  }

  selectAnswer(answerChosen : string, numQuestion: number) {
    if (this.questions[numQuestion].answerChosen === answerChosen){ 
      this.questions[numQuestion].answerChosen = '';
    } else {
      this.questions[numQuestion].answerChosen = answerChosen;
    }

    this.showSubmitBtn = this.questions.filter(question => question?.answerChosen && question.answerChosen !== '' ).length === this.questions.length;
  }
}
