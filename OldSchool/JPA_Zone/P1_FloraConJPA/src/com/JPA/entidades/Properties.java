package com.JPA.entidades;

import javax.persistence.Access;
import javax.persistence.Embeddable;
import javax.persistence.AccessType;

	@Embeddable
	@Access(AccessType.FIELD) 
	public class Properties {
		public enum Habitat { 
			 TROPICAL, HUMEDO, SECO, CALIDO 
		} 
		
		public enum Leaf { 
			 NSNC, PERENNE, CADUCA 
	    } 
		private Leaf leafType; 
		private Habitat habitat; 
	 
	 public Properties() { 
	 } 
	 
	 @Override 
	 public String toString() { 
	 return "Leaf: " + leafType + ", Habitat: " + habitat ; 
	 } 
	 
	} 

