import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TrivialCategoriesResponse } from '../../../shared/interfaces/category-response.interface';
import { TriviaQuizRequest } from 'src/app/shared/interfaces/trivia-quiz-request.interface';
import { QuestionsResponse } from 'src/app/shared/interfaces/questions-response.interface';

@Injectable({
  providedIn: 'root'
})
export class TriviaService {
  private API_URL_BASE = 'https://opentdb.com';
  constructor(private httpClient: HttpClient) {
    
  }

  getQuizConfigOptions() : Observable<TrivialCategoriesResponse>{
    const url = `${this.API_URL_BASE}/api_category.php`;
    return this.httpClient.get<TrivialCategoriesResponse>(url);
  }

  getQuizQuestions(triviaQuizRequest: TriviaQuizRequest) : Observable<QuestionsResponse> {
    const queryParams = `category=${triviaQuizRequest.category}&difficulty=${triviaQuizRequest.difficulty.toLocaleLowerCase()}&amount=${triviaQuizRequest.amount}&type=${triviaQuizRequest.type}`;
    const url = `${this.API_URL_BASE}/api.php?${queryParams.toString()}`;
    return this.httpClient.get<QuestionsResponse>(url);
  }
}
