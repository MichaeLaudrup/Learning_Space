#include "FarmaDronTAD.h"


/*
 * Este metodo se encarga de inicializar contadores y de meter datos base: 5 almacenes, 10 clientes en 2 almaneces, 15 pedidos en 4 clientes

*/
void tgestor_FarmaDron::iniciarGestion(){
   for(int i = 0; i < 5; i++){
     almacenes[i].codigoAlmacen = i+1;
   }
   /*INSERCION DE 5 ALMACENES*/
    strcpy(almacenes[0].calle, "Avenidad de la felicidad");
    strcpy(almacenes[0].municipio ,"Fuenlabra");
    strcpy(almacenes[0].provincia, "Madrid");
    strcpy(almacenes[0].descripcionAlmacen, "Drogueria Azul celeste");
    /*Se insertan los numero referencia de 10 clientes en dos almacenes*/
    strcpy(almacenes[1].calle, "Calle Teruel");
    strcpy(almacenes[1].municipio, "Vistabella");
    strcpy(almacenes[1].provincia, "Murcia");
    strcpy(almacenes[1].descripcionAlmacen, "Drogueria la Paz");


    strcpy(almacenes[2].calle, "Calle Tamarindos");
    strcpy(almacenes[2].municipio, "Cadiz");
    strcpy(almacenes[2].provincia, "Cadiz");
    strcpy(almacenes[2].descripcionAlmacen, "Drogueria Santa Helena");

    strcpy(almacenes[3].calle, "Calle Campo Arañuelo");
    strcpy(almacenes[3].municipio, "Malpartida de Cáceres");
    strcpy(almacenes[3].provincia, "Cáceres");
    strcpy(almacenes[3].descripcionAlmacen, "Drogueria Los Llanos");

    strcpy(almacenes[4].calle, "Calle del Reboredo");
    strcpy(almacenes[4].municipio, "Monforte de Lemos");
    strcpy(almacenes[4].provincia, "Lugo");
    strcpy(almacenes[4].descripcionAlmacen, "Drogueria Luis Bodegas");
    contadorAlmacenes = 5;

   /*INSERCION DE PACIENTES EN DOS ALMACENES, 10 EN CADA ALMACEN*/
   for(int i = 0; i < 10 ; i++){
    almacenes[0].pacientes[i].ref = i+1;
    almacenes[1].pacientes[i].ref = i+1;
   }

 /*INSERCION DE 10 PACIENTES EN ALMACEN 0*/
    strcpy(almacenes[0].pacientes[0].id,"Pepe");
    almacenes[0].pacientes[0].distancia = 2000;
    almacenes[0].pacientes[0].angulo = 1400;

    strcpy(almacenes[0].pacientes[1].id , "Sofia");
    almacenes[0].pacientes[1].distancia = 9400;
    almacenes[0].pacientes[1].angulo = 906;

    strcpy(almacenes[0].pacientes[2].id,"Juan");
    almacenes[0].pacientes[2].distancia = 3200;
    almacenes[0].pacientes[2].angulo = 567;

    strcpy(almacenes[0].pacientes[3].id , "Bernat");
    almacenes[0].pacientes[3].distancia = 5015;
    almacenes[0].pacientes[3].angulo = 856;

    strcpy(almacenes[0].pacientes[4].id , "Julio");
    almacenes[0].pacientes[4].distancia = 2355;
    almacenes[0].pacientes[4].angulo = 245;

    strcpy(almacenes[0].pacientes[5].id , "Antonio");
    almacenes[0].pacientes[5].distancia = 4754;
    almacenes[0].pacientes[5].angulo = 824;

    strcpy(almacenes[0].pacientes[6].id ,"Maria");
    almacenes[0].pacientes[6].distancia = 5679;
    almacenes[0].pacientes[6].angulo = 1867;

    strcpy(almacenes[0].pacientes[7].id , "Carla");
    almacenes[0].pacientes[7].distancia = 3456;
    almacenes[0].pacientes[7].angulo = 1906;

    strcpy(almacenes[0].pacientes[8].id , "Alvaro");
    almacenes[0].pacientes[8].distancia = 8546;
    almacenes[0].pacientes[8].angulo = 854;

    strcpy(almacenes[0].pacientes[9].id , "Lucia");
    almacenes[0].pacientes[9].distancia = 9556;
    almacenes[0].pacientes[9].angulo = 269;

    almacenes[0].contadorPacientes = 10;
/*INSERCION DE 10 PACIENTES EN ALMACEN 1*/
    strcpy(almacenes[1].pacientes[0].id, "Jaime");
    almacenes[1].pacientes[0].distancia = 3759;
    almacenes[1].pacientes[0].angulo = 465;

    strcpy(almacenes[1].pacientes[1].id, "Carmen");
    almacenes[1].pacientes[1].distancia = 8087;
    almacenes[1].pacientes[1].angulo = 987;

    strcpy(almacenes[1].pacientes[2].id , "Pilar");
    almacenes[1].pacientes[2].distancia = 5490;
    almacenes[1].pacientes[2].angulo = 458;

    strcpy(almacenes[1].pacientes[3].id , "Lucas");
    almacenes[1].pacientes[3].distancia = 7110;
    almacenes[1].pacientes[3].angulo = 478;

    strcpy(almacenes[1].pacientes[4].id , "Miguel");
    almacenes[1].pacientes[4].distancia = 8473;
    almacenes[1].pacientes[4].angulo = 487;

    strcpy(almacenes[1].pacientes[5].id , "Sandra");
    almacenes[1].pacientes[5].distancia = 7491;
    almacenes[1].pacientes[5].angulo = 846;

    strcpy(almacenes[1].pacientes[6].id , "Tamara");
    almacenes[1].pacientes[6].distancia = 8489;
    almacenes[1].pacientes[6].angulo = 958;

    strcpy(almacenes[1].pacientes[7].id , "Carlos");
    almacenes[1].pacientes[7].distancia = 7345;
    almacenes[1].pacientes[7].angulo = 406;

    strcpy(almacenes[1].pacientes[8].id , "Julia");
    almacenes[1].pacientes[8].distancia = 7890;
    almacenes[1].pacientes[8].angulo = 1190;

    strcpy(almacenes[1].pacientes[9].id , "Martina");
    almacenes[1].pacientes[9].distancia = 4578;
    almacenes[1].pacientes[9].angulo = 1920;
    almacenes[1].contadorPacientes = 10;

   /*INSERCIOM DE 15 PEDIDOS A 4 PACINTES*/
      /*INSERCION DE 15 PEDIDOS AL PACIENTE CON REF 1 DEL ALMACEN 0*/

    almacenes[0].contadorPedidos = 30;  //Se insertan 15 a un cliente con ref = 1 y 15 a otro cliente con ref 2
    almacenes[0].pedidos[0].fechaPedido.dia = 2;
    almacenes[0].pedidos[0].fechaPedido.mes = 11;
    almacenes[0].pedidos[0].fechaPedido.anio = 2012;
    almacenes[0].pedidos[0].ref_paciente = 1;
    almacenes[0].pedidos[0].numEnvios = 5;
    almacenes[0].pedidos[0].numFarmacos = 1;
    strcpy(almacenes[0].pedidos[0].farmacos[0].nombreFarmaco, "Aspirina");
    almacenes[0].pedidos[0].farmacos[0].pesoFarmaco = 500;
    almacenes[0].pedidos[0].farmacos[0].unidadesFarmaco = 4;
    /*PEDIDO 2*/
    almacenes[0].pedidos[1].fechaPedido.dia = 2;
    almacenes[0].pedidos[1].fechaPedido.mes = 11;
    almacenes[0].pedidos[1].fechaPedido.anio = 2012;
    almacenes[0].pedidos[1].ref_paciente = 1;
    almacenes[0].pedidos[1].numEnvios = 3;
    almacenes[0].pedidos[1].numFarmacos = 1;
    strcpy(almacenes[0].pedidos[1].farmacos[0].nombreFarmaco, "Verapamilo");
    almacenes[0].pedidos[1].farmacos[0].pesoFarmaco = 180;
    almacenes[0].pedidos[1].farmacos[0].unidadesFarmaco = 2;
    /*PEDIDO 3*/
    almacenes[0].pedidos[2].fechaPedido.dia = 2;
    almacenes[0].pedidos[2].fechaPedido.mes = 11;
    almacenes[0].pedidos[2].fechaPedido.anio = 2012;
    almacenes[0].pedidos[2].ref_paciente = 1;
    almacenes[0].pedidos[2].numEnvios = 8;
    almacenes[0].pedidos[2].numFarmacos = 1;
    strcpy(almacenes[0].pedidos[2].farmacos[0].nombreFarmaco, "Tiapride");
    almacenes[0].pedidos[2].farmacos[0].pesoFarmaco = 300;
    almacenes[0].pedidos[2].farmacos[0].unidadesFarmaco = 1;

    almacenes[0].pedidos[3].fechaPedido.dia = 10;
    almacenes[0].pedidos[3].fechaPedido.mes = 11;
    almacenes[0].pedidos[3].fechaPedido.anio = 2012;
    almacenes[0].pedidos[3].ref_paciente = 1;
    almacenes[0].pedidos[3].numEnvios = 9;
    almacenes[0].pedidos[3].numFarmacos = 1;
    strcpy(almacenes[0].pedidos[3].farmacos[0].nombreFarmaco, "Somatostatina");
    almacenes[0].pedidos[3].farmacos[0].pesoFarmaco = 400;
    almacenes[0].pedidos[3].farmacos[0].unidadesFarmaco = 5;

    almacenes[0].pedidos[4].fechaPedido.dia = 12;
    almacenes[0].pedidos[4].fechaPedido.mes = 11;
    almacenes[0].pedidos[4].fechaPedido.anio = 2012;
    almacenes[0].pedidos[4].ref_paciente = 1;
    almacenes[0].pedidos[4].numEnvios = 10;
    almacenes[0].pedidos[4].numFarmacos = 1;
    strcpy(almacenes[0].pedidos[4].farmacos[0].nombreFarmaco, "Salbutamol");
    almacenes[0].pedidos[4].farmacos[0].pesoFarmaco = 350;
    almacenes[0].pedidos[4].farmacos[0].unidadesFarmaco = 1;

    almacenes[0].pedidos[5].fechaPedido.dia = 14;
    almacenes[0].pedidos[5].fechaPedido.mes = 11;
    almacenes[0].pedidos[5].fechaPedido.anio = 2012;
    almacenes[0].pedidos[5].ref_paciente = 1;
    almacenes[0].pedidos[5].numEnvios = 5;
    almacenes[0].pedidos[5].numFarmacos = 1;
    strcpy(almacenes[0].pedidos[5].farmacos[0].nombreFarmaco, "Propofol");
    almacenes[0].pedidos[5].farmacos[0].pesoFarmaco = 450;
    almacenes[0].pedidos[5].farmacos[0].unidadesFarmaco = 3;

    almacenes[0].pedidos[6].fechaPedido.dia = 16;
    almacenes[0].pedidos[6].fechaPedido.mes = 11;
    almacenes[0].pedidos[6].fechaPedido.anio = 2012;
    almacenes[0].pedidos[6].ref_paciente = 1;
    almacenes[0].pedidos[6].numEnvios = 5;
    almacenes[0].pedidos[6].numFarmacos = 1;
    strcpy(almacenes[0].pedidos[6].farmacos[0].nombreFarmaco, "Propacetamol");
    almacenes[0].pedidos[6].farmacos[0].pesoFarmaco = 250;
    almacenes[0].pedidos[6].farmacos[0].unidadesFarmaco = 6;

    almacenes[0].pedidos[7].fechaPedido.dia = 18;
    almacenes[0].pedidos[7].fechaPedido.mes = 11;
    almacenes[0].pedidos[7].fechaPedido.anio = 2012;
    almacenes[0].pedidos[7].ref_paciente = 1;
    almacenes[0].pedidos[7].numEnvios = 5;
    almacenes[0].pedidos[7].numFarmacos = 1;
    strcpy(almacenes[0].pedidos[7].farmacos[0].nombreFarmaco, "Morfina");
    almacenes[0].pedidos[7].farmacos[0].pesoFarmaco = 500;
    almacenes[0].pedidos[7].farmacos[0].unidadesFarmaco = 4;

    almacenes[0].pedidos[8].fechaPedido.dia = 20;
    almacenes[0].pedidos[8].fechaPedido.mes = 11;
    almacenes[0].pedidos[8].fechaPedido.anio = 2012;
    almacenes[0].pedidos[8].ref_paciente = 1;
    almacenes[0].pedidos[8].numEnvios = 5;
    almacenes[0].pedidos[8].numFarmacos = 1;
    strcpy(almacenes[0].pedidos[8].farmacos[0].nombreFarmaco, "Lidocaina");
    almacenes[0].pedidos[8].farmacos[0].pesoFarmaco = 100;
    almacenes[0].pedidos[8].farmacos[0].unidadesFarmaco = 3;

    almacenes[0].pedidos[9].fechaPedido.dia = 22;
    almacenes[0].pedidos[9].fechaPedido.mes = 11;
    almacenes[0].pedidos[9].fechaPedido.anio = 2012;
    almacenes[0].pedidos[9].ref_paciente = 1;
    almacenes[0].pedidos[9].numEnvios = 5;
    almacenes[0].pedidos[9].numFarmacos = 1;
    strcpy(almacenes[0].pedidos[9].farmacos[0].nombreFarmaco, "Isoprotenerol");
    almacenes[0].pedidos[9].farmacos[0].pesoFarmaco = 600;
    almacenes[0].pedidos[9].farmacos[0].unidadesFarmaco = 5;

    almacenes[0].pedidos[10].fechaPedido.dia = 24;
    almacenes[0].pedidos[10].fechaPedido.mes = 11;
    almacenes[0].pedidos[10].fechaPedido.anio = 2012;
    almacenes[0].pedidos[10].ref_paciente = 1;
    almacenes[0].pedidos[10].numEnvios = 5;
    almacenes[0].pedidos[10].numFarmacos = 1;
    strcpy(almacenes[0].pedidos[10].farmacos[0].nombreFarmaco, "Hidrocortisona");
    almacenes[0].pedidos[10].farmacos[0].pesoFarmaco = 650;
    almacenes[0].pedidos[10].farmacos[0].unidadesFarmaco = 1;

    almacenes[0].pedidos[11].fechaPedido.dia = 26;
    almacenes[0].pedidos[11].fechaPedido.mes = 11;
    almacenes[0].pedidos[11].fechaPedido.anio = 2012;
    almacenes[0].pedidos[11].ref_paciente = 1;
    almacenes[0].pedidos[11].numEnvios = 6;
    almacenes[0].pedidos[11].numFarmacos = 1;
    strcpy(almacenes[0].pedidos[11].farmacos[0].nombreFarmaco, "Ketorolaco");
    almacenes[0].pedidos[11].farmacos[0].pesoFarmaco = 300;
    almacenes[0].pedidos[11].farmacos[0].unidadesFarmaco = 2;

    almacenes[0].pedidos[12].fechaPedido.dia = 27;
    almacenes[0].pedidos[12].fechaPedido.mes = 11;
    almacenes[0].pedidos[12].fechaPedido.anio = 2012;
    almacenes[0].pedidos[12].ref_paciente = 1;
    almacenes[0].pedidos[12].numEnvios = 2;
    almacenes[0].pedidos[12].numFarmacos = 1;
    strcpy(almacenes[0].pedidos[12].farmacos[0].nombreFarmaco, "Nimodipino");
    almacenes[0].pedidos[12].farmacos[0].pesoFarmaco = 200;
    almacenes[0].pedidos[12].farmacos[0].unidadesFarmaco = 3;

    almacenes[0].pedidos[13].fechaPedido.dia = 28;
    almacenes[0].pedidos[13].fechaPedido.mes = 11;
    almacenes[0].pedidos[13].fechaPedido.anio = 2012;
    almacenes[0].pedidos[13].ref_paciente = 1;
    almacenes[0].pedidos[13].numEnvios = 4;
    almacenes[0].pedidos[13].numFarmacos = 1;
    strcpy(almacenes[0].pedidos[13].farmacos[0].nombreFarmaco, "Omeprazol");
    almacenes[0].pedidos[13].farmacos[0].pesoFarmaco = 150;
    almacenes[0].pedidos[13].farmacos[0].unidadesFarmaco = 6;

    almacenes[0].pedidos[14].fechaPedido.dia = 30;
    almacenes[0].pedidos[14].fechaPedido.mes = 11;
    almacenes[0].pedidos[14].fechaPedido.anio = 2012;
    almacenes[0].pedidos[14].ref_paciente = 1;
    almacenes[0].pedidos[14].numEnvios = 12;
    almacenes[0].pedidos[14].numFarmacos = 1;
    strcpy(almacenes[0].pedidos[14].farmacos[0].nombreFarmaco, "Haloperidol");
    almacenes[0].pedidos[14].farmacos[0].pesoFarmaco = 250;
    almacenes[0].pedidos[14].farmacos[0].unidadesFarmaco =1;

    /*INSERCION DE 15 PEDIDOS A UN SEGUNDO CLIENTE CON REF 2*/
    almacenes[0].pedidos[15].fechaPedido.dia = 2;
    almacenes[0].pedidos[15].fechaPedido.mes = 11;
    almacenes[0].pedidos[15].fechaPedido.anio = 2012;
    almacenes[0].pedidos[15].ref_paciente = 2;
    almacenes[0].pedidos[15].numEnvios = 5;
    almacenes[0].pedidos[15].numFarmacos = 1;
    strcpy(almacenes[0].pedidos[15].farmacos[0].nombreFarmaco, "Aspirina");
    almacenes[0].pedidos[15].farmacos[0].pesoFarmaco = 500;
    almacenes[0].pedidos[15].farmacos[0].unidadesFarmaco = 4;
    /*PEDIDO 2*/
    almacenes[0].pedidos[16].fechaPedido.dia = 2;
    almacenes[0].pedidos[16].fechaPedido.mes = 11;
    almacenes[0].pedidos[16].fechaPedido.anio = 2012;
    almacenes[0].pedidos[16].ref_paciente = 2;
    almacenes[0].pedidos[16].numEnvios = 3;
    almacenes[0].pedidos[16].numFarmacos = 1;
    strcpy(almacenes[0].pedidos[16].farmacos[0].nombreFarmaco, "Verapamilo");
    almacenes[0].pedidos[16].farmacos[0].pesoFarmaco = 180;
    almacenes[0].pedidos[16].farmacos[0].unidadesFarmaco = 2;
    /*PEDIDO 3*/
    almacenes[0].pedidos[17].fechaPedido.dia = 8;
    almacenes[0].pedidos[17].fechaPedido.mes = 11;
    almacenes[0].pedidos[17].fechaPedido.anio = 2012;
    almacenes[0].pedidos[17].ref_paciente = 2;
    almacenes[0].pedidos[17].numEnvios = 8;
    almacenes[0].pedidos[17].numFarmacos = 1;
    strcpy(almacenes[0].pedidos[17].farmacos[0].nombreFarmaco, "Tiapride");
    almacenes[0].pedidos[17].farmacos[0].pesoFarmaco = 300;
    almacenes[0].pedidos[17].farmacos[0].unidadesFarmaco = 1;
    /*PEDIDO 4*/
    almacenes[0].pedidos[18].fechaPedido.dia = 10;
    almacenes[0].pedidos[18].fechaPedido.mes = 11;
    almacenes[0].pedidos[18].fechaPedido.anio = 2012;
    almacenes[0].pedidos[18].ref_paciente = 2;
    almacenes[0].pedidos[18].numEnvios = 9;
    almacenes[0].pedidos[18].numFarmacos = 1;
    strcpy(almacenes[0].pedidos[18].farmacos[0].nombreFarmaco, "Somatostatina");
    almacenes[0].pedidos[18].farmacos[0].pesoFarmaco = 400;
    almacenes[0].pedidos[18].farmacos[0].unidadesFarmaco = 5;

    almacenes[0].pedidos[19].fechaPedido.dia = 12;
    almacenes[0].pedidos[19].fechaPedido.mes = 11;
    almacenes[0].pedidos[19].fechaPedido.anio = 2012;
    almacenes[0].pedidos[19].ref_paciente = 2;
    almacenes[0].pedidos[19].numEnvios = 10;
    almacenes[0].pedidos[19].numFarmacos = 1;
    strcpy(almacenes[0].pedidos[19].farmacos[0].nombreFarmaco, "Salbutamol");
    almacenes[0].pedidos[19].farmacos[0].pesoFarmaco = 350;
    almacenes[0].pedidos[19].farmacos[0].unidadesFarmaco = 1;

    almacenes[0].pedidos[20].fechaPedido.dia = 14;
    almacenes[0].pedidos[20].fechaPedido.mes = 11;
    almacenes[0].pedidos[20].fechaPedido.anio = 2012;
    almacenes[0].pedidos[20].ref_paciente = 2;
    almacenes[0].pedidos[20].numEnvios = 5;
    almacenes[0].pedidos[20].numFarmacos = 1;
    strcpy(almacenes[0].pedidos[20].farmacos[0].nombreFarmaco, "Propofol");
    almacenes[0].pedidos[20].farmacos[0].pesoFarmaco = 450;
    almacenes[0].pedidos[20].farmacos[0].unidadesFarmaco = 3;

    almacenes[0].pedidos[21].fechaPedido.dia = 16;
    almacenes[0].pedidos[21].fechaPedido.mes = 11;
    almacenes[0].pedidos[21].fechaPedido.anio = 2012;
    almacenes[0].pedidos[21].ref_paciente = 2;
    almacenes[0].pedidos[21].numEnvios = 5;
    almacenes[0].pedidos[21].numFarmacos = 1;
    strcpy(almacenes[0].pedidos[21].farmacos[0].nombreFarmaco, "Propacetamol");
    almacenes[0].pedidos[21].farmacos[0].pesoFarmaco = 250;
    almacenes[0].pedidos[21].farmacos[0].unidadesFarmaco = 6;

    almacenes[0].pedidos[22].fechaPedido.dia = 18;
    almacenes[0].pedidos[22].fechaPedido.mes = 11;
    almacenes[0].pedidos[22].fechaPedido.anio = 2012;
    almacenes[0].pedidos[22].ref_paciente = 2;
    almacenes[0].pedidos[22].numEnvios = 5;
    almacenes[0].pedidos[22].numFarmacos = 1;
    strcpy(almacenes[0].pedidos[22].farmacos[0].nombreFarmaco, "Morfina");
    almacenes[0].pedidos[22].farmacos[0].pesoFarmaco = 500;
    almacenes[0].pedidos[22].farmacos[0].unidadesFarmaco = 4;

    almacenes[0].pedidos[23].fechaPedido.dia = 20;
    almacenes[0].pedidos[23].fechaPedido.mes = 11;
    almacenes[0].pedidos[23].fechaPedido.anio = 2012;
    almacenes[0].pedidos[23].ref_paciente = 2;
    almacenes[0].pedidos[23].numEnvios = 5;
    almacenes[0].pedidos[23].numFarmacos = 1;
    strcpy(almacenes[0].pedidos[23].farmacos[0].nombreFarmaco, "Lidocaina");
    almacenes[0].pedidos[23].farmacos[0].pesoFarmaco = 100;
    almacenes[0].pedidos[23].farmacos[0].unidadesFarmaco = 3;

    almacenes[0].pedidos[24].fechaPedido.dia = 22;
    almacenes[0].pedidos[24].fechaPedido.mes = 11;
    almacenes[0].pedidos[24].fechaPedido.anio = 2012;
    almacenes[0].pedidos[24].ref_paciente = 2;
    almacenes[0].pedidos[24].numEnvios = 5;
    almacenes[0].pedidos[24].numFarmacos = 1;
    strcpy(almacenes[0].pedidos[24].farmacos[0].nombreFarmaco, "Isoprotenerol");
    almacenes[0].pedidos[24].farmacos[0].pesoFarmaco = 600;
    almacenes[0].pedidos[24].farmacos[0].unidadesFarmaco = 5;

    almacenes[0].pedidos[25].fechaPedido.dia = 24;
    almacenes[0].pedidos[25].fechaPedido.mes = 11;
    almacenes[0].pedidos[25].fechaPedido.anio = 2012;
    almacenes[0].pedidos[25].ref_paciente = 2;
    almacenes[0].pedidos[25].numEnvios = 5;
    almacenes[0].pedidos[25].numFarmacos = 1;
    strcpy(almacenes[0].pedidos[25].farmacos[0].nombreFarmaco, "Hidrocortisona");
    almacenes[0].pedidos[25].farmacos[0].pesoFarmaco = 650;
    almacenes[0].pedidos[25].farmacos[0].unidadesFarmaco = 1;

    almacenes[0].pedidos[26].fechaPedido.dia = 26;
    almacenes[0].pedidos[26].fechaPedido.mes = 11;
    almacenes[0].pedidos[26].fechaPedido.anio = 2012;
    almacenes[0].pedidos[26].ref_paciente = 2;
    almacenes[0].pedidos[26].numEnvios = 6;
    almacenes[0].pedidos[26].numFarmacos = 1;
    strcpy(almacenes[0].pedidos[26].farmacos[0].nombreFarmaco, "Ketorolaco");
    almacenes[0].pedidos[26].farmacos[0].pesoFarmaco = 300;
    almacenes[0].pedidos[26].farmacos[0].unidadesFarmaco = 2;

    almacenes[0].pedidos[27].fechaPedido.dia = 27;
    almacenes[0].pedidos[27].fechaPedido.mes = 11;
    almacenes[0].pedidos[27].fechaPedido.anio = 2012;
    almacenes[0].pedidos[27].ref_paciente = 2;
    almacenes[0].pedidos[27].numEnvios = 2;
    almacenes[0].pedidos[27].numFarmacos = 1;
    strcpy(almacenes[0].pedidos[27].farmacos[0].nombreFarmaco, "Nimodipino");
    almacenes[0].pedidos[27].farmacos[0].pesoFarmaco = 200;
    almacenes[0].pedidos[27].farmacos[0].unidadesFarmaco = 3;

    almacenes[0].pedidos[28].fechaPedido.dia = 28;
    almacenes[0].pedidos[28].fechaPedido.mes = 11;
    almacenes[0].pedidos[28].fechaPedido.anio = 2012;
    almacenes[0].pedidos[28].ref_paciente = 2;
    almacenes[0].pedidos[28].numEnvios = 4;
    almacenes[0].pedidos[28].numFarmacos = 1;
    strcpy(almacenes[0].pedidos[28].farmacos[0].nombreFarmaco, "Omeprazol");
    almacenes[0].pedidos[28].farmacos[0].pesoFarmaco = 150;
    almacenes[0].pedidos[28].farmacos[0].unidadesFarmaco = 6;

    almacenes[0].pedidos[29].fechaPedido.dia = 30;
    almacenes[0].pedidos[29].fechaPedido.mes = 11;
    almacenes[0].pedidos[29].fechaPedido.anio = 2012;
    almacenes[0].pedidos[29].ref_paciente = 2;
    almacenes[0].pedidos[29].numEnvios = 12;
    almacenes[0].pedidos[29].numFarmacos = 1;
    strcpy(almacenes[0].pedidos[29].farmacos[0].nombreFarmaco, "Haloperidol");
    almacenes[0].pedidos[29].farmacos[0].pesoFarmaco = 250;
    almacenes[0].pedidos[29].farmacos[0].unidadesFarmaco =1;

    almacenes[1].contadorPedidos = 30;  //Se insertan 15 a un cliente con ref = 1 y 15 a otro cliente con ref 2
    almacenes[1].pedidos[0].fechaPedido.dia = 2;
    almacenes[1].pedidos[0].fechaPedido.mes = 11;
    almacenes[1].pedidos[0].fechaPedido.anio = 2012;
    almacenes[1].pedidos[0].ref_paciente = 1;
    almacenes[1].pedidos[0].numEnvios = 5;
    almacenes[1].pedidos[0].numFarmacos = 1;
    strcpy(almacenes[1].pedidos[0].farmacos[0].nombreFarmaco, "Aspirina");
    almacenes[1].pedidos[0].farmacos[0].pesoFarmaco = 500;
    almacenes[1].pedidos[0].farmacos[0].unidadesFarmaco = 4;
    /*PEDIDO 2*/
    almacenes[1].pedidos[1].fechaPedido.dia = 4;
    almacenes[1].pedidos[1].fechaPedido.mes = 11;
    almacenes[1].pedidos[1].fechaPedido.anio = 2012;
    almacenes[1].pedidos[1].ref_paciente = 1;
    almacenes[1].pedidos[1].numEnvios = 3;
    almacenes[1].pedidos[1].numFarmacos = 1;
    strcpy(almacenes[1].pedidos[1].farmacos[0].nombreFarmaco, "Verapamilo");
    almacenes[1].pedidos[1].farmacos[0].pesoFarmaco = 180;
    almacenes[1].pedidos[1].farmacos[0].unidadesFarmaco = 2;
    /*PEDIDO 3*/
    almacenes[1].pedidos[2].fechaPedido.dia = 8;
    almacenes[1].pedidos[2].fechaPedido.mes = 11;
    almacenes[1].pedidos[2].fechaPedido.anio = 2012;
    almacenes[1].pedidos[2].ref_paciente = 1;
    almacenes[1].pedidos[2].numEnvios = 8;
    almacenes[1].pedidos[2].numFarmacos = 1;
    strcpy(almacenes[1].pedidos[2].farmacos[0].nombreFarmaco, "Tiapride");
    almacenes[1].pedidos[2].farmacos[0].pesoFarmaco = 300;
    almacenes[1].pedidos[2].farmacos[0].unidadesFarmaco = 1;

    almacenes[1].pedidos[3].fechaPedido.dia = 10;
    almacenes[1].pedidos[3].fechaPedido.mes = 11;
    almacenes[1].pedidos[3].fechaPedido.anio = 2012;
    almacenes[1].pedidos[3].ref_paciente = 1;
    almacenes[1].pedidos[3].numEnvios = 9;
    almacenes[1].pedidos[3].numFarmacos = 1;
    strcpy(almacenes[1].pedidos[3].farmacos[0].nombreFarmaco, "Somatostatina");
    almacenes[1].pedidos[3].farmacos[0].pesoFarmaco = 400;
    almacenes[1].pedidos[3].farmacos[0].unidadesFarmaco = 5;

    almacenes[1].pedidos[4].fechaPedido.dia = 12;
    almacenes[1].pedidos[4].fechaPedido.mes = 11;
    almacenes[1].pedidos[4].fechaPedido.anio = 2012;
    almacenes[1].pedidos[4].ref_paciente = 1;
    almacenes[1].pedidos[4].numEnvios = 10;
    almacenes[1].pedidos[4].numFarmacos = 1;
    strcpy(almacenes[1].pedidos[4].farmacos[0].nombreFarmaco, "Salbutamol");
    almacenes[1].pedidos[4].farmacos[0].pesoFarmaco = 350;
    almacenes[1].pedidos[4].farmacos[0].unidadesFarmaco = 1;

    almacenes[1].pedidos[5].fechaPedido.dia = 14;
    almacenes[1].pedidos[5].fechaPedido.mes = 11;
    almacenes[1].pedidos[5].fechaPedido.anio = 2012;
    almacenes[1].pedidos[5].ref_paciente = 1;
    almacenes[1].pedidos[5].numEnvios = 5;
    almacenes[1].pedidos[5].numFarmacos = 1;
    strcpy(almacenes[1].pedidos[5].farmacos[0].nombreFarmaco, "Propofol");
    almacenes[1].pedidos[5].farmacos[0].pesoFarmaco = 450;
    almacenes[1].pedidos[5].farmacos[0].unidadesFarmaco = 3;

    almacenes[1].pedidos[6].fechaPedido.dia = 16;
    almacenes[1].pedidos[6].fechaPedido.mes = 11;
    almacenes[1].pedidos[6].fechaPedido.anio = 2012;
    almacenes[1].pedidos[6].ref_paciente = 1;
    almacenes[1].pedidos[6].numEnvios = 5;
    almacenes[1].pedidos[6].numFarmacos = 1;
    strcpy(almacenes[1].pedidos[6].farmacos[0].nombreFarmaco, "Propacetamol");
    almacenes[1].pedidos[6].farmacos[0].pesoFarmaco = 250;
    almacenes[1].pedidos[6].farmacos[0].unidadesFarmaco = 6;

    almacenes[1].pedidos[7].fechaPedido.dia = 18;
    almacenes[1].pedidos[7].fechaPedido.mes = 11;
    almacenes[1].pedidos[7].fechaPedido.anio = 2012;
    almacenes[1].pedidos[7].ref_paciente = 1;
    almacenes[1].pedidos[7].numEnvios = 5;
    almacenes[1].pedidos[7].numFarmacos = 1;
    strcpy(almacenes[1].pedidos[7].farmacos[0].nombreFarmaco, "Morfina");
    almacenes[1].pedidos[7].farmacos[0].pesoFarmaco = 500;
    almacenes[1].pedidos[7].farmacos[0].unidadesFarmaco = 4;

    almacenes[1].pedidos[8].fechaPedido.dia = 20;
    almacenes[1].pedidos[8].fechaPedido.mes = 11;
    almacenes[1].pedidos[8].fechaPedido.anio = 2012;
    almacenes[1].pedidos[8].ref_paciente = 1;
    almacenes[1].pedidos[8].numEnvios = 5;
    almacenes[1].pedidos[8].numFarmacos = 1;
    strcpy(almacenes[1].pedidos[8].farmacos[0].nombreFarmaco, "Lidocaina");
    almacenes[1].pedidos[8].farmacos[0].pesoFarmaco = 100;
    almacenes[1].pedidos[8].farmacos[0].unidadesFarmaco = 3;

    almacenes[1].pedidos[9].fechaPedido.dia = 22;
    almacenes[1].pedidos[9].fechaPedido.mes = 11;
    almacenes[1].pedidos[9].fechaPedido.anio = 2012;
    almacenes[1].pedidos[9].ref_paciente = 1;
    almacenes[1].pedidos[9].numEnvios = 5;
    almacenes[1].pedidos[9].numFarmacos = 1;
    strcpy(almacenes[1].pedidos[9].farmacos[0].nombreFarmaco, "Isoprotenerol");
    almacenes[1].pedidos[9].farmacos[0].pesoFarmaco = 600;
    almacenes[1].pedidos[9].farmacos[0].unidadesFarmaco = 5;

    almacenes[1].pedidos[10].fechaPedido.dia = 24;
    almacenes[1].pedidos[10].fechaPedido.mes = 11;
    almacenes[1].pedidos[10].fechaPedido.anio = 2012;
    almacenes[1].pedidos[10].ref_paciente = 1;
    almacenes[1].pedidos[10].numEnvios = 5;
    almacenes[1].pedidos[10].numFarmacos = 1;
    strcpy(almacenes[1].pedidos[10].farmacos[0].nombreFarmaco, "Hidrocortisona");
    almacenes[1].pedidos[10].farmacos[0].pesoFarmaco = 650;
    almacenes[1].pedidos[10].farmacos[0].unidadesFarmaco = 1;

    almacenes[1].pedidos[11].fechaPedido.dia = 26;
    almacenes[1].pedidos[11].fechaPedido.mes = 11;
    almacenes[1].pedidos[11].fechaPedido.anio = 2012;
    almacenes[1].pedidos[11].ref_paciente = 1;
    almacenes[1].pedidos[11].numEnvios = 6;
    almacenes[1].pedidos[11].numFarmacos = 1;
    strcpy(almacenes[1].pedidos[11].farmacos[0].nombreFarmaco, "Ketorolaco");
    almacenes[1].pedidos[11].farmacos[0].pesoFarmaco = 300;
    almacenes[1].pedidos[11].farmacos[0].unidadesFarmaco = 2;

    almacenes[1].pedidos[12].fechaPedido.dia = 27;
    almacenes[1].pedidos[12].fechaPedido.mes = 11;
    almacenes[1].pedidos[12].fechaPedido.anio = 2012;
    almacenes[1].pedidos[12].ref_paciente = 1;
    almacenes[1].pedidos[12].numEnvios = 2;
    almacenes[1].pedidos[12].numFarmacos = 1;
    strcpy(almacenes[1].pedidos[12].farmacos[0].nombreFarmaco, "Nimodipino");
    almacenes[1].pedidos[12].farmacos[0].pesoFarmaco = 200;
    almacenes[1].pedidos[12].farmacos[0].unidadesFarmaco = 3;

    almacenes[1].pedidos[13].fechaPedido.dia = 28;
    almacenes[1].pedidos[13].fechaPedido.mes = 11;
    almacenes[1].pedidos[13].fechaPedido.anio = 2012;
    almacenes[1].pedidos[13].ref_paciente = 1;
    almacenes[1].pedidos[13].numEnvios = 4;
    almacenes[1].pedidos[13].numFarmacos = 1;
    strcpy(almacenes[1].pedidos[13].farmacos[0].nombreFarmaco, "Omeprazol");
    almacenes[1].pedidos[13].farmacos[0].pesoFarmaco = 150;
    almacenes[1].pedidos[13].farmacos[0].unidadesFarmaco = 6;

    almacenes[1].pedidos[14].fechaPedido.dia = 30;
    almacenes[1].pedidos[14].fechaPedido.mes = 11;
    almacenes[1].pedidos[14].fechaPedido.anio = 2012;
    almacenes[1].pedidos[14].ref_paciente = 1;
    almacenes[1].pedidos[14].numEnvios = 12;
    almacenes[1].pedidos[14].numFarmacos = 1;
    strcpy(almacenes[1].pedidos[14].farmacos[0].nombreFarmaco, "Haloperidol");
    almacenes[1].pedidos[14].farmacos[0].pesoFarmaco = 250;
    almacenes[1].pedidos[14].farmacos[0].unidadesFarmaco =1;

    /*INSERCIO1 DE 15 PEDIDOS A UN SEGUNDO CLIENTE CON REF 2*/
    almacenes[1].contadorPedidos = 30;
    almacenes[1].pedidos[15].fechaPedido.dia = 2;
    almacenes[1].pedidos[15].fechaPedido.mes = 11;
    almacenes[1].pedidos[15].fechaPedido.anio = 2012;
    almacenes[1].pedidos[15].ref_paciente = 2;
    almacenes[1].pedidos[15].numEnvios = 5;
    almacenes[1].pedidos[15].numFarmacos = 1;
    strcpy(almacenes[1].pedidos[15].farmacos[0].nombreFarmaco, "Aspirina");
    almacenes[1].pedidos[15].farmacos[0].pesoFarmaco = 500;
    almacenes[1].pedidos[15].farmacos[0].unidadesFarmaco = 4;
    /*PEDIDO 2*/
    almacenes[1].pedidos[16].fechaPedido.dia = 4;
    almacenes[1].pedidos[16].fechaPedido.mes = 11;
    almacenes[1].pedidos[16].fechaPedido.anio = 2012;
    almacenes[1].pedidos[16].ref_paciente = 2;
    almacenes[1].pedidos[16].numEnvios = 3;
    almacenes[1].pedidos[16].numFarmacos = 1;
    strcpy(almacenes[1].pedidos[16].farmacos[0].nombreFarmaco, "Verapamilo");
    almacenes[1].pedidos[16].farmacos[0].pesoFarmaco = 180;
    almacenes[1].pedidos[16].farmacos[0].unidadesFarmaco = 2;
    /*PEDIDO 3*/
    almacenes[1].pedidos[17].fechaPedido.dia = 8;
    almacenes[1].pedidos[17].fechaPedido.mes = 11;
    almacenes[1].pedidos[17].fechaPedido.anio = 2012;
    almacenes[1].pedidos[17].ref_paciente = 2;
    almacenes[1].pedidos[17].numEnvios = 8;
    almacenes[1].pedidos[17].numFarmacos = 1;
    strcpy(almacenes[1].pedidos[17].farmacos[0].nombreFarmaco, "Tiapride");
    almacenes[1].pedidos[17].farmacos[0].pesoFarmaco = 300;
    almacenes[1].pedidos[17].farmacos[0].unidadesFarmaco = 1;
    /*PEDIDO 4*/
    almacenes[1].pedidos[18].fechaPedido.dia = 10;
    almacenes[1].pedidos[18].fechaPedido.mes = 11;
    almacenes[1].pedidos[18].fechaPedido.anio = 2012;
    almacenes[1].pedidos[18].ref_paciente = 2;
    almacenes[1].pedidos[18].numEnvios = 9;
    almacenes[1].pedidos[18].numFarmacos = 1;
    strcpy(almacenes[1].pedidos[18].farmacos[0].nombreFarmaco, "Somatostatina");
    almacenes[1].pedidos[18].farmacos[0].pesoFarmaco = 400;
    almacenes[1].pedidos[18].farmacos[0].unidadesFarmaco = 5;
    /*PEDIDO 5*/
    almacenes[1].pedidos[19].fechaPedido.dia = 12;
    almacenes[1].pedidos[19].fechaPedido.mes = 11;
    almacenes[1].pedidos[19].fechaPedido.anio = 2012;
    almacenes[1].pedidos[19].ref_paciente = 2;
    almacenes[1].pedidos[19].numEnvios = 10;
    almacenes[1].pedidos[19].numFarmacos = 1;
    strcpy(almacenes[1].pedidos[19].farmacos[0].nombreFarmaco, "Salbutamol");
    almacenes[1].pedidos[19].farmacos[0].pesoFarmaco = 350;
    almacenes[1].pedidos[19].farmacos[0].unidadesFarmaco = 1;

    almacenes[1].pedidos[20].fechaPedido.dia = 14;
    almacenes[1].pedidos[20].fechaPedido.mes = 11;
    almacenes[1].pedidos[20].fechaPedido.anio = 2012;
    almacenes[1].pedidos[20].ref_paciente = 2;
    almacenes[1].pedidos[20].numEnvios = 5;
    almacenes[1].pedidos[20].numFarmacos = 1;
    strcpy(almacenes[1].pedidos[20].farmacos[0].nombreFarmaco, "Propofol");
    almacenes[1].pedidos[20].farmacos[0].pesoFarmaco = 450;
    almacenes[1].pedidos[20].farmacos[0].unidadesFarmaco = 3;

    almacenes[1].pedidos[21].fechaPedido.dia = 16;
    almacenes[1].pedidos[21].fechaPedido.mes = 11;
    almacenes[1].pedidos[21].fechaPedido.anio = 2012;
    almacenes[1].pedidos[21].ref_paciente = 2;
    almacenes[1].pedidos[21].numEnvios = 5;
    almacenes[1].pedidos[21].numFarmacos = 1;
    strcpy(almacenes[1].pedidos[21].farmacos[0].nombreFarmaco, "Propacetamol");
    almacenes[1].pedidos[21].farmacos[0].pesoFarmaco = 250;
    almacenes[1].pedidos[21].farmacos[0].unidadesFarmaco = 6;

    almacenes[1].pedidos[22].fechaPedido.dia = 18;
    almacenes[1].pedidos[22].fechaPedido.mes = 11;
    almacenes[1].pedidos[22].fechaPedido.anio = 2012;
    almacenes[1].pedidos[22].ref_paciente = 2;
    almacenes[1].pedidos[22].numEnvios = 5;
    almacenes[1].pedidos[22].numFarmacos = 1;
    strcpy(almacenes[1].pedidos[22].farmacos[0].nombreFarmaco, "Morfina");
    almacenes[1].pedidos[22].farmacos[0].pesoFarmaco = 500;
    almacenes[1].pedidos[22].farmacos[0].unidadesFarmaco = 4;

    almacenes[1].pedidos[23].fechaPedido.dia = 20;
    almacenes[1].pedidos[23].fechaPedido.mes = 11;
    almacenes[1].pedidos[23].fechaPedido.anio = 2012;
    almacenes[1].pedidos[23].ref_paciente = 2;
    almacenes[1].pedidos[23].numEnvios = 5;
    almacenes[1].pedidos[23].numFarmacos = 1;
    strcpy(almacenes[1].pedidos[23].farmacos[0].nombreFarmaco, "Lidocaina");
    almacenes[1].pedidos[23].farmacos[0].pesoFarmaco = 100;
    almacenes[1].pedidos[23].farmacos[0].unidadesFarmaco = 3;

    almacenes[1].pedidos[24].fechaPedido.dia = 22;
    almacenes[1].pedidos[24].fechaPedido.mes = 11;
    almacenes[1].pedidos[24].fechaPedido.anio = 2012;
    almacenes[1].pedidos[24].ref_paciente = 2;
    almacenes[1].pedidos[24].numEnvios = 5;
    almacenes[1].pedidos[24].numFarmacos = 1;
    strcpy(almacenes[1].pedidos[24].farmacos[0].nombreFarmaco, "Isoprotenerol");
    almacenes[1].pedidos[24].farmacos[0].pesoFarmaco = 600;
    almacenes[1].pedidos[24].farmacos[0].unidadesFarmaco = 5;

    almacenes[1].pedidos[25].fechaPedido.dia = 24;
    almacenes[1].pedidos[25].fechaPedido.mes = 11;
    almacenes[1].pedidos[25].fechaPedido.anio = 2012;
    almacenes[1].pedidos[25].ref_paciente = 2;
    almacenes[1].pedidos[25].numEnvios = 5;
    almacenes[1].pedidos[25].numFarmacos = 1;
    strcpy(almacenes[1].pedidos[25].farmacos[0].nombreFarmaco, "Hidrocortisona");
    almacenes[1].pedidos[25].farmacos[0].pesoFarmaco = 650;
    almacenes[1].pedidos[25].farmacos[0].unidadesFarmaco = 1;

    almacenes[1].pedidos[26].fechaPedido.dia = 26;
    almacenes[1].pedidos[26].fechaPedido.mes = 11;
    almacenes[1].pedidos[26].fechaPedido.anio = 2012;
    almacenes[1].pedidos[26].ref_paciente = 2;
    almacenes[1].pedidos[26].numEnvios = 6;
    almacenes[1].pedidos[26].numFarmacos = 1;
    strcpy(almacenes[1].pedidos[26].farmacos[0].nombreFarmaco, "Ketorolaco");
    almacenes[1].pedidos[26].farmacos[0].pesoFarmaco = 300;
    almacenes[1].pedidos[26].farmacos[0].unidadesFarmaco = 2;

    almacenes[1].pedidos[27].fechaPedido.dia = 27;
    almacenes[1].pedidos[27].fechaPedido.mes = 11;
    almacenes[1].pedidos[27].fechaPedido.anio = 2012;
    almacenes[1].pedidos[27].ref_paciente = 2;
    almacenes[1].pedidos[27].numEnvios = 2;
    almacenes[1].pedidos[27].numFarmacos = 1;
    strcpy(almacenes[1].pedidos[27].farmacos[0].nombreFarmaco, "Nimodipino");
    almacenes[1].pedidos[27].farmacos[0].pesoFarmaco = 200;
    almacenes[1].pedidos[27].farmacos[0].unidadesFarmaco = 3;

    almacenes[1].pedidos[28].fechaPedido.dia = 28;
    almacenes[1].pedidos[28].fechaPedido.mes = 11;
    almacenes[1].pedidos[28].fechaPedido.anio = 2012;
    almacenes[1].pedidos[28].ref_paciente = 2;
    almacenes[1].pedidos[28].numEnvios = 4;
    almacenes[1].pedidos[28].numFarmacos = 1;
    strcpy(almacenes[1].pedidos[28].farmacos[0].nombreFarmaco, "Omeprazol");
    almacenes[1].pedidos[28].farmacos[0].pesoFarmaco = 150;
    almacenes[1].pedidos[28].farmacos[0].unidadesFarmaco = 6;

    almacenes[1].pedidos[29].fechaPedido.dia = 30;
    almacenes[1].pedidos[29].fechaPedido.mes = 11;
    almacenes[1].pedidos[29].fechaPedido.anio = 2012;
    almacenes[1].pedidos[29].ref_paciente = 2;
    almacenes[1].pedidos[29].numEnvios = 12;
    almacenes[1].pedidos[29].numFarmacos = 1;
    strcpy(almacenes[1].pedidos[29].farmacos[0].nombreFarmaco, "Haloperidol");
    almacenes[1].pedidos[29].farmacos[0].pesoFarmaco = 250;
    almacenes[1].pedidos[29].farmacos[0].unidadesFarmaco =1;


    listarDatos();
}




