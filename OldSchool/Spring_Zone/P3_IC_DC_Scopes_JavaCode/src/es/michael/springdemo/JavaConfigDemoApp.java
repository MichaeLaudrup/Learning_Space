package es.michael.springdemo;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class JavaConfigDemoApp {

	public static void main(String[] args) {
		//read spring config java class
		AnnotationConfigApplicationContext context =
				new AnnotationConfigApplicationContext(SportConfig.class);
		
		//get the bean from spring container
		TennisCoach theCoach = context.getBean("tennisCoach", TennisCoach.class); 
		
		//call a method on the bean
		System.out.println(theCoach.getDailyWorkout());
		System.out.println(theCoach.getDailyFortune());
		System.out.println(theCoach.generalInfo());
		
		//close context
		context.close(); 
	}

}
