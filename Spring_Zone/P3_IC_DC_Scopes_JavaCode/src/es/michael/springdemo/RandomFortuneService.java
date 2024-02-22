package es.michael.springdemo;

import java.util.Random;

import org.springframework.stereotype.Component;

@Component
public class RandomFortuneService implements FortuneService {

	private Random randomGenerator = new Random(); 
	private String[] data = {
			"KICK THE BALL WITH LOVE!!",
			"IF YOU FAIL!! TRY AGAIN MY LOVE!!",
			"JUST BE HAPPY WHILE YOU PLAY"				
	}; 
	
	@Override
	public String getFortune() {
		return data[randomGenerator.nextInt(data.length)];
	}

}
