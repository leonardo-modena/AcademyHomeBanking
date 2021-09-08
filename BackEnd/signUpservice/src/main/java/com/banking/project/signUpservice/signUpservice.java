package com.banking.project.signUpservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableSwagger2
public class signUpservice {

	public static void main(String[] args) {
		SpringApplication.run(signUpservice.class, args);
	}

}
