import { TrivialQuestion } from "./trivial-question.interface";

export interface QuestionsResponse {
  response_code: number,
  results: Array<TrivialQuestion>
}