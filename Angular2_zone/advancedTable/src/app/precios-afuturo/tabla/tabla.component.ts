import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TableToExcelService } from 'src/app/services/table-to-excel.service';
import { preciosService } from '../precios.service';
@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css'],
  providers: [ TableToExcelService]
})
export class TablaComponent implements OnInit {
  @ViewChild('tablaHTMLElement', {static:true}) tabla: ElementRef; 
  constructor( private servicioTabla: preciosService, private servicioExcel: TableToExcelService) { }

  ngOnInit(): void {
    this.servicioTabla.eventoConmutaColumna.subscribe( numeroGrupo => {
       const celdasPertenecientesAGrupo = Array.from(this.tabla.nativeElement.querySelectorAll(`.group-${numeroGrupo}`));
       console.log(celdasPertenecientesAGrupo)
       celdasPertenecientesAGrupo.forEach((celda:HTMLElement) => {
         celda.classList.toggle(`hidden`)
       })
    }); 

    this.servicioTabla.eventoOcultaCampoFecha.subscribe( () => {
      this.tabla.nativeElement.querySelector(`#fecha`).style.display = 'none'; 
    }); 
  }


  toExcel(){
    this.servicioExcel.exportToExcel(this.tabla); 
  }
}
