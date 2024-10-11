import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrivialQuestion } from 'src/app/shared/interfaces/trivial-question.interface';
import { BeautifyHTMLEntityTextPipe } from 'src/app/shared/pipe/beautify-html-entity-text/beautify-html-entity-text.pipe';
import { shuffleStringArray } from 'src/app/shared/utils/random.utils';

@Component({
  selector: 'app-quiz-question',
  standalone: true,
  imports: [CommonModule, BeautifyHTMLEntityTextPipe],
  templateUrl: './quiz-question.component.html',
  styleUrls: ['./quiz-question.component.scss']
})
export class QuizQuestionComponent implements OnInit {
  @Input() questionData!: TrivialQuestion;
  @Input() resultsMode = false;
  @Output() answerChosen = new EventEmitter<string>(); 
  
  currentAnswerSelected: string = ''; 
  
  ngOnInit(): void {
    if(!this.resultsMode) {
      this.questionData.questionAnswersShufflered = shuffleStringArray([this.questionData.correct_answer, ...this.questionData.incorrect_answers]);
    }
  }
}
