package com.Michael.SpringDemo;

public class CricketCoach implements Coach {
	private FortuneService fortuneService; 
	private String email; 
	private String team; 
	
	public void setEmail(String email) {
		System.out.println("CricketCoach: inside setter method - setEmailAdrees ");
		this.email = email;
	}


	public void setTeam(String team) {
		System.out.println("CricketCoach: inside setter method - setTeam ");
		this.team = team;
	}


	public String getEmail() {
		return email;
	}


	public String getTeam() {
		return team;
	}


	public CricketCoach() {
		System.out.println("CricketCoach: inside no-arg constructor");
	}
	
	
	public void setFortuneService(FortuneService fortuneService) {
		System.out.println("CricketCoach: inside setter method - setFortuneService ");
		this.fortuneService = fortuneService;
	}

	@Override
	public String getDailyWorkout() {
		return "Just kick the ball!! And be happy";
	}

	@Override
	public String getDailyFortune() {
		return fortuneService.getFortune(); 
	}

}
