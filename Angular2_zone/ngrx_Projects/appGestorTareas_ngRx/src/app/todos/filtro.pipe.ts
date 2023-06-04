import { Pipe, PipeTransform } from '@angular/core';
import { filtrosValidos } from './filtro/filtro.actions';
import { Todo } from './models/todo.model';

@Pipe({
  name: 'filtradoTarea'
})
export class FiltroPipe implements PipeTransform {

  transform(value: Todo[], filtro: filtrosValidos): Todo[] {
    console.log(filtro)
    switch( filtro){
      case 'completados': 
        return value.filter( (tarea) => tarea.completado); 
      case 'pendientes': 
        return value.filter( (tarea) => !tarea.completado); 
      case 'todos': 
        return value; 
    }
  }

}
