import { TestBed, waitForAsync } from "@angular/core/testing";
import { ComponentFromTest } from "./ComponentFromTest.component";

describe('Component from test: Prueba de como se crea componente a partir de test', () => {
    beforeEach( () => {
        TestBed.configureTestingModule({
            declarations: [
                ComponentFromTest
            ]
        });
    }); 

    it('Debe crear el componente', waitForAsync(() => {
        let fixture = TestBed.createComponent(ComponentFromTest); 
        let componentInstance = fixture.debugElement.componentInstance; 
        expect(componentInstance).toBeTruthy(); 
    }))

    it('El componente debe tener dos entradas de tipo numero', waitForAsync(() => {
        let fixture = TestBed.createComponent(ComponentFromTest); 
        let componentDOM = fixture.debugElement.nativeElement; 
        expect(componentDOM.querySelectorAll('input[type="number"]').length).toEqual(2); 
    }))

    it('El componente debe tener un elemento de tipo div con un id igual a "resultado" para mostrar el resultado', waitForAsync(() => {
        let fixture = TestBed.createComponent(ComponentFromTest); 
        let componentDOM = fixture.debugElement.nativeElement; 
        expect(componentDOM.querySelector('div#resultado')).toBeTruthy(); 
    }))

    it('Los cuatro botones tienen que tener los textos "sumar", "restar", "dividir" y "multiplicar" ', waitForAsync(() => {
        let fixture = TestBed.createComponent(ComponentFromTest); 
        let componentDOM = fixture.debugElement.nativeElement; 
        let listadoBotones = componentDOM.querySelectorAll('button');
        let existeSumar: boolean, existeDividir:boolean, existeMultiplicar:boolean, existeRestar:boolean; 
         existeSumar = existeRestar = existeMultiplicar = existeDividir = false; 
        (Array.from(listadoBotones)).forEach( (button:HTMLElement) => {
            switch(button.innerText.toLocaleLowerCase()){
                case 'sumar':
                    existeSumar = true; 
                    break; 
                case 'restar': 
                    existeRestar = true; 
                    break; 
                case 'multiplicar': 
                    existeMultiplicar = true; 
                    break; 
                case 'dividir':
                    existeDividir = true; 
                    break; 
            }
        });
        expect(existeDividir && existeMultiplicar && existeRestar && existeSumar).toBeTrue(); 
    }))


     it('Al pulsar el boton sumar, en el resultado se muestran los valores adecuados', waitForAsync(() => {
        let fixture = TestBed.createComponent(ComponentFromTest); 
        let componentInstance = fixture.componentInstance; 
        fixture.detectChanges(); 
        let operando1HTML = componentInstance.op1HTML; 
        let operando2HTML = componentInstance.op2HTML; 
        let botonSumaHTML = fixture.nativeElement.querySelector('button#btn-sumar'); 
        let resultadoHTML = fixture.nativeElement.querySelector('div#resultado'); 

        let operandos1 = (new Array(50).fill(0,0,50)).map( () => {return Math.trunc(Math.random()*10)})
        let operandos2 = (new Array(50).fill(0,0,50)).map( () => {return Math.trunc(Math.random()*10)}) 

        operandos1.forEach( (operando, index) => {
            operando1HTML.nativeElement.value = operando; 
            operando2HTML.nativeElement.value = operandos2[index]; 
            botonSumaHTML.click(); 
            expect(+resultadoHTML.innerText).toEqual(operando + operandos2[index])
        })
    })) 



















})