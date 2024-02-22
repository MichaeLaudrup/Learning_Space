package es.michael.springdemo;

import org.springframework.context.support.ClassPathXmlApplicationContext;

public class AnnotationBeanScopeDemoApp {

	public static void main(String[] args) {
		ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml"); 
		Coach theCoach = context.getBean("tennisCoach", Coach.class); 
		Coach alphaCoach = context.getBean("tennisCoach", Coach.class); 
		boolean result = (theCoach == alphaCoach); 
		System.out.println("Are both coach at the same position: " + ((result) ? "Yes" : "No"));
		System.out.println("Current location theCoach: " + theCoach); 
		System.out.println("Current location alphaCoach: " + alphaCoach);
		context.close(); 

	}

}
