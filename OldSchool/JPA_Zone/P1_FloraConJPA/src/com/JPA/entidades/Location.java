package com.JPA.entidades;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;




@Entity
@Table(name="LOCATED")
public class Location {
	
	@SequenceGenerator(name = "Gen", sequenceName = "Seq")
	@GeneratedValue(generator = "Gen") 
	@Column(name = "LOCATED_ID") 
	@Id private int id; 
	@Column(name = "LOCATED_NAME") 
	private String name; 
	@Column(name = "LOCATED_COORD") 
	private String gpsCoordinates; 
	@OneToMany(mappedBy = "location")
	private List<Flora> flora;
	
	@Transient 
	 private double floraStability; 
	

	public double getFloraStability() { 
		 return this.floraStability; 
	}
	
	 public void setFloraStability(int i) { 
		 this.floraStability = i; 
	 } 
		 
	 public void addRisk(int risk) { 
		 this.floraStability = this.floraStability + risk; 
	 } 
		 
	 public void averageStability(int num) { 
		 this.floraStability = this.floraStability/num; 
	 } 
	
	
	 public int getId() {
		 return id;
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
	 public String getGpsCoordinates() {
		 return gpsCoordinates;
	 }
	 public void setGpsCoordinates(String gpsCoordinates) {
		 this.gpsCoordinates = gpsCoordinates;
	 }
	 public List<Flora> getFlora() {
		 return flora;
	 }
	 public void setFlora(List<Flora> flora) {
	 	this.flora = flora;
	 } 
	
	
}
