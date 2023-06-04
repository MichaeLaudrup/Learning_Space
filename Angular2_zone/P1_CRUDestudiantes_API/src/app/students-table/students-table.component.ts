import { Component, OnInit,AfterViewInit, ViewChild } from '@angular/core';
import { HeroService } from '../hero.service';
import { Student } from '../student';
import { MatDialog } from '@angular/material/dialog';
import { StudentDetailComponent } from '../student-detail/student-detail.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.css']
})
export class StudentsTableComponent implements OnInit {
  students: Student[] = []; 
  columnsToDisplay = ['id','name', 'email', 'disabled', 'edit', 'delete'];
  dataSource = new MatTableDataSource(this.students);
  constructor(private heroService:HeroService,public dialog: MatDialog) { }

  ngOnInit(): void {
     this.getStudents(); 
  }

  getStudents(): void {
    this.heroService.getStudents().subscribe(student => this.dataSource = new MatTableDataSource(student));
  }  

  openDialog(student:Student) {
    this.dialog.open(StudentDetailComponent, {
      data: student
    });
  }

  deleteStudent(student:Student){
    this.heroService.deleteStudent(student).subscribe(student => {
      this.getStudents();
      this.heroService.openSnackBar(`Estudiante con id ${student.id} ha sido eliminado `, 'OK'); 
    });    
  }

  updateStudent(student:Student){
    this.heroService.moveTo(`students/edit/${student.id}`); 
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
 
}
