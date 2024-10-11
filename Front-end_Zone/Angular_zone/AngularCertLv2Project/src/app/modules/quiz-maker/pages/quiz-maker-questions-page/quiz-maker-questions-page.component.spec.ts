import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizMakerQuestionsPageComponent } from './quiz-maker-questions-page.component';

describe('QuizMakerQuestionsPageComponent', () => {
  let component: QuizMakerQuestionsPageComponent;
  let fixture: ComponentFixture<QuizMakerQuestionsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizMakerQuestionsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizMakerQuestionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
