package es.michael.jdbc;


import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import es.michael.hibernate.entidades.Student;

public class Hibernate_NuevoEstudiante {
	
	
	private static String[] arrayNombres = {"Michael", "Paula", "Marcos", "Maria", "Hector", "Alejandro", "Veronica"}; 
	private static String[] arrayApellidos = {"Luis Gonzalez", "Ferrer", "Hernandez", "Socaballo", "Gutier", "Manzano", "Luis Gonzalez"}; 
	private static String[] arrayEmail = { "Micha@gmail.com", "ferrer@hotmail.com", "marcos@luv.es", "maria@.hotmail.es", "hector@ht.com", "@Alejandro", "@veronica"}; 
	public static void main (String args[]) {
		//Crear una fabrica de sesiones
		SessionFactory fabricaSesiones = new Configuration().configure("hibernate.cfg.xml").addAnnotatedClass(Student.class).buildSessionFactory(); 
		
		//Crear sesion
		Session sesion = fabricaSesiones.getCurrentSession(); 
		
		try {
			/////////////////////////CREATE ///////////////////////////////////
			Student estudianteTemporal =null; 
			for(int i = 0; i < arrayNombres.length; i++) {
				sesion = fabricaSesiones.getCurrentSession(); 
				System.out.println(">> Creando nuevo objeto de tipo estudiante");
				estudianteTemporal = new Student(arrayNombres[i], arrayApellidos[i], arrayEmail[i]);
				sesion.beginTransaction(); 
				sesion.save(estudianteTemporal); 
				sesion.getTransaction().commit();
				System.out.println(">> Se ha creado con exito el estudiante: " + estudianteTemporal);
			}
			/////////////////////////READ/////////////////////////////////////////
			System.out.println(">> Se procede a buscar al ultimo estudiante recien creado en la base de datos");
			sesion = fabricaSesiones.getCurrentSession(); 
			sesion.beginTransaction();  
			
			//Obtener un estudiante completo enviando un id
			System.out.println("Se ha localizado al estudiante: " + sesion.get(Student.class, estudianteTemporal.getId() ));
			sesion.getTransaction().commit();
			sesion = fabricaSesiones.getCurrentSession(); 
			sesion.beginTransaction(); 
			List<Student> theStudents = sesion.createQuery("from Student").list(); 
			System.out.println(theStudents.toString()); 
			
			//Apreciar que en la consulta esta usando su nombre en la entity (en la clase) NO el nombre de campo en la BBDD
			theStudents = sesion.createQuery("from Student s WHERE s.lastName='Luis Gonzalez'").list(); 
			System.out.println(">> Los alumnos con apellido 'Luis Gonzalez' son : " + theStudents.toString());	
			
			//Consultar aquellos que tengan un determinado nombre o un determinado apellido
			theStudents = sesion.createQuery("from Student s WHERE s.lastName='Luis Gonzalez' OR s.firstName='Marcos'").list();
			System.out.println(">> Los alumnos con apellido 'Luis Gonzalez' o con nombre 'Marcos' son : " + theStudents.toString());	
			theStudents = sesion.createQuery("from Student s WHERE s.email LIKE '%.com'").list();
			
			System.out.println(">> Los alumnos con email acabado en '.com' son:" );	
			for(int i = 0; i < theStudents.size(); i++) {
				System.out.println(theStudents.get(i));
			}
			//Consultar aquellos alumnos que tenga un email acabado en ".com"
			
			/////////////////////////////////////////UPDATE////////////////////////////////////////////////////
			System.out.println(">> Se procede a actualizar todos los correos electronicos");
			sesion.createQuery("update Student set email='unnasigned@gmail.com'").executeUpdate(); //Se elimina con SQL querys
			
			
			Student estudiante = sesion.get(Student.class, 3); 
			System.out.println(">> Se obtiene el estudiante con id=3" + estudiante); 
			
			//Se modifica el email del estudiante con id = 3
			estudiante.setEmail(estudiante.getFirstName()+estudiante.getLastName()+"@gmail.com");
			
			
			////////////////////////////////////// DELETE ////////////////////////////////////////////////////
			estudiante = sesion.get(Student.class, 5);
			System.out.println(">> Se obtiene el estudiante con id: 5 y se procede a eliminarlo");
			sesion.delete(estudiante);
			
			//Otra manera de eliminar
			sesion.createQuery("DELETE FROM Student WHERE id=2").executeUpdate();
			
			
			sesion.getTransaction().commit();
			
			
		}catch(Exception e) {
			e.printStackTrace();
		}finally {
			fabricaSesiones.close(); //Se cierra la fabrica de sesiones
		}
	}
}
