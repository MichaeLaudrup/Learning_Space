package es.michael.springdemo;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class SwimJavaConfigDemoApp {

	
	public static void main(String[] args) {
		//read spring config java class
		AnnotationConfigApplicationContext context =
				new AnnotationConfigApplicationContext(SportConfig.class);
		
		//get the bean from spring container
		Coach theCoach = context.getBean("swimCoach", SwimCoach.class); 
		
		//call a method on the bean
		System.out.println(theCoach.getDailyWorkout());
		System.out.println(theCoach.getDailyFortune());
		
		//close context
		context.close(); 
	}

}
