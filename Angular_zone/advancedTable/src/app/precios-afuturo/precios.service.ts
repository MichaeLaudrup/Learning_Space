import { EventEmitter } from "@angular/core";

export class preciosService {
    mascaraColumnasOcultas: boolean[] = [false, false, false, false]; 
    numColumnasOcultas: number = 0; 
    eventoConmutaColumna = new EventEmitter<number>(); 
    eventoOcultaCampoFecha = new EventEmitter(); 
    ocultarGrupo(numGrupo:number){
        if(this.mascaraColumnasOcultas[numGrupo-1]){
            this.mascaraColumnasOcultas[numGrupo-1] = false; 
            this.numColumnasOcultas--; 
        }else{
            this.mascaraColumnasOcultas[numGrupo-1] = true;
            this.numColumnasOcultas++; 
        }
        this.eventoConmutaColumna.emit(numGrupo); 
        if(this.numColumnasOcultas === 4){
            this.eventoOcultaCampoFecha.emit(); 
        }
    }
}