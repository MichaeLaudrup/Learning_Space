--Una libra son 16 onzas
--Un stone son 14 libras
--Un quarte son 2 stones
WITH Text_IO;




PROCEDURE Descomposicion_MonedasUK IS
   PACKAGE Integer_IO IS NEW Text_IO.Integer_IO (Integer);
   Cantidad_Inicial:Integer;
   qr,st,lib,oz:integer;

   PROCEDURE SubprogramaDescomposicion(cantidadEnOnzas: in integer; quarte: out integer; stones: out integer; lib: out integer; onzas: out integer) IS
   BEGIN
      Lib := CantidadEnOnzas / 16;
      Onzas := CantidadEnOnzas mod 16;
      Stones:= Lib / 14;
      Lib := Lib mod 14;
      quarte := Stones / 2;
      Stones := Stones mod 2;
   END SubprogramaDescomposicion;

BEGIN
   Text_IO.put("Introduzca numero de onzas: ");
   Integer_IO.get(cantidad_inicial);

   SubprogramaDescomposicion(cantidad_inicial, Qr,St,Lib,Oz);


   Text_IO.Put("el numero de cuartos es: ");
   Integer_IO.Put(Qr);
   Text_IO.New_line;
   Text_IO.Put("el numero de stones es: ");
   Integer_IO.Put(St);
   Text_IO.New_line;
   Text_IO.Put("el numero de libras es: ");
   Integer_IO.Put(Lib);
   Text_IO.New_line;
   Text_IO.Put("el numero de onzas es: ");
   Integer_IO.Put(Oz);
   Text_IO.New_line;

END Descomposicion_MonedasUK;
