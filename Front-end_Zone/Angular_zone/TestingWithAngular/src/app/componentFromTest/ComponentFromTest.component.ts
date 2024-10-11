import { Component, ElementRef, ViewChild } from "@angular/core";

@Component({
    selector: 'app-component-from-test',
    templateUrl: './componentFromTest.component.html'
})
export class ComponentFromTest{
    @ViewChild('resultado') resultHTML: ElementRef; 
    @ViewChild('operando1') op1HTML: ElementRef; 
    @ViewChild('operando2') op2HTML: ElementRef; 
    constructor() {}
    sumar(){
        this.resultHTML.nativeElement.innerText = +(<HTMLInputElement>this.op1HTML.nativeElement).value + +(<HTMLInputElement>this.op2HTML.nativeElement).value;
    }


}