void tgestor_FarmaDron::listarDatos(){
    for(int i = 0; i< contadorAlmacenes; i++){
      printf("Almacen %d - %s - %s - %s\n\tDescripcion: %s\n\n",almacenes[i].codigoAlmacen,almacenes[i].calle,almacenes[i].municipio,almacenes[i].provincia,almacenes[i].descripcionAlmacen);
      if(almacenes[i].contadorPacientes > 0){
         almacenes[i].listarPacientes();
         if(almacenes[i].contadorPedidos > 1){
            almacenes[i].listarTodosLosPedidos();
           }
      }
    }
}


void tgestor_FarmaDron::nuevoAlmacen(){
    int numeroSeleccionado;
    StringLargo calle_nueva;
    StringLargo municipio_nuevo;
    StringMedio provincia_nueva;
    StringLargo descrip_nueva;
    if(contadorAlmacenes > 10){ //Si el numero de almacenes es superior a 10 entonces
      printf("Identificador de almacen (cod. de almacen 1 a 10)? ");  //SOLO SE PIDE EL CODIGO EN CASO DE QUE EL NUMERO DE ALMACENES SEA MAYOR QUE 10
      scanf("d",&numeroSeleccionado);
      fflush(stdin);
      numeroSeleccionado--; //Se normaliza para la posicion de un vector
      fflush(stdin);
      if(numeroSeleccionado > 9 || numeroSeleccionado < 0) { //Si el numero seleccionado es mayor que diez o menor que 1 se vuelve a pedir numero
        printf("Error: ha introducido como numero de almacen un numero incorrecto, introduzca un numero entre el 1 y el 10\n\n");
        nuevoAlmacen();
      }else{
          almacenes[numeroSeleccionado].iniciarFarmaDron(); //pone a cero los contadores de pacientes, pedidos, farmacos por pedido...etc.
      }
    }else{ //Si no se ha excedido el numero de almacenes, el numero seleccionado para guardar el almacen es el propio contador Almacenes
        numeroSeleccionado = contadorAlmacenes;
    }
    printf("Direcci%cn almacen? (entre 1 y 48 caracteres) ",char(162));
    scanf("%[^\n]",&calle_nueva);

    fflush(stdin);
    printf("Municipio almacen? (entre 1 y 48 caracteres)  ");
    scanf("%[^\n]",&municipio_nuevo);
    fflush(stdin);
    printf("Provincia almacen? (entre 1 y 16 caracteres)  ");
    scanf("%[^\n]",&provincia_nueva);
    fflush(stdin);
    printf("Descripcion almacen? (entre 1 y 48 caracteres) ");
    scanf("%[^\n]",&descrip_nueva);
    fflush(stdin);
    printf("Datos correctos (S/N)? ");
    if(Si_o_No()== 1){
      almacenes[numeroSeleccionado].iniciarFarmaDron(); //Se ponen los contadores a cero
      almacenes[numeroSeleccionado].codigoAlmacen = numeroSeleccionado+1;
      strcpy(almacenes[numeroSeleccionado].calle,calle_nueva);
      strcpy(almacenes[numeroSeleccionado].municipio,municipio_nuevo);
      strcpy(almacenes[numeroSeleccionado].provincia,provincia_nueva);
      strcpy(almacenes[numeroSeleccionado].descripcionAlmacen,descrip_nueva);
      printf("Almacen creado con exito\n\n");
      contadorAlmacenes++;
    }else{  //EN caso de que la respuesta sea que NO, no se borran los datos guardados en el almacen, pero el contador de almacenes no es actualizado, por lo que a la proxima insercion se
      printf("No se guarda el almacen. Se procede a recoger datos de nuevo\n\n");
      nuevoAlmacen();
    }
}

