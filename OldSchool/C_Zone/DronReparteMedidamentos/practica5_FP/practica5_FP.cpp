#include "FarmaDronTAD.h"
#include <stdio.h>
#include <stdlib.h>


void imprimeMenu(){
  printf("\n\nFarmaDron: Distribuci%cn de F%crmacos con Dron\n",char(162),char(160));
  printf("\tIniciar gesti%cn                                   (Pulsar I)\n",char(162));
  printf("\tVisualizar todos los datos                        (Pulsar V)\n");
  printf("\tAlta almac%cn                                      (Pulsar M)\n",char(130));
  printf("\tAlta paciente almac%cn                             (Pulsar A)\n",char(130));
  printf("\tUbicar pacientes                                  (Pulsar U)\n");
  printf("\tNuevo pedido                                      (Pulsar N)\n");
  printf("\tProgramar rutas diarias del dron                  (Pulsar P)\n");
  printf("\tSalir                                             (Pulsar S)\n");
  printf("\tTeclear una opci%cn v%clida (I|V|M|A|U|N|P|S)?",char(162),char(160));
}
int main(){
  bool finalizarPrograma;
  int opcion_deseada;
  tipoFarmaDron farmaDron;
  tgestor_FarmaDron gestorFarma;
  farmaDron.iniciarFarmaDron(); //Se inician datos basicos como que hay cero clientes inicialmente
  finalizarPrograma = false;
  while(!finalizarPrograma){
     imprimeMenu();
     fflush(stdin); //Eliminar del buffer posible elementos residuales
     scanf("%c",&opcion_deseada);
     fflush(stdin);
     printf("\n\n");
     switch(opcion_deseada){
       case 'I':
         gestorFarma.iniciarGestion();
         break;
       case 'V':
         gestorFarma.listarDatos();
         break;
       case 'M':
         gestorFarma.nuevoAlmacen();
         break;
       case 'A':
         gestorFarma.nuevoPaciente();
         break;
       case 'U':
         gestorFarma.ubicarPaciente();
         break;
       case 'N':
         gestorFarma.nuevoPedidoAlmacen();
         break;
       case 'L':
         gestorFarma.listaDirariaDePedidos();
         break;
      case 'P':
         gestorFarma.programaRutasDron();
         break;
       case 'S':
         finalizarPrograma = true;
         break;
       default:
         printf("ERROR: respuesta introducida no esperada. Repita");
     }
  }
}
