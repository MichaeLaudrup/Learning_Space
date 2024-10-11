export interface TrivialQuestion {
  category: string,
  type: string,
  question: string,
  correct_answer: string,
  incorrect_answers : Array<string>,
  answerChosen?: string,
  questionAnswersShufflered?: Array<string>
}