void tgestor_FarmaDron::nuevoPaciente(){
    int codigo_alma;
    printf("Alta nuevo paciente: \n\n");
    printf("Codigo almacen (entre 1-10)? " );
    scanf("%d",&codigo_alma);
    if(codigo_alma <= contadorAlmacenes){
      almacenes[codigo_alma-1].recogerPacientes();
    }else{
      printf("ERROR: se ha referenciado a un almacen que no se ha creado previamente. Se repite pregunta\n\n");
      nuevoPaciente();
    }
}

void tgestor_FarmaDron::ubicarPaciente(){
  int codigo;
  printf("Lista de pacientes y su ubicaci%cn\n\n",char(162));
  printf("\tC%cdigo de almacen? ", char(162));
  scanf("%d",&codigo);
  fflush(stdin);
  if(codigo > contadorAlmacenes){
    printf("El numero de almacen introducido excede el numero de almacenes creados, seleccione un numero entre 1 y %d\n\n",contadorAlmacenes);
    ubicarPaciente();
  }else{
    almacenes[codigo-1].listarPacientes();
  }
}

void tgestor_FarmaDron::nuevoPedidoAlmacen(){
  int codigo;
  printf("Nuevo pedido almacen\n\n");
  printf("\tCodigo almacen? ");
  scanf("%d",&codigo);
  fflush(stdin);
   if(codigo > contadorAlmacenes){
    printf("El numero de almacen introducido excede el numero de almacenes creados, seleccione un numero entre 1 y %d\n\n",contadorAlmacenes);
    nuevoPedidoAlmacen();
  }else{
    almacenes[codigo-1].nuevosPedidos();
  }
}

