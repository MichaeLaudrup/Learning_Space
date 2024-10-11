#include "calendarioTAD.h"

void tipoFecha::recogerFecha(){
    int aux_dia;
    int aux_mes;
    int aux_anio;
    printf("\td%ca del env%co?: ",char(161),char(161));
    scanf("%d",&aux_dia);
    printf("\tmes del env%co?: ",char(161));
    scanf("%d", &aux_mes);
    printf("\ta%co del envio?:",char(164));
    scanf("%d", &aux_anio);
    /*Se hacen comprobaciones de que es una fecha legitima*/
    if(fechaCorrecta(aux_dia, aux_mes, aux_anio)){
        dia = aux_dia;
        mes = aux_mes;
        anio = aux_anio;
    }else{
        printf("ha insertado una fecha no correcta, repita, por favor.\n");
        recogerFecha();
    }
}


bool fechaCorrecta(int dia, int mes, int anio){
  if((dia > 0 && dia <= CalcularDiaMes(mes,anio)) && (mes >= 1 && mes <= 12)&&(anio > 0)){
    return true;
  }else{
    return false;
  }
}


bool fechasIguales(tipoFecha fechaA, tipoFecha fechaB){
  return ((fechaA.dia == fechaB.dia) && (fechaA.mes == fechaB.mes) && (fechaA.anio == fechaB.anio));
}



void tipoHojaCalendario::marcarDiaAImprimir(int dia){
  diasAImprimir[dia-1] = true;
}

int CalcularDiaMes( int Anno, int lMes){

  if (lMes == 1 || lMes == 3 || lMes == 5|| lMes == 7|| lMes == 8|| lMes == 10|| lMes == 12){
    return 31;
    }
    if ( lMes == 2){
     if ( Anno % 4 == 0 && Anno % 100 != 0 || Anno % 400 == 0){
       return 29 ;
       }
       return 28 ;
    }
     return 30;
}

 int Zeller(int Anno, int Mes){
   int a = (14 - Mes) / 12 ;
   int y = Anno - a ;
   int m = Mes + 12 * a - 2 ;
   int Dia = 1 ;
   int DiaZel = Dia;
   DiaZel = (Dia + y + y / 4 - y / 100 + y / 400 + ( 31 * m ) / 12) % 7 ;
   return DiaZel;
   }
void tipoHojaCalendario::inicializar(int m, int a){
  mes = m;
  anio = a;
  for(int i = 0; i <31; i++){
    diasAImprimir[i] = false;
  }
}

void tipoHojaCalendario::calendario() {
  int ZelDias = Zeller( anio, mes);
  int DiasporMes = CalcularDiaMes(anio, mes);
  int Resto ;

switch(mes) {
  case 1:  printf( "%23s%4d\n" , "ENERO                  ", anio );
  break ;
  case 2:  printf( "%23s%4d\n" , "FEBRERO                ", anio );
  break ;
  case 3:  printf( "%23s%4d\n" , "MARZO                  ", anio );
  break ;
  case 4:  printf( "%23s%4d\n" , "ABRIL                  ", anio );
  break ;
  case 5:  printf( "%23s%4d\n" , "MAYO                   ", anio );
  break ;
  case 6:  printf( "%23s%4d\n" , "JUNIO                  ", anio );
  break ;
  case 7:  printf( "%23s%4d\n" , "JULIO                  ", anio );
  break ;
  case 8:  printf( "%23s%4d\n" , "AGOSTO                 ", anio );
  break ;
  case 9:  printf( "%23s%4d\n" , "SEPTIEMBRE             ", anio );
  break ;
  case 10:  printf( "%23s%4d\n" , "OCTUBRE                ", anio );
  break ;
  case 11:  printf( "%23s%4d\n" , "NOVIEMBRE              ", anio );
  break ;
  case 12:  printf( "%23s%4d\n" , "DICIEMBRE              ", anio );
  break ;
 default:  printf( "%23s%4d\n" , "ERROR DE MES           ", anio );
  }

  printf( "=========================== \n");
  printf( "LU  MA  MI  JU  VI | SA  DO \n");
  printf( "=========================== \n");

if ( ZelDias == 0){
      ZelDias = 6 ;
}else{
  ZelDias = ZelDias - 1;
  }
  /*Impresion de primera linea del calendario*/
  for ( int Indice = 1 ; Indice <= ZelDias ; Indice++){
    if (Indice == 5 ){
        printf( "%4s", " . | " );
     }else{
       printf( "%4s", ".  " );
     }
  }
  /*Impresion de dias del calendario*/
   for ( int Dia = 1 ; Dia <= DiasporMes ; Dia++){
    /*  printf( "%2d%1s" , Dia, "  " );*/

   if( (ZelDias + Dia - 5  ) % 7 == 0 ){
      if(diasAImprimir[Dia-1] == false){
           printf( " . | " );
        }else{
           printf( "%2d%s" , Dia, " | " );
        }
   }else{
      if(diasAImprimir[Dia-1] == false){
          printf(" .  ");
        }else{
          printf( "%2d%s" , Dia, "  " );
        }
   }
   if ( (ZelDias  + Dia ) % 7 == 0){
      printf( "\n");
   }
  }
/*Imprimir ultima linea del calendario*/
if ((ZelDias + DiasporMes) == 28){
  Resto = 28 -(ZelDias + DiasporMes);
  }else if ((ZelDias + DiasporMes) > 35){
    Resto = 42 -(ZelDias + DiasporMes);
    }else{
      Resto = 35 -(ZelDias + DiasporMes);
      }

for ( int Indice = 1 ; Indice <= Resto ; Indice++){
  if( Indice == Resto-2 ) {
      printf( "%4s" , " . | " );
     }else {
      printf( "%4s", " .  " );
       }
    }
     printf( "\n");
}

