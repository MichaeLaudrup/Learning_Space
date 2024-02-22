package es.michael.springdemo.mvc;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {
	
	//When you put "/", it means what page load when you put root URL
	@RequestMapping("/")
	public String showPag() {
		return "main-menu"; 
	}
}
