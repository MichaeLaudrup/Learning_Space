#pragma once
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "calendarioTAD.h"

const int PESO_MAXIMO = 3; // Peso en kg maximo que puede transportar un dron
const int AUTONOMIA_CON_PESO = 20; //autonomia del dron con peso en km
const int AUTONOMIA_VACIA = 25; //autonomia del dron sin peso en km
const float COMPLEMENTO_ANGULO = 1000/3.14159;
const int MAX_PACIENTES = 20;
const int MAX_PEDIDOS = 100;
const int MAX_LONGITUD_ID = 20+1; //20 caracteres alfanumericos mas un caracter para fin de cadena '\0'
const int MAX_FARMACOS = 5;



typedef char String[20]; //Se declara una cadena de texto de longitud maxima 20

typedef struct tipoPaciente{
    int ref;
    String id;
    int distancia;
    int angulo;
};
typedef struct tipoFarmaco{
  String nombreFarmaco;
  int pesoFarmaco; //en gramos
  int unidadesFarmaco;
};

typedef tipoFarmaco tVectorFarmacos[5];
typedef struct tipoPedido{
   int ref_paciente;
   int numEnvios;
   int numFarmacos;
   tipoFecha fechaPedido;
   tVectorFarmacos farmacos;
};

typedef tipoPedido vectorPedidos[MAX_PEDIDOS];

typedef struct tipoFarmaDron{
     tipoPaciente pacientes[MAX_PACIENTES];
     vectorPedidos pedidos;

     void iniciarFarmaDron();
     int recogerPacientes();  //recoge una cantidad indeterminada de pacientes
     void listarPacientes();  //lista todo los pacientes del hospital
     void nuevosPedidos(); //Inserta un grupo de pedidos
     void listarPedido(); //para una fecha determinada lista los pedidos
     void calendarioMensualPedidos(); //Imprime una hoja calendario teniendo en cuenta los pedidos
   private:
     int contadorPedidos;
     int contadorPacientes;
     int nuevoPaciente(); //inserta un nuevo paciente en farma drom teniendo en cuenta que no exceda del limite maximo
     void nuevoFarmaco(int indiceVectorFarmacos); //inserta un unico pedido comprobando que no exceda el numero maximo de pedidos
};


int Si_o_No();


