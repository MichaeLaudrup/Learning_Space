import { NgModule } from '@angular/core';
import { EstadisticaComponent } from '../ingresosGastos/estadistica/estadistica.component';
import { IngresosGastosComponent } from '../ingresosGastos/ingresos-gastos.component';
import { DetalleComponent } from '../ingresosGastos/detalle/detalle.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

export const dashboardRoutes: Routes = [{
  path: '',
  component: DashboardComponent,
  children:[{path:'', component: EstadisticaComponent},
            {path: 'flujoCaja', component: IngresosGastosComponent},
            {path: 'detalle', component: DetalleComponent}]
}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(dashboardRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutesModule { }
