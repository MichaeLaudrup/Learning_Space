import { Component, Input, OnInit, Inject} from '@angular/core';
import { Student } from '../student';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public student: Student) {
  }
  ngOnInit(): void {
  }







}
