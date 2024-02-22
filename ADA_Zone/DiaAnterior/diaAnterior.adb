WITH Ada.Text_IO; USE Ada.Text_IO;

PROCEDURE diaAnterior IS
   FechaIntroducida: String(1..10);
   Dia, Mes, Annio: Integer;
    BEGIN
   Put("Introduzca fecha en formato DD/MM/AAAA: ");
   Get(FechaIntroducida);
   Put("Fecha introducida: ");
   Put(FechaIntroducida);
   new_line;
   Dia := Integer'Value(FechaIntroducida(1..2));
   Mes := Integer'Value(FechaIntroducida(4..5));
   Annio := Integer'Value(FechaIntroducida(7..10));

   IF(Dia = 1) THEN  --Hay que hacer calculos especiales para calcular el dia del mes anterior
      IF(Mes = 1) THEN --Si es el 1 de enero de un annio determinado se retrocede al mes 12 y al annio anterior
         Mes := 12;
         annio := annio -1;
      ELSE
         mes := mes -1 ;
      END IF;
      CASE Mes IS
         WHEN 1 | 3 | 5 | 7 | 8 | 10 | 12 =>
            dia:=  31;
         WHEN 2 =>
            IF(((Annio mod 4 = 0) AND (Annio mod 100 /= 0)) OR (Annio mod 400 = 0) )THEN
              dia := 29;
            ELSE
               dia := 28;
            END IF;
         WHEN OTHERS =>
            dia := 30;
      END CASE;
   ELSE
      Dia := Dia - 1;
   END IF;
   Put("Dia anterior: ");
   put(Integer'image(dia)&"/"&Integer'image(mes)&"/"&Integer'image(annio));
END DiaAnterior;



