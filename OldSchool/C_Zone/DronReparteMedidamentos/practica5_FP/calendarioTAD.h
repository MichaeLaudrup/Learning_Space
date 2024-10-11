#pragma once
#include <stdio.h>
#include <stdlib.h>

typedef struct tipoFecha{
  int dia, mes, anio;
  void recogerFecha();
  };

int CalcularDiaMes( int Anno, int lMes); /*Este metodo calcula el limite maximo de dias de un determinado mes dado un mes y un anno*/
bool fechasIguales(tipoFecha fechaA, tipoFecha fechaB);
bool fechaCorrecta(int dia, int mes, int anio);

typedef struct tipoHojaCalendario{
  int mes;
  int anio;
  bool diasAImprimir[31];
  void marcarDiaAImprimir(int dia);
  void calendario();
  void inicializar(int mes, int anio);
};
