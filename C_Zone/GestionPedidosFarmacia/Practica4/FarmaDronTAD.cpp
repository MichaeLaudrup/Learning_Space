#include "FarmaDronTAD.h"

/*Metodo que inicializa todos los datos adecuadamente*/
void tipoFarmaDron::iniciarFarmaDron(){
   contadorPacientes = 0; //Se parte de la base de que no existen pacientes
   contadorPedidos = 0;


   for(int i = 0; i < MAX_PEDIDOS; i++){
      pedidos[i].numFarmacos = 0;
   }

}
/*Metodo que recoge pacientes controlando en todo momento que no se excedan los 20 pacientes*/
int tipoFarmaDron::recogerPacientes(){
  int resultadoNuevoPaciente;
  bool error, insertarNuevoPaciente;
  int respuesta;
  insertarNuevoPaciente = true; //inicialmente se quiere insertar un paciente nuevo
  printf("Alta nuevo paciente\n\n");
  do{
    resultadoNuevoPaciente = nuevoPaciente();
    if(resultadoNuevoPaciente == 1){  //es 1 en caso de que el paciente se haya insertado con existo
       printf("Cliente insertado con exito\n");
       printf("Otro paciente(S/N)?");
       respuesta = Si_o_No();
       if(respuesta == 1){
          insertarNuevoPaciente = true;  //No es necesaria esta rama del if, pero aporta legibilidad
       }else{
          insertarNuevoPaciente = false;
       }
    }else{
      error = true;
    }
  }while(!error && insertarNuevoPaciente);

}

/*Este metodo se encarga de recoger un solo paciente*/
int tipoFarmaDron::nuevoPaciente(){
  String aux_id;         //se deben guardar los datos en variables auxiliares porque no se sabe si se respondera a la pregunta, datos correctos? con un S o un N
  int aux_distancia;
  int aux_angulo;
  int respuesta;
  bool respuestaLegitima;
  if(contadorPacientes<MAX_PACIENTES){
    printf("\tIdentificador (entre 1 y 20 caracteres)? ");
    scanf("%s",&aux_id);
    fflush(stdin);
    printf("\tDistancia (hasta 10000 metros a plena carga)? ");
    scanf("%d",&aux_distancia);
    fflush(stdin);
    printf("\t%cngulo (entre 0 y 2000 pi/1000 radianes)?",char(181));
    scanf("%d",&aux_angulo);
    fflush(stdin);
    respuestaLegitima = false;
    printf("Datos correctos(S/N)? ");  //Se delega en el usuario la responsabilidad de introducir un angulo entre 0 y 2000
      respuesta = Si_o_No();
      if(respuesta == 1){
        pacientes[contadorPacientes].ref = contadorPacientes+1;
        strcpy(pacientes[contadorPacientes].id,aux_id);
        pacientes[contadorPacientes].distancia = aux_distancia;
        pacientes[contadorPacientes].angulo = aux_angulo;
        contadorPacientes++; //Se incrementa en una unidad el numero de pacientes
        return 1; //indicativo de que esta todo en orden
      }else{
        printf("Paciente descartado.");
        return -1;
      }
  }else{
    printf("Error: Un farmadron no puede gestionar mas de 20 pacientes. No se ha insertado el cliente");
    return -2; //-2 especifica el tipo de error
  }
}

void tipoFarmaDron::listarPacientes(){
  printf("\tRef.  Identificador        Distancia      Angulo\n");
  for(int i= 0; i < contadorPacientes; i++){
    printf("\t%-6d%-21s%-5d          %-4d\n",pacientes[i].ref, pacientes[i].id,pacientes[i].distancia,pacientes[i].angulo);
  }
}

void tipoFarmaDron::nuevosPedidos(){
    int refePa; //referencia del paciente
    do{
      printf("Nuevo Pedido: \n\n");
      printf("\t Ref. Paciente (entre 1 y 20): ");
      scanf("%d",&refePa);
      refePa = refePa -1; //Si el usuario indica la referencia 1, se refiere realmente a la posicion cero del arreglo pacientes, siempre hay que decrementar una unidad
      pedidos[contadorPedidos].ref_paciente = refePa;
      pedidos[contadorPedidos].fechaPedido.recogerFecha();
      do{
        nuevoFarmaco(pedidos[contadorPedidos].numFarmacos);
        pedidos[contadorPedidos].numFarmacos++;
        printf("otro farmaco (S/N)?");
      }while((Si_o_No() == 1) && (pedidos[contadorPedidos].numFarmacos < MAX_FARMACOS) ); //Mientras el usuario diga que quiere mas farmacos y no exceda limite de farmacos por pedido
      contadorPedidos++;
      if(pedidos[contadorPedidos].numFarmacos == MAX_PEDIDOS){
        printf("INFO: No se pueden insertar mas farmacos, capacidad maxima de %d\n", MAX_PEDIDOS);
      }else{
        printf("otro pedido (S/N)?");
      }
    }while((Si_o_No()== 1)  && (pedidos[contadorPedidos].numFarmacos < MAX_PEDIDOS));  //Mientra el usuario diga que si quiere mas pedido y no se exceda el limite maximo de pedido



}

void tipoFarmaDron::nuevoFarmaco(int indiceVectorFarmacos){
  String nombreFarm;
  int pesoGramos;
  printf("Nombre f%crmaco (Entre 1 y 20 caracteres)?",char(160));
  scanf("%s",&nombreFarm);
  fflush(stdin);
  strcpy(pedidos[contadorPedidos].farmacos[indiceVectorFarmacos].nombreFarmaco,nombreFarm);
  printf("Peso f%crmaco (Menor de 3000 gramos)? ",char(160));
  scanf("%d",&pesoGramos);
  if(pesoGramos >0 && pesoGramos <= 3000){
      pedidos[contadorPedidos].farmacos[indiceVectorFarmacos].pesoFarmaco = pesoGramos;
  }else{
      printf("se ha introducido un peso erroneo, se repite el proceso.");
      nuevoFarmaco(indiceVectorFarmacos);
  }
  printf("Unidades de f%crmaco?",char(160));
  scanf("%d",&pedidos[contadorPedidos].farmacos[indiceVectorFarmacos].unidadesFarmaco );

}

void tipoFarmaDron::listarPedido(){
  tipoFecha fecha;
  int referenciaActual;
  int pesoTotal;
  fecha.recogerFecha();
  for(int i = 0; i < contadorPedidos; i++){
     pesoTotal = 0;
     if(fechasIguales(fecha, pedidos[i].fechaPedido)){
       printf("\tPedido %d\n", i+1);
       referenciaActual = pedidos[i].ref_paciente;
       printf("Ubicaci%cn destino: Distancia: %d y %cngulo: %d\n", char(162),pacientes[referenciaActual].distancia,char(181),pacientes[referenciaActual].angulo );
       for(int k = 0; k < pedidos[i].numFarmacos; k++){
          printf(" %2d Unidades\t%-20s Peso: %d gramos\n",pedidos[i].farmacos[k].unidadesFarmaco, pedidos[i].farmacos[k].nombreFarmaco,pedidos[i].farmacos[k].pesoFarmaco);
          pesoTotal = pesoTotal + pedidos[i].farmacos[k].pesoFarmaco;
       }
       printf("            \tPeso Total del envio: %d gramos", pesoTotal);
     }
  }



  }

void tipoFarmaDron::calendarioMensualPedidos(){
  bool error = false;
  int m,  a;
  tipoHojaCalendario hojaCalendario;
  do{
    printf("\nCalendario mensual de pedidos: \n\n");
    printf("Selecci%cn mes? ",char(162));
    scanf("%d",&m);
    fflush(stdin);
    printf("Selecci%cn a%co?",char(162),char(164));
    scanf("%d",&a);
    fflush(stdin);
    hojaCalendario.inicializar(m, a);
    for(int i = 0; i < contadorPedidos; i++){
      if(pedidos[i].fechaPedido.mes == m && pedidos[i].fechaPedido.anio == a){
        hojaCalendario.diasAImprimir[pedidos[i].fechaPedido.dia-1] = true;
      }
    }

    hojaCalendario.calendario();
    printf("Mostrar otro mes (S/N)?");
  }while(Si_o_No() == 1 && !(error));


}


/*Esta funcion devuelve 1 para si, -1 para no, continuara preguntando de manera indefinida hasta que se reciba un S o una N*/
int Si_o_No(){
  char respuesta;
  fflush(stdin);
  scanf("%c",&respuesta);
  fflush(stdin);
  if(respuesta == 'S'){
      return 1;
  }else if(respuesta == 'N'){
      return -1;
  }else{
      printf("Error: No se ha introducido ni una S ni una N, introduzca una N o una S: ");
      return Si_o_No();
  }
}






