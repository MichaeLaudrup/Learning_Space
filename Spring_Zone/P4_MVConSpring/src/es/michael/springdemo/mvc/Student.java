package es.michael.springdemo.mvc;

import java.util.LinkedHashMap;

public class Student {
	private String firstName; 
	private String lastName;
	private String country; 
	private String favoriteLanguage; 
	private String favoriteIDE; 
	private String[] operatingSystem; 
	
	public String getFavoriteIDE() {
		return favoriteIDE;
	}

	public void setFavoriteIDE(String favoriteIDE) {
		this.favoriteIDE = favoriteIDE;
	}

	private LinkedHashMap<String, String> countryOptions; 
	private LinkedHashMap<String, String> ideOptions; 
	private LinkedHashMap<String, String> operatingSystemsList;
	

	public Student() {
		countryOptions = new LinkedHashMap<>(); 
		ideOptions= new LinkedHashMap<>(); 
		operatingSystemsList = new LinkedHashMap<>(); 
		countryOptions.put("ES", "Spain"); 
		countryOptions.put("FR", "France"); 
		countryOptions.put("BR", "Brazil"); 
		countryOptions.put("DE", "Germany"); 
		countryOptions.put("IN", "India"); 
		
		ideOptions.put("Eclipse", "Eclipse"); 
		ideOptions.put("Visual Studio", "VS"); 
		ideOptions.put("Code blocks", "Code blocks"); 
		ideOptions.put("Net beans", "Net beans"); 
		
		operatingSystemsList.put("Mac OS", "Mac OS"); 
		operatingSystemsList.put("Windows 10", "Windows 10"); 
		operatingSystemsList.put("Ubuntu", "Ubuntu"); 
		operatingSystemsList.put("KaliLinux", "KaliLinux"); 
	}
	
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public LinkedHashMap<String, String> getCountryOptions() {
		return countryOptions;
	}

	public void setCountryOptions(LinkedHashMap<String, String> countryOptions) {
		this.countryOptions = countryOptions;
	}

	public String getFavoriteLanguage() {
		return favoriteLanguage;
	}

	public void setFavoriteLanguage(String favoriteLanguage) {
		this.favoriteLanguage = favoriteLanguage;
	}
	
	public LinkedHashMap<String, String> getIdeOptions() {
		return ideOptions;
	}

	public void setIdeOptions(LinkedHashMap<String, String> ideOptions) {
		this.ideOptions = ideOptions;
	}
	
	public LinkedHashMap<String, String> getOperatingSystemsList() {
		return operatingSystemsList;
	}

	public void setOperatingSystemsList(LinkedHashMap<String, String> operativeSystemsList) {
		this.operatingSystemsList = operativeSystemsList;
	}

	public String[] getOperatingSystem() {
		return operatingSystem;
	}

	public void setOperatingSystem(String[] operativeSystem) {
		this.operatingSystem = operativeSystem;
	}	
}
