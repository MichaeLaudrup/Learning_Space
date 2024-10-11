package es.michael.spring.cap03.lab01;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name="STUDENTS")
public class StudentJPA
{
	@Id
	@SequenceGenerator(name = "Gen", sequenceName = "studentSeq3", allocationSize=1) 
	@GeneratedValue(generator = "Gen",strategy=GenerationType.SEQUENCE)
	@Column(name="ID_STUDENT")
	private Integer id;
	
	@Column(nullable=false, name="first_name")
	private String name;
	
	@Column(nullable=false, unique=true, name="email")
	private String email;
	
	@Column(name="disabled")
	private boolean disabled;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public boolean isDisabled() {
		return disabled;
	}

	public void setDisabled(boolean disabled) {
		this.disabled = disabled;
	}

	@Override
	public String toString() {
		return "[id=" + id + ", name=" + name + ", email=" + email + ", disabled=" + disabled + "]";
	}	
}          
