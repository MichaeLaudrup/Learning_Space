import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { ChartData, ChartType } from 'chart.js';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css']
})
export class EstadisticaComponent implements OnInit, OnDestroy {
  public doughnutChartLabels: string[] = [ 'Gastos', 'Ingresos' ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [] },
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';

  sumaIngresos: number = 0; 
  sumaGastos: number = 0; 
  porcentajeIngresos: number = 0; 
  porcentajeGastos : number = 0; 
  suscripcion: Subscription;
  constructor(private store: Store<AppState>) { }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe(); 
  }

  ngOnInit(): void {
    this.suscripcion = this.store.select('flujo').subscribe(({transacciones}) => {
      if(transacciones.length === 0){
        this.sumaGastos = 0; 
        this.sumaIngresos = 0; 
      }else{
        let estadistica = transacciones.reduce( (acumulador, transaccion) => {
          acumulador[(transaccion.tipo === 'ingreso') ? 'sumIng': 'sumGas'] += transaccion.cantidad;
          acumulador[(transaccion.tipo === 'ingreso') ? 'conteoIngresos': 'conteoGastos'] +=1; 
          return acumulador; 
        }, {sumIng: 0, sumGas: 0, conteoIngresos: 0, conteoGastos: 0})
        this.sumaGastos = estadistica.sumGas; 
        this.sumaIngresos = estadistica.sumIng; 
        this.porcentajeIngresos = (estadistica.conteoIngresos / transacciones.length) ; 
        this.porcentajeGastos = (estadistica.conteoGastos / transacciones.length) ; 
        this.doughnutChartData.datasets = [{data: [this.sumaGastos,this.sumaIngresos]}]
        
      }
    })
  }




}
