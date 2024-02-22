package es.michael.springdemo.mvc;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/student") 
public class StudentController {
	
	@RequestMapping("/showForm")
	public String showForm(Model theModel) {
		//Create a student object
		Student theStudent = new Student(); 	
		theModel.addAttribute("student", theStudent); 
		return "student-form"; 
	}
	
	@RequestMapping("/processForm")
	public String processForm(@ModelAttribute("student") Student stud) {
		System.out.println("The Student: " + stud.getFirstName() + " " + stud.getLastName());
		return "student-confirmation"; 
	}
}
