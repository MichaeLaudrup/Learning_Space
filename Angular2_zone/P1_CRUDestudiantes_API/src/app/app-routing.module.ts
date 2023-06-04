import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsTableComponent } from './students-table/students-table.component';
import { CreateStudentComponent } from './create-student/create-student.component';
import { StudentEditorComponent } from './student-editor/student-editor.component';

const routes: Routes = [
  { path: '', redirectTo: '/students', pathMatch: 'full' },
  { path: 'students', component: StudentsTableComponent },
  { path: 'students/create', component: CreateStudentComponent},
  { path: 'students/edit/:id', component: StudentEditorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }