import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { HeroService } from '../hero.service';

import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {
  name:string = ''; 
  email: string = ''; 
  title: String = "New Student";
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 50;
  constructor(private heroService:HeroService) { 
    
  }

  ngOnInit(): void { 
  }

  saveNewStudent(){
    if(!this.email) return; 
    this.heroService.saveStudent(this.name, this.email); 

  }

}
