import { async, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
/* 
describe('AppComponent', () => { //Hace falta al menos una funcion Describe
    beforeEach(waitForAsync(() => { //beforeEach quiere decir que se ejecuta antes de cada testeo
        TestBed.configureTestingModule({
            declarations: [
                AppComponent
            ],
            providers: []
        }).compileComponents(); 
        
        TestBed.configureTestingModule({declarations:[AppComponent]}).createComponent(AppComponent)
        //La funcion async devuelve una funcion asincrona
    })) 
    afterEach() //Se ejecuta despues de cada testeo

    it('La suma debe dar 4', waitForAsync(() => { //Cada funcion it es un testeo particular 
        (<HTMLInputElement>document.getElementById('sumando_1')).value = '2'; 
        (<HTMLInputElement>document.getElementById('sumando_2')).value = '2'; 
        (<HTMLElement>document.getElementById('calc')).click(); 
        expect((<HTMLInputElement>document.getElementById('resultado')).value).toBe('4'); 
    })) 
}); */
