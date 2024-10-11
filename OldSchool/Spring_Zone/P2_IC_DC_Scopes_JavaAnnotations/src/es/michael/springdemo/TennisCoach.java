package es.michael.springdemo;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class TennisCoach implements Coach {
	@Value("${sport.email}")
	String email; 
	@Value("${sport.team}")
	String team; 
	
	@Autowired
	@Qualifier("randomFortuneService")
	private FortuneService fortuneService; 
	
	/*  Injection with constructor
	@Autowired
	public TennisCoach(FortuneService fortuneService) {
		this.fortuneService = fortuneService; 
	}
	*/
	public TennisCoach() {
		System.out.println(">> TennisCoach: inside default constructor");
	}
	
	/* Setter Injection 
	@Autowired
	public void setFortuneService(FortuneService fortuneService) {
		System.out.println(">> TennisCoach: inside setFortuneService");
		this.fortuneService = fortuneService; 
	}*/
	
	@Override
	public String getDailyWorkout() {
		return "Practice your backhand volley"; 
	}

	@Override
	public String getDailyFortune() {
		return fortuneService.getFortune() ;
	}
	
	public String generalInfo() {
		return "My email is: " + this.email + " and my team is: "+ this.team; 
	}
	@PostConstruct
	public void initMethod() {
		System.out.println(">> Spring create a Tennis Coach object"); 
	}
	
	@PreDestroy
	public void destroyMethod() {
		System.out.println(">> Spring destroy a Tennis Coach object"); 
	}
	

}
