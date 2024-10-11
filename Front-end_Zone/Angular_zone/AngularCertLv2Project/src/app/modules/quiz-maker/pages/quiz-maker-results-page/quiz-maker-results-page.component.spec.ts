import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizMakerResultsPageComponent } from './quiz-maker-results-page.component';

describe('QuizMakerResultsPageComponent', () => {
  let component: QuizMakerResultsPageComponent;
  let fixture: ComponentFixture<QuizMakerResultsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizMakerResultsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizMakerResultsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
