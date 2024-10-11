package es.michael.springdemo;

import org.springframework.context.support.ClassPathXmlApplicationContext;

public class AnnotationDemoApp {

	public static void main(String[] args) {
		//read spring config file
		ClassPathXmlApplicationContext context =
				new ClassPathXmlApplicationContext("applicationContext.xml");
		
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
