package com.banking.project.cloud.gateway.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.banking.project.cloud.gateway.filter.JwtAuthenticationFilter;

@Configuration
public class GatewayConfig {

	@Autowired
	private JwtAuthenticationFilter filter;

	@Bean
	public RouteLocator routes(RouteLocatorBuilder builder) {
		return builder.routes().route("LOGIN-SERVICE", r -> r.path("/auth/signin").filters(f -> f.filter(filter)).uri("lb://LOGIN-SERVICE"))
				.route("ACCOUNT-MANAGEMENT-SERVICE", r -> r.path("/admin/**").filters(f -> f.filter(filter)).uri("lb://ACCOUNT-MANAGEMENT-SERVICE"))
				.route("TRANSACTION-SERVICE", r -> r.path("/bankAccount/**").filters(f -> f.filter(filter)).uri("lb://TRANSACTION-SERVICE"))
				.route("ACCOUNT-MANAGEMENT-SERVICE", r -> r.path("/customer/**").filters(f -> f.filter(filter)).uri("lb://ACCOUNT-MANAGEMENT-SERVICE"))
				.route("SIGNUP-SERVICE", r -> r.path("/signup").filters(f -> f.filter(filter)).uri("lb://SIGNUP-SERVICE")).build();
	}
	
}