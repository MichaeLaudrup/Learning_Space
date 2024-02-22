--Ejercicio 1:
WITH Text_IO; -- AQUI ESTAMOS IMPORTANDO UNA LIBRERIA DENOMINADA text_IO que nos permite recoger datos de usuario, imprimir datos o guardar datos en el disco;
PROCEDURE AreaElipse IS
   Pi: CONSTANT Float := 3.14;

   PACKAGE Float_IO IS NEW Text_IO.Float_IO (Float);

   FUNCTION Area (A: IN Float; B: IN Float ) RETURN Float IS
   BEGIN
      return (pi * A * B);
   END Area;
   Resultado:Float;
   BEGIN
      resultado := Area(4.0,5.6);
      Float_IO.put(resultado);
END areaElipse;

