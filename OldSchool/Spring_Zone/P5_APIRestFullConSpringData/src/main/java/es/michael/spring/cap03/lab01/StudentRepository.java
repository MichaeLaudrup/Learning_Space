package es.michael.spring.cap03.lab01;

import org.springframework.data.jpa.repository.JpaRepository;


public interface StudentRepository extends JpaRepository<StudentJPA,Integer> {
	StudentJPA findByEmail(String email); 
}
