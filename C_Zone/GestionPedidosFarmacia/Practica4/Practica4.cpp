#include "FarmaDronTAD.h"
#include <stdio.h>
#include <stdlib.h>


void imprimeMenu(){
  printf("\n\nFarmaDron: Distribuci%cn de F%crmacos con Dron\n",char(162),char(160));
  printf("\tAlta nuevo paciente                           (Pulsar A)\n");
  printf("\tUbicar pacientes                              (Pulsar U)\n");
  printf("\tNuevo pedido                                  (Pulsar N)\n");
  printf("\tLista diaria de pedidos                       (Pulsar L)\n");
  printf("\tCalendario mensual de pedidos                 (Pulsar C)\n");
  printf("\tSalir                                         (Pulsar S)\n");
  printf("\tTeclear una opci%cn v%clida (A|U|N|L|C|S)?",char(162),char(160));
}
int main(){
  bool finalizarPrograma;
  int opcion_deseada;
  tipoFarmaDron farmaDron;
  farmaDron.iniciarFarmaDron(); //Se inician datos basicos como que hay cero clientes inicialmente
  finalizarPrograma = false;
  while(!finalizarPrograma){
     imprimeMenu();
     fflush(stdin); //Eliminar del buffer posible elementos residuales
     scanf("%c",&opcion_deseada);
     switch(opcion_deseada){
       case 'A':
         farmaDron.recogerPacientes();
         break;
       case 'U':
         farmaDron.listarPacientes();
         break;
       case 'N':
         farmaDron.nuevosPedidos();
         break;
       case 'L':
         farmaDron.listarPedido();
         break;
      case 'C':
         farmaDron.calendarioMensualPedidos();
         break;
       case 'S':
         finalizarPrograma = true;
         break;
       default:
         printf("ERROR: respuesta introducida no esperada. Repita");
     }
  }
}


