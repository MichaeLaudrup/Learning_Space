import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizMakerConfigFilterComponent } from './quiz-maker-config-filter.component';

describe('QuizMakerConfigFilterComponent', () => {
  let component: QuizMakerConfigFilterComponent;
  let fixture: ComponentFixture<QuizMakerConfigFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ QuizMakerConfigFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizMakerConfigFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
