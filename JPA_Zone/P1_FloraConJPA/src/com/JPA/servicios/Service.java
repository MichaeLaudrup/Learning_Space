package com.JPA.servicios;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;

import com.JPA.entidades.Bush;
import com.JPA.entidades.Compatible;
import com.JPA.entidades.Flora;
import com.JPA.entidades.Location;
import com.JPA.entidades.Tree;

public class Service {
	
	public static void insertarLocation(EntityManager em, Location location) { 
		 em.persist(location); 
	} 
		 
	public static void insertarFlora(EntityManager em, Flora flora) { 
		 em.persist(flora); 
	}

	public static Location buscarLocation(EntityManager em, int indice) {
		return em.find(Location.class, indice);
	}
	
	public static Tree buscarTree(EntityManager em, int indice) {
		return em.find(Tree.class, indice);
	}
	
	public static Bush buscarBush(EntityManager em, int indice) {
		return em.find(Bush.class, indice); 
	}
	
	public static Flora buscarFlora(EntityManager em, int indice) {
		return em.find(Flora.class, indice); 
	}

	public static List<Compatible> buscarCompatibles(EntityManager em) {
		List<Compatible> compatibles = new ArrayList<Compatible>(); 
		 compatibles = em.createNamedQuery("Compatible.todos", Compatible.class).getResultList(); 
		 return compatibles;
	}
}
