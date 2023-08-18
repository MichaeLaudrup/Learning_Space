import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngresosGastosComponent } from './ingresos-gastos.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { DetalleComponent } from './detalle/detalle.component';
import { OrdenarFlujoPipe } from '../pipes/ordenar-flujo.pipe';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { DashboardRoutesModule } from '../dashboard/dashboard-routes.module';
import { StoreModule } from '@ngrx/store';
import { flujoReducer } from './flujo.reducer';



@NgModule({
  declarations: [
    IngresosGastosComponent,
    EstadisticaComponent,
    DetalleComponent,
    DashboardComponent,
    OrdenarFlujoPipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    NgChartsModule,
    DashboardRoutesModule,
    StoreModule.forFeature('flujo', flujoReducer)
  ]
})
export class FlujoModule { }
