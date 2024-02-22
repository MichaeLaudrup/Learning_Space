import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TriviaService } from '../../../../core/services/trivia-service/trivia.service';
import { TrivialCategoriesResponse } from '../../../../shared/interfaces/category-response.interface';
import { Item } from '../../../../shared/interfaces/item.interface';
import { DIFFICULTIES } from 'src/app/shared/const/difficulties.const';
import { TriviaQuizRequest } from 'src/app/shared/interfaces/trivia-quiz-request.interface';

@Component({
  selector: 'app-quiz-maker-config-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ReactiveFormsModule],
  templateUrl: './quiz-maker-config-filter.component.html',
  styleUrls: ['./quiz-maker-config-filter.component.scss']
})
export class QuizMakerConfigFilterComponent implements OnInit{
  categories: Item[] = [];
  difficulties: string[] = DIFFICULTIES;

  quizQueryForm : FormGroup = new FormGroup({
    category: new FormControl('', Validators.required),
    difficulty: new FormControl('', Validators.required)
  });

  @Output() createTrivial = new EventEmitter<TriviaQuizRequest>();

  constructor(
    private triviaService: TriviaService
  ) {

  }

  ngOnInit(): void {
    this.triviaService.getQuizConfigOptions().subscribe((triviaCategories : TrivialCategoriesResponse) => {
      this.categories = triviaCategories.trivia_categories;
    });
  }

  processQuizRequest() : void {
    this.createTrivial.emit({
      category: this.quizQueryForm.get('category')?.value,
      difficulty: this.quizQueryForm.get('difficulty')?.value,
      amount: 5,
      type: 'multiple'
    });
  }

}
