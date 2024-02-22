package com.Michael.SpringDemo;

import org.springframework.context.support.ClassPathXmlApplicationContext;

public class BeanScopeDemoApp {

	public static void main(String[] args) {
		//load the spring configuration file
		ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("beanScope-applicationContext.xml");  
		Coach trainer = context.getBean("myCoach", Coach.class);
		Coach alphaCoach = context.getBean("myCoach", Coach.class);
		boolean result = (trainer == alphaCoach);
		System.out.println((result) ? "Both objects are the same": "No equaly objects");
		System.out.println("Memory location for trainer is: " + trainer);
		System.out.println("Memory location for alphaCoach is: " + alphaCoach);
		context.close(); 
	}

}
