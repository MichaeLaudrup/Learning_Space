package es.michael.springdemo;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
//@ComponentScan("es.michael.springdemo")
@PropertySource("classpath:mylogger.properties")
@PropertySource("classpath:sport.properties")
public class SportConfig {
	//define bean for our sad fortune service
	@Bean
	public FortuneService sadFortuneService() {
		return new SadFortuneService(); 
	}
	//define bean for our swim coach AND inject dependecy
	@Bean
	public Coach swimCoach() {
		return new SwimCoach(sadFortuneService()); 
	}
}
