package es.michael.jdbc;

import java.sql.Connection;
import java.sql.DriverManager;

public class TestJDBC {
	private static String JDBC_URL = "jdbc:mysql://localhost:3306/hb_student_tracker?useSSL=false&Timezone=UTC";
	private static String USUARIO = "hbstudent"; 
	private static String PASSWORD = "hbstudent"; 
	
	public static void main(String[] args) {
		try {
			System.out.println(" >>> Conectando a la base de datos: " + JDBC_URL);
			Connection miConexion = DriverManager.getConnection(JDBC_URL,USUARIO,PASSWORD);
			System.out.println(" >>> Conexion realizada con exito...");
		}catch(Exception exc) {
			exc.printStackTrace();
		}

	}

}
