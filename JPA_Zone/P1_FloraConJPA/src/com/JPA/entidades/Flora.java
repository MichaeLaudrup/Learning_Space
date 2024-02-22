package com.JPA.entidades;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Transient;

@Entity
public class Flora {
	 @Id 
	 @Column(name = "FLORA_ID") 
	 @SequenceGenerator(name = "Gen2", sequenceName = "Seq2") 
	 @GeneratedValue(generator = "Gen2") 
	 private int id;
	 
	 @Transient private int plantId; 
	 
	 @ManyToOne 
	 @JoinColumn(name = "LOCATED_ID") 
	 private Location location;
	 
	 @Transient
	 private Planta planta; 
	 
	 
	 public Flora() {
		 
	 }
	 public int getId() {
		 return id;
	 }
	 public void setId(int id) {
		 this.id = id;
	 }
	 
	 @Access(AccessType.PROPERTY) @Column(name = "FLORA_TYPE")
	 public String getType() {
		 return planta.getClass().toString();
	 }
	 public void setType(String type) { 
		 if (this.planta == null) { 
			 initPlant(type); 
		 } else { 
			 modifyPlant(type); 
		 } 
	 }
	 
	 public Location getLocation() {
		 return location;
	 }
	 public void setLocation(Location location) {
		 this.location = location;
	 } 
	 
	 
	 private void initPlant(String type) { 
		 if (type.equals("TREE")) 
			 this.planta = new Tree(); 
		 if (type.equals("BUSH")) 
			 this.planta = new Bush(); 
		 } 
		 
	private void modifyPlant(String type) { 
		 if (type.equals("TREE")) { 
			 this.planta = new Tree(this.planta.getId()); 
		 } else if (type.equals("BUSH")) { 
			 this.planta = new Bush(this.planta.getId()); 
		 } else { 
			 System.err.println("Tipo " + type + " no reconocido"); 
		 } 
	}
	 
	@Access(AccessType.PROPERTY) 
	@Column(name = "FLORA_TYPE_ID") 
	public int getTypeId() { 
	    if (planta instanceof Tree) { 
	        return ((Tree) planta).getId(); 
	    } 
	    if (planta instanceof Bush) { 
	        return ((Bush) planta).getId(); 
	    } else 
	        return 0; 
	    } 
	 
	 public void setTypeId(int id) { 
		 if (planta == null) 
			 this.planta = new Tree(id); 
		 else 
			 this.planta.setId(id); 
	}
	public void setPlantId(int i) {
		this.id = i;	
	}
	public Planta getPlant() {
		return planta;
	}
	public void setPlant(Planta planta) {
		this.planta = planta;
	}
	public String resolvePlantType() {
		return this.planta.getClass().getSimpleName();
	} 
	
	public String toString() {
		return "ID: " + this.id +  "Type:" + this.resolvePlantType(); 
	}
	  
}
