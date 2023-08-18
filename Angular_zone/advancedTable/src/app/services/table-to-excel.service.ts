import { ElementRef, Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver'
@Injectable({
  providedIn: 'root'
})
export class TableToExcelService {

  constructor() { }

  exportToExcel( tablaHTML: ElementRef){
    let [camposDeTabla, datosDeTabla, mapaDeHeader] = this.convertHTMLTableToJSON(tablaHTML.nativeElement); 
    let libroDeExcel = new Workbook(); 
    let hojaDeLibro = libroDeExcel.addWorksheet('preciosAFuturo');
   

    console.log(camposDeTabla, datosDeTabla, mapaDeHeader)
    camposDeTabla.forEach( (filaDeHeader: Array<Array<String>> ,index:number) => {
      let actualrow = hojaDeLibro.addRow(filaDeHeader); 
    })
    datosDeTabla.forEach(filaDeDatos => {
      hojaDeLibro.addRow(filaDeDatos)
    }); 
    /* CONSTRUCCION DEL HEADER DE LA TABLA */
    //hojaDeLibro.mergeCells('A1:A3'); 
    hojaDeLibro.mergeCells('B1:Z1'); 
    hojaDeLibro.mergeCells('B2:D2');

    hojaDeLibro.getRow(1).fill = {
      type: 'pattern',
      pattern:'solid',
      fgColor:{argb:'FFb4e1bc'}
    }; 
    hojaDeLibro.getRow(1)






    //set downloadable file name
    let fname="PreciosAFuturo"

    //add data and file name and download
    libroDeExcel.xlsx.writeBuffer().then((data) => {
    let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    fs.saveAs(blob, fname+'-'+new Date().valueOf()+'.xlsx');
    });

  }
  convertHTMLTableToJSON(tablaHTML: HTMLElement) : [  any, Array<String[]>, any] { //Esta funcion devuelve un JSON con los datos de la tabla y un array de campos de header de la tabla
    let mapaDeHeader :{numColumns:number, numFilas: number}[] = []; 
    let header = Array.from(tablaHTML.querySelectorAll('thead tr')).map( row => {
      return Array.from(row.querySelectorAll('th')).map( thead => {
        let cellDistribution = { 
          numColumns: thead.hasAttribute('colspan') ? +thead.getAttribute('colspan') : 1 , 
          numFilas: thead.hasAttribute('rowspan') ? +thead.getAttribute('rowspan') : 1 
        }
        mapaDeHeader.push(cellDistribution); 
        return thead.innerText; 
      })
    })

    let data = (Array.from(tablaHTML.querySelectorAll('tbody tr'))).map( (dataRow:HTMLElement)  => {
      return Array.from(dataRow.querySelectorAll('td')).map((dataCell:HTMLElement) => {
        
        return dataCell.innerText; 
      })
    }); 
    return [header,data, mapaDeHeader]; 

    
  }
}
