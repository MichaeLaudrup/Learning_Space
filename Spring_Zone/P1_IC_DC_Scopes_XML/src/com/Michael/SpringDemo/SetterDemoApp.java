package com.Michael.SpringDemo;

import org.springframework.context.support.ClassPathXmlApplicationContext;

public class SetterDemoApp {

	public static void main(String[] args) {
		//load the spring configuration file
		ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");  
		//retrieve bean from spring container
		CricketCoach newCoach = context.getBean("myCricketCoach", CricketCoach.class); 
		//call methods on the bean
		System.out.println(newCoach.getDailyWorkout());  
		System.out.println(newCoach.getDailyFortune());
		System.out.println(newCoach.getEmail());
		System.out.println(newCoach.getTeam());
		//close the context
		context.close(); 
	}

}
