package es.michael.springdemo;

public class SwimCoach implements Coach {

	FortuneService fortuneService; 
	
	public SwimCoach(FortuneService fortuneService) {
		this.fortuneService = fortuneService; 
	}

	@Override
	public String getDailyWorkout() {
		return "Swin 1000 meter as a warm up.";
	}
	@Override
	public String getDailyFortune() {
		return fortuneService.getFortune(); 
	}

}
