import { Pipe, PipeTransform } from '@angular/core';
import { Transaccion } from '../models/transaccion.model';

@Pipe({
  name: 'ordenarPorIngreso'
})
export class OrdenarFlujoPipe implements PipeTransform {

  transform(items: Transaccion[]): Transaccion[] {
    return items.sort((t1, t2) => { return (t1.tipo === 'ingreso') ? -1 : 1});
  }

}
