package es.michael.springdemo.mvc;

import javax.servlet.http.HttpServletRequest;



import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/hello")
public class HelloWorldController {
	@RequestMapping("/showForm")
	public String showForm() {
		return "helloworld-form";
	}
	@RequestMapping("/processForm")
	public String processForm() {
		return "helloworld"; 
	}
	
	
	@RequestMapping("/processFormVersionTwo")
	public String processFormVersionTwo(HttpServletRequest request, Model model) {
		//read the request parameter from the HTML form
		String input = request.getParameter("studentName"); 
		input = input.toUpperCase(); 
		String message = "Yo! " + input; 
		model.addAttribute("message",message); 
		return "helloworld"; 
	}
	
	@RequestMapping("/processFormVersionThree")
	public String processFormVersionThree(@RequestParam("studentName") String input, Model model) {
		//read the request parameter from the HTML form
		input = input.toUpperCase(); 
		String message = "Yo! " + input; 
		model.addAttribute("message",message); 
		return "helloworld"; 
	}
	
}


