//ESTE TUTORIAL ES DESDE MONGOSH

/*
    Cosas a tener en cuenta: 
        Cuando vemos entre corchetes algo, se refiere a un literal, [nombre_variable] => nombreVariable, sin comillas ni nada raro, y suele ser: 
        
        - Un nombre nuestro personalizado nuevo: por ejemplo, db.[nombre_nueva_coleccion].insertOne({[nombre_campo]: [valor_campo]}), en este caso, realmente, se pondría
            db.products.insertOne({ price: 15.67}), donde [nombre_nueva_coleccion], [nombre_campo] y [valor_campo] han sido sustituidos por nombres personalizados por nosotros
*/

/**********************************
/   CONFIGURACIONES O COMANDOS GLOBALES FUERA DE MONGO SHELL
/*********************************

// Importar un json en nuestra base de datos
// si son multiples documentos podemos especificar la opcion --jsonArray
// si queremos eliminar la coleccion existente antes de la importacion especificamos la opción --drop
mongoimport $PATH_TO_JSON/[json_name].json -d [nombre_basedatos] -c [nombre_coleccion] --drop --jsonArray


/**********************************
/   CONFIGURACIONES O COMANDOS GLOBALES DENTRO DE MONGO SH
/*********************************
// Mostras las bases de datos actuales
show dbs

// Conmutar a otra base de datos y usarla (en caso de no existir la crea)
use [nombre_db]

// Eliminar una base de datos, primero debemos hacer un use [nombre_base_datos] y despues
db.dropDatabase()

// Crear una colección con una esquema definido de manera explicita
db.createCollection("[coleccion_name]", {
    validator: {
        $jsonschema: { 
            bsonType: "object",
            required: [ "field_name_required_1", "field_name_required_2", ..., "field_name_required_n"],
            properties: {
                filed_name_1: {
                    bsonType: "string", //objectId, array
                    description: "Must be a estring and is required"
                },
                nested_document_name_1 : {
                    bsonType: "object",
                    required:  [ "field_name_required_1", "field_name_required_2", ..., "field_name_required_n"],
                    properties: {
                        ...
                    }
                },
                array_name_1 : {
                    bsonType: "array",
                    items: {
                        bsonType: intNumber,
                    }
                }

            }
        }
    }
})

// Obtener los nombres de las colecciones de la base datos actual
db.getCollectionNames(); 

// Eliminar una colección tenemos: 
db.[nombre_coleccion].drop(); 

// Dentro de esa base de datos podemos crear una coleccion inmediatamente de la siguiente forma
db.[nombre_nueva_coleccion].insertOne({ [nombre_campo]: [valor_campo], [nombre_campo2];[valor_campo2]}) 

// Devolvera todos los registro de la coleccion "nombre coleccion"
db.[nombre_coleccion].find()

// Muestra estadísticas de la base de datos 
db.stats() 
//Adicionalmente podemos añadir el comnado pretty() para embellecer cualquier resultado de documentos. 

/************************************
     OPERADORES
/***********************************
    $set : { [nombre_campo]: [nuevo_valor], [nombre_campo2]: [nuevo_valor2], ..., [nombre_campoN]: [nuevo_valorN]} Se hace para setear campos existentes o crear nuevos
    $unset: { [nomnre_campo]: [valor_random]} --> se hace para eliminar un campo
    $gt : 1 -> (greater than) Se suele utilizar para filtros, filtra valores numéricos mayores que la cantidad especificada

db.userData.aggregate([
    {   
        $lookup: {
            from: 'clients',    // de que coleccion queremos obtener el documento 
                               //completo para rellenarlo en nuestra referencia
            localField: 'clientAsociated', // variable en nuestra coleccion actual que tiene el 
                                          // identificador al documento que queremos
            foreignField: "_id", // dentro de ese documento de la coleccion de la que queremos obtener
                                // el documento que campo debemos leer para compararlo con localField
            as: "creators" // podemos ponerle un nombre adicional
        }
    }
])

/************************************
     BASIC CRUD OPERATIONS
/***********************************

// ---CREATE
    db.[nombre_coleccion].insertOne(data, options)  --> inserta un documento en una coleccion, si la coleccion no existe se crea
    db.[nombre_coleccion].insertMany(data, options) --> por defecto se van insertando en orden, si falla uno en la posición i-esima entonces fallan todos los siguientes
                                                        aunque poniendo un options: { ordered: false}, aunque falle continuará insertando documentos
--EJEMPLOS
    db.coches.insertMany([{ marca: 'seat', caballos: 125}, { marca: 'toyota', caballos: 400, combustible: 'gasolina'}])

// ---READ
  db.[nombre_coleccion].find(filter, options) --> encuentra todas los documentos asociados al filter, OJO, devuelve un cursos
  db.[nombre_coleccion].findOne(filter, options) --> Devuelve la primera ocurrencia de la búsqueda, OJO, no devuelve un cursor

  -Proyecciones (Solo obtener un subconjunto de informacion del documento, normalmente su _id y los campos que tengan valor a 1)

  db.[nombre_coleccion].find(filter, {[nombre_campo_a_mostrar1]: 1, [nombre_campo_a_mostrar2]: 1  }) // Por defecto todos los campos estarán a valor cero, es decir, 
                                                                                                      que no se muestren, excepto los especificados
  --READ-OPERATORS-

  { 
    name: "Mike",
    hobbies: [
      { title: "Gym", frequency: 3},
      { title: "Meditation", frequency: 10},
    ]
  }
    // La siguiente consulta nos devolvera el registro anterior a pesar de que no existe ningun elemento del array "hobbies" que tenga de titulo
    // "gym" y que ademas tenga "frecuencia mayor que 5", sin embargo, esta query se entiende como: 
    // Existe algun documento que tenga en el array de hobbies  un elemento con el titulo GYM y otro elemento con frecuencia mayor a 5(no tiene que ser el mismo)
    db.users.find({$and: [{"hobbies.title" : "Gym"}, {'hobbies.frecuency': { $gte : 5 }}]}) 

    // Si queremos hacer una consulta que tenga en cuenta que la condición se cumpla en un unico elemento se usa el operador $elemMatch 
     db.users.find({hobbies: { $elemMatch: { title: "Gym", frecuency: { $gte: 3}}}}) 
     
--EJEMPLOS
    db.animales.find() --> Devuelve todos los registros de animales en la base de datos
    db.animals.findOne({ numPatas: 3}) --> De todos los animales con 3 patas devolvera el primero
    db.animals.find({ tipo: 'Mamifero'}, { numPatas: 1}) -> Busca todos los animales de tipo mamifero y solo devuelve un cursor
                                                            cuyos documentos tienen un _id y el numPatas, si hay otros campos no los mostrara

                            


// ---UPDATE
    db.[nombre_coleccion].updateOne(filter, data, options) // Actualizar primera ocurrencia de filter y solo devuelve el _id y datos estadisticos
    db.[nombre_coleccion].updateMany(filter, data, options) // Actualizar muchos
    db.[nombre_coleccion].replaceOne(filter, data, options) // Reemplazar completamente uno existente
    db.[nombre_coleccion]

--EJEMPLOS
    db.animals.updateOne({tipo: "Mamífero"}, { $set: {consumeLeche: true }}) // Para insertar nuevos campos o editar existentes por la fuerza debe usarsee $set
    db.coches.updateMany({ combustible: 'diesel'   }, { $set: { cocheContaminante: true }}) // Busca todos los coches con combustible 
                                                                                                igual a dieses y les añade o edita la propiedad "contaminante " a true


// ---DELETE
    db.[nombre_coleccion].deteleOne(filter, options) // Eliminar una ocurrencia

--EJEMPLOS: 
    db.animals.delete({ numPatas: 3}) // Elimina los animales que tenga 3 patas.
    db.animals.deleteMany() // Elimina todas los registros de animales en la base de datos

db.[nombre_coleccion].deleteMany(filter, options) //Eliminnar varios registros coincidentes con filter

/************************************
     DATA TYPES
/***********************************

db.numbers.insertOne({
    natural: 55
});

db.numbers.insertOne({
    natural: NumberInt(55)
});

/************************************
     DATA SCHEMA Y RELATIONS
/***********************************

// --EMBEBED

db.person.insertOne({
    name: "Michael",
    apellido: "Rodriguez Mesa",
    edad: 21,
    direccionPostal : {
        calle: "De las flores",
        numero: 12, 
        puerta: 12,
        codigoPostal: "45392",
        ciudad: "Varsovia"
    }
}); 

db.person.insertOne({
    name: "Mike"
})

/************************************
     WORKING WITH THE SHELL
/***********************************

/************************************
     USING COMPASS
/***********************************

/************************************
     DEEPER ON CREATE OPERATIONS
/***********************************

/************************************
     DEEPER ON READ OPERATIONS
/***********************************

/************************************
     DEEPER ON UPDATE OPERATIONS
/***********************************

/************************************
     DEEPER ON DELETE OPERATIONS
/***********************************

/************************************
    USING INDEXES
/***********************************

/************************************
    GEOSPACIAL DATA
/***********************************

/************************************
   THE AGGREGATION FRAMEWORK
/***********************************

/************************************
    WORKING WITH NUMERIC DATAS
/***********************************

/************************************
    SECURITY AND AUTHENTICATION
/***********************************

/************************************
   PERFORMANCE, FAULT TOLERANCE &
   DEPLOYTMENT
/***********************************

/************************************
   TRANSACTIONS
/***********************************

/************************************
   FROM SHELL TO DRIVERS
/***********************************

/************************************
   MONGODB STICH
/***********************************