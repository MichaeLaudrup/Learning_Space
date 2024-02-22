import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutProyectPageComponent } from './about-proyect-page.component';

describe('AboutProyectPageComponent', () => {
  let component: AboutProyectPageComponent;
  let fixture: ComponentFixture<AboutProyectPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutProyectPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutProyectPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
