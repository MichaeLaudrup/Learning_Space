package com.JPA.Programa;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import com.JPA.entidades.*;
import com.JPA.servicios.Service; 

public class Program2 {

	public static void main(String[] args) {
		
		EntityManagerFactory emf = Persistence.createEntityManagerFactory("tutoCap3"); 
		EntityManager em = emf.createEntityManager();
		
		Location l = Service.buscarLocation(em, 1); 
		 
		// Hay que buscar por nombre las Plants de flora 
		for (Flora f : l.getFlora()) { 
		    if (f.getPlant() instanceof Tree) { 
		       f.setPlant(Service.buscarTree(em, f.getPlant().getId())); 
		 } else if (f.getPlant() instanceof Bush) { 
			 f.setPlant(Service.buscarBush(em, f.getPlant().getId())); 
		 } 
		 } 
		 // comprobamos que las plantas ya han sido cargadas 
		 System.out.println(Service.buscarFlora(em, 1) + "\nLocation 1: " + 
		 l.getFlora()); 
		 System.out.println("-----------------"); 
		 
		 // ----- separamos las especies para calculo final de la estabilidad 
		 List<Tree> trees = new ArrayList<Tree>(); 
		 List<Bush> bushes = new ArrayList<Bush>(); 
		 for (Flora f : l.getFlora()) { 
			 if (f.resolvePlantType().equals("Tree")) { 
			 trees.add((Tree) f.getPlant()); 
			 } else if (f.resolvePlantType().equals("Bush")) { 
			 bushes.add((Bush) f.getPlant()); 
			 } 
		 } 
		 
		 System.out.println("La lista de arboles es: " + trees + "\nLa lista de arbustos es: " + bushes); 
		 System.out.println("-----------------"); 
		 
		 // calculamos la estabilidad 
		 List<Compatible> compatible = Service.buscarCompatibles(em); 
		 l.setFloraStability(0); 
		 int relaciones = 0;
		 
		 for (Compatible c : compatible) { 
			 for (Bush b : bushes) { 
				 for (Tree t : trees) { 
					 if (c.getBushId() == b.getId() && c.getTreeId() == t.getId()) { 
						 System.out.println("relación " + b.getName() + " con " + t.getName() + ", riesgo: " + 
						 c.getRisk()); 
						 relaciones++; 
						 l.addRisk(c.getRisk()); 
					 } 
				 } 
			 } 
		 } 
			 
		 l.averageStability(relaciones); 
		 System.out.println("La estabilidad de '" + l.getName() + "' es de " + 
		 l.getFloraStability()); 
		 em.close(); 
		 emf.close();
	}

}