void tgestor_FarmaDron::listaDirariaDePedidos(){
  int codigo;
  printf("Lista diaria de pedidos:\n\n");
  printf("Codigo Almacen? ");
  scanf("%d", &codigo);
  fflush(stdin);
  if(codigo > contadorAlmacenes){
    printf("El numero de almacen introducido excede el numero de almacenes creados, seleccione un numero entre 1 y %d\n\n",contadorAlmacenes);
    listaDirariaDePedidos();
  }else{
    printf("Pedido ALMACEN - %s\n\n",almacenes[codigo-1].descripcionAlmacen);
    almacenes[codigo-1].listarPedido();
  }
}

void tgestor_FarmaDron::gestionarRuta(vectorPedidos pedidosRuta, int numPedidos, int numAlmacen){
  int pesoActual, ref_pac, pesoTot, distanciaTot;
  bool rutaFactible = false;
  for(int i = 0; i < numPedidos; i++){
      rutaFactible = false;
      printf("\tRuta %d\n",i);
      ref_pac = pedidosRuta[i].ref_paciente;
      distanciaTot =almacenes[numAlmacen].pacientes[ref_pac-1].distancia;
      pesoTot = pedidosRuta[i].calculaPeso();
      if(distanciaTot <= 12500 && pesoTot == 0){
        rutaFactible = true;
      }else if(distanciaTot <= 10000 && pesoTot <= 3000){
        rutaFactible = true;
      }else{
        rutaFactible = false;
      }
      if(rutaFactible){
          printf("Origen a Cliente %2d  -- Distancia recorrida: %d -- Angulo: %d -- Peso: %4d gramos\n ", ref_pac, distanciaTot, almacenes[numAlmacen].pacientes[ref_pac-1].angulo,pesoTot);
      }else{
          printf("El pedido destino Cliente %2d -- con distancia: %d -- Angulo: %d no ha podido ser realizado\n", ref_pac, distanciaTot, almacenes[numAlmacen].pacientes[ref_pac-1].angulo);
      }
  }
  printf("\n\n");
}

int tipoPedido::calculaPeso(){
  int pesoTotal = 0;
  for(int i = 0; i < numFarmacos; i++){
    pesoTotal = (pesoTotal + (farmacos[i].pesoFarmaco*farmacos[i].unidadesFarmaco));
  }
  return pesoTotal;
}
void tgestor_FarmaDron::programaRutasDron(){
  int codigo;
  int ref_cliente_actual;
  vectorPedidos pedidos_coincidentes;
  int numPedidosCoincidentes;
  tipoFecha fechaBuscada;
  printf("Lista diaria de pedidos:\n\n");
  printf("Codigo Almacen? ");
  scanf("%d", &codigo);
  fflush(stdin);
  if(codigo > contadorAlmacenes){
    printf("El numero de almacen introducido excede el numero de almacenes creados, seleccione un numero entre 1 y %d\n\n",contadorAlmacenes);
    programaRutasDron();
  }else{
    codigo = codigo -1;
    fechaBuscada.recogerFecha();
    printf("\n\n");
    numPedidosCoincidentes = 0;
    /*FASE 1 GUARDAR EN UN VECTOR TODOS LOS PEDIDOS QUE COINCIDAN CON FECHA INTRODUCIDA, MAXIMO SERAN 100 PEDIDOS*/
    for (int i = 0; i < almacenes[codigo].contadorPedidos; i++){
      if(fechasIguales(fechaBuscada,almacenes[codigo].pedidos[i].fechaPedido)){
        pedidos_coincidentes[numPedidosCoincidentes] = almacenes[codigo].pedidos[i]; //Se presupone que se puede hacer la operacion de igualdad en estructuras similares
        numPedidosCoincidentes++;
      }
    }
    //En este punto tenemos una estructura con todas los pedidos coincidentes con el mismo dia, mes y anno
    gestionarRuta(pedidos_coincidentes, numPedidosCoincidentes,codigo);
  }
}

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
  printf("Datos paciente: \n");
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
  if(contadorPacientes > 0){
    printf("\tRef.  Identificador        Distancia      Angulo\n\n");
    for(int i= 0; i < contadorPacientes; i++){
      printf("\t%-6d%-21s%-5d          %-4d\n",pacientes[i].ref, pacientes[i].id,pacientes[i].distancia,pacientes[i].angulo);
    }
    printf("\n\n");
  }else{
    printf("\tEste almacen no dispone de clientes\n\n");
  }

}

void tipoFarmaDron::nuevosPedidos(){
    int refePa; //referencia del paciente
    int respuesta = 1;
    if(contadorPacientes == 0){
        printf("INFO: No existen pacientes en este almacen, por favor, primero introduzca pacientes");
    }else{
        do{
          printf("\tRef. Paciente (entre 1 y 20): ");
          scanf("%d",&refePa);
          fflush(stdin);
          if(refePa > contadorPacientes){
              printf("ERROR: se esta haciendo referencia a un paciente que no existe, indique un numero correcto entre 1 y %d\n\n",contadorPacientes );
          }else{
              refePa = refePa -1; //Si el usuario indica la referencia 1, se refiere realmente a la posicion cero del arreglo pacientes, siempre hay que decrementar una unidad
              pedidos[contadorPedidos].ref_paciente = refePa+1;
              pedidos[contadorPedidos].fechaPedido.recogerFecha();
              do{
                  nuevoFarmaco(pedidos[contadorPedidos].numFarmacos);
                  pedidos[contadorPedidos].numFarmacos++;
                  printf("otro farmaco (S/N)?");
              }while((Si_o_No() == 1) && (pedidos[contadorPedidos].numFarmacos < MAX_FARMACOS) ); //Mientras el usuario diga que quiere mas farmacos y no exceda limite de farmacos por pedido

              contadorPedidos++;
              if(pedidos[contadorPedidos].numFarmacos == MAX_FARMACOS){
                  printf("INFO: No se pueden insertar mas farmacos, capacidad maxima de %d\n", MAX_FARMACOS);
              }else{
                  printf("otro pedido (S/N)? ");
                  respuesta = Si_o_No();
              }
          }
        }while((respuesta == 1)  && (pedidos[contadorPedidos].numFarmacos < MAX_PEDIDOS));  //Mientra el usuario diga que si quiere mas pedido y no se exceda el limite maximo de pedido

        if(contadorPedidos == MAX_PEDIDOS){
          printf("INFO: No se pueden insertar mas pedidos, capacidad maxima de %d\n", MAX_PEDIDOS);
        }
    }

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


void tipoFarmaDron::listarTodosLosPedidos(){
    printf("    Pedidos\n\n");
    printf("    Cliente   Fecha         F%crmaco             Peso    Unidades \n\n", char(160));
    for(int i = 0; i < contadorPedidos; i++){
       for(int k = 0; k< pedidos[i].numFarmacos; k++){
         printf("    %-10d%2d/%2d/%4d    ",pedidos[i].ref_paciente,pedidos[i].fechaPedido.dia,pedidos[i].fechaPedido.mes,pedidos[i].fechaPedido.anio);
         printf("%-20s%-12d%d\n", pedidos[i].farmacos[k].nombreFarmaco,pedidos[i].farmacos[k].pesoFarmaco,pedidos[i].farmacos[k].unidadesFarmaco);
       }
    }
    printf("\n\n");

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






