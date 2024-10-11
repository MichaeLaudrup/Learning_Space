package com.Michael.SpringDemo;

import java.util.Random;

public class RandomFortuneService implements FortuneService {
	String arrFortunes[] = {"Just be happy", "Ok! Lets run!", "If you fail, try again"}; 
	Random randomNumber = new Random(); 

	public String getFortune() {
		return arrFortunes[randomNumber.nextInt(arrFortunes.length)]; 
	}

}
