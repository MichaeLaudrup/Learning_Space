import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../hero.service';


@Component({
  selector: 'app-student-editor',
  templateUrl: './student-editor.component.html',
  styleUrls: ['./student-editor.component.css']
})
export class StudentEditorComponent implements OnInit {
  student:Student = new Student(0,'','',true); 
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getStudentById(id).subscribe(student => this.student = student); 
  }

  updateStudent(): void{
    console.log(this.student); 
    this.heroService.updateStudent(this.student); 
  }

}
