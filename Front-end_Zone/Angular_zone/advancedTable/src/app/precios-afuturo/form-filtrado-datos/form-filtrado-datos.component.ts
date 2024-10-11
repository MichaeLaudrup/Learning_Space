import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form-filtrado-datos',
  templateUrl: './form-filtrado-datos.component.html',
  styleUrls: ['./form-filtrado-datos.component.css']
})
export class FormFiltradoDatosComponent implements OnInit {
  @ViewChild('myForm', {static:true}) miFormulario: NgForm; 
  constructor() { }

  ngOnInit(): void {
  }

  submitForm(form:NgForm){
  }

  resetForm(){
    this.miFormulario.reset(); 
  }

}
