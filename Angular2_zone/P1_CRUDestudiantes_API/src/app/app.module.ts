import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { StudentsTableComponent } from './students-table/students-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { CreateStudentComponent } from './create-student/create-student.component';
import {MatFormFieldModule,MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { StudentEditorComponent } from './student-editor/student-editor.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    StudentsTableComponent,
    StudentDetailComponent,
    CreateStudentComponent,
    StudentEditorComponent
  ],
  imports: [
    BrowserModule,
     FormsModule,
      AppRoutingModule,  
       HttpClientModule,
        BrowserAnimationsModule,
         MatTableModule,MatDialogModule,
         MatIconModule,
         MatFormFieldModule,
         MatSnackBarModule,
         MatTableModule,
         MatProgressSpinnerModule,
         MatInputModule
  ],
  providers: [ {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}}, ],
  bootstrap: [AppComponent]
})
export class AppModule { }
