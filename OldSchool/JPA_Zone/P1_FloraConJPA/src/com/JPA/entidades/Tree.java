package com.JPA.entidades;

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name = "TREES") 
public class Tree extends Planta{
	 @Id 
	 @Column(name = "TREE_ID") 
	 private int id; 
	 @Column(name = "TREE_NAME") 
	 private String name;
	 
	 @Embedded 
	 @AttributeOverrides({ @AttributeOverride( name = "leafType", column = @Column(name = "LEAF_TYPE")), @AttributeOverride(name = "habitat", column = @Column(name = "HABITAT")) }) 
	 private Properties properties;

	 public Tree() {
		 
	 }
	public Tree(int id) {
		this.id = id; 
	}
	
	public int getId() {
		return this.id; 
	}
	
	public void setId(int id) {
		this.id = id; 
		
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Properties getProperties() {
		return properties;
	}
	public void setProperties(Properties properties) {
		this.properties = properties;
	}
	
	
	 
}
