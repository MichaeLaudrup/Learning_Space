package es.michael.spring.cap03.lab01;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController

public class RESTFulServer {

	
	private static final String __ControllerRelativePath = "students";
	
	@Autowired
	StudentRepository jpaRepo; 
	
	/*
	 * Metodo que se ejecuta al mapear el directorio raiz, muestra 
	 * datos basicos de la aplicacion, como que funcion
	 * y la fecha y hora completa
	 * @Return String - texto que el navegador debe renderizar
	 */
	@RequestMapping(value="/")
	public String sayHelloWorld() {
		return "[" + LocalDateTime.now() + "]" 
				+ HTMLEntities.__NonBreakingSpace
				+ HTMLEntities.__NonBreakingSpace
				+ HTMLEntities.__NonBreakingSpace
				+ " RESTFul Server. The application is currently running...";
	}
	
	
	/*
	 * Este metodo devuelve un listado de estudiantes completo 
	 * @return ResponseEntity<Object> - Http request con el listado de los estudiantes
	 */
	@RequestMapping(value="/" + __ControllerRelativePath ) 
	@CrossOrigin(origins= {"http://localhost:9090","http://localhost:4200"}) 
    public ResponseEntity<Object> get() { 
        return new ResponseEntity<Object>(jpaRepo.findAll(), HttpStatus.OK); 
    }
	
	/*
	 * Este metodo devuelve dado un mapeo de tipo "localhost:8080/:id" un estudiante
	 * con el identificador coincidente con el id especificado en la ruta
	 * @param int - identificador especificado en la ruta
	 * @return - @return ResponseEntity<Object> - [ estudiante buscando con el id | error de que el estudiante no se ha encontrado] 
	 */
	@RequestMapping(value="/" + __ControllerRelativePath +"/{id}") 
	@CrossOrigin(origins= {"http://localhost:9090","http://localhost:4200"})
    public ResponseEntity<Object> get( @PathVariable("id") String id) { 
		Integer idNumber = Integer.parseInt(id); //El identificador recibido como string se convierte a tipo entero
		StudentJPA estudianteSolicitado = jpaRepo.findById(idNumber).get(); //Se recupera el estudiante solicitado a traves del repositorio JPA
		if(estudianteSolicitado != null) { //Si el estudiante no es null se retorna estudiante encontrado
			return new ResponseEntity<Object>(estudianteSolicitado, HttpStatus.OK);
		}else{ //Si el estudiante es null se notifica de no se ha encontrado ningun estudiante con el id espicificado
			return new ResponseEntity<Object>("No se ha encontrado ningun estudiante con el id: " +id, HttpStatus.NOT_FOUND);
		}   
    }
	
	
	/*
	 * Este metodo inserta un nuevo estudiante a la base de datos
	 * @param Objeto de tipo estudiante que se debe persistir en la base de datos
	 * @return - @return ResponseEntity<Object> - [ estudiante recien creado con su nuevo identificador | error por no cumplir restriccion de que el email no sea duplicado] 
	 */
	@RequestMapping(value="/" + __ControllerRelativePath, method=RequestMethod.POST)
	@CrossOrigin(origins= {"http://localhost:9090","http://localhost:4200"})
    public ResponseEntity<Object> create(@RequestBody StudentJPA student) {
		//En este primera linea se comprueba que el email del nuevo estudiante no existe ya en la base de datos, en caso de existir se devuelve error
		if(jpaRepo.findByEmail(student.getEmail()) != null) return new ResponseEntity<Object>("Email ya existente", HttpStatus.FOUND);
		//En caso de no existir el email del nuevo estudiante se persiste en la base de datos
		jpaRepo.save(student);
		//Se devuelve una respuesta de exito con el nuevo estudiante con su id nuevo
        return new ResponseEntity<Object>(student, HttpStatus.CREATED);
    }
	
	/*
	 * Este metodo modifica un estudiante y lo persiste en la base de datos
	 * el estudiante a modificar se recibe con un id a traves del path que 
	 * se mapea
	 * @param int - Identificador del estudiante
	 * @param Objeto de tipo estudiante que se debe persistir en la base de datos con nuevos datos
	 * @return - @return ResponseEntity<Object> - [ estudiante con modificaciones pertinentes |  ] 
	 */
    @RequestMapping(value="/" + __ControllerRelativePath + "/{id}", method=RequestMethod.PUT)
    @CrossOrigin(origins= {"http://localhost:9090","http://localhost:4200"})
	public ResponseEntity<Object> update(@PathVariable("id") String id, @RequestBody StudentJPA student) {
    	Integer numberID = Integer.parseInt(id); //Se convierte a integer el identificador recibido como String en la ruta mapeada
    	//Si el email modificado del estudiante es igual al de otro estudiante que no sea el mismo pues se devuelve error
    	StudentJPA studentConEmail = jpaRepo.findByEmail(student.getEmail());
    	if(studentConEmail != null &&  studentConEmail.getId() != Integer.parseInt(id)) return new ResponseEntity<Object>("Esta intentando asignar un email de otro usuario ya existente", HttpStatus.FOUND);
    	//Se recupera de la BBDD a traves del repositorio JPA el estudiante a modificar
    	StudentJPA modifiedStudent = jpaRepo.findById(numberID).get();
    	//Se modifican los atributos del estudiante
        modifiedStudent.setName(student.getName());
        modifiedStudent.setEmail(student.getEmail());
        modifiedStudent.setDisabled(student.isDisabled()); 
        //Se persiste el estudiante modificado
        jpaRepo.save(modifiedStudent); 
        //Se devuelve exito en la modificacion
    	return new ResponseEntity<Object>(modifiedStudent, HttpStatus.OK);
       
	}
    
    /*
	 * Este metodo borra un estudiante especificado en la ruta de mapeo de este metodo
	 * @param int - Identificador del estudiante
	 * @return - @return ResponseEntity<Object> - [ estudiante eliminado ] 
	 */
	@RequestMapping(value="/" + __ControllerRelativePath + "/{id}", method=RequestMethod.DELETE)
	@CrossOrigin(origins= {"http://localhost:9090","http://localhost:4200"})
	public ResponseEntity<Object> delete(@PathVariable("id") String id) {
		 //Se convierte en entero el id recibido como string como parametro en el path del mapeo
		 Integer idNumber = Integer.parseInt(id); 
		 //Se reucpera el estudiante que se va a eliminar a traves del repositorio de JPA
		 StudentJPA deletedStudent = jpaRepo.findById(idNumber).get();
		 //Se elimina el estudiante
		 jpaRepo.deleteById(idNumber);
		 //Se devuelve estatus igual a OK
	     return new ResponseEntity<>(deletedStudent, HttpStatus.OK);
	 } 
}
