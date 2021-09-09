package com.banking.project.cloud.gateway.filter;

import java.util.List;
import java.util.function.Predicate;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;

import org.springframework.web.server.ServerWebExchange;

import com.banking.project.cloud.gateway.exception.JwtTokenMalformedException;
import com.banking.project.cloud.gateway.exception.JwtTokenMissingException;
import com.banking.project.cloud.gateway.util.JwtUtil;


import reactor.core.publisher.Mono;
/**
 * Classe che, controllando il token, si occupa di gestire le richieste
 */
@Component
public class JwtAuthenticationFilter implements GatewayFilter {

	@Autowired
	private JwtUtil jwtUtil;

	@Override
	public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
		ServerHttpRequest request = (ServerHttpRequest) exchange.getRequest();
		//lista di endpoints del gateway
		final List<String> apiEndpoints = List.of("/signup","/signin");

		Predicate<ServerHttpRequest> isApiSecured = r -> apiEndpoints.stream()
				.noneMatch(uri -> r.getURI().getPath().contains(uri));

		if (isApiSecured.test(request)) {
			//controllo di Authorization, voglio vedere se c'è il token e se è corretto
			if (!request.getHeaders().containsKey("Authorization")) {
				ServerHttpResponse response = exchange.getResponse();
				response.setStatusCode(HttpStatus.UNAUTHORIZED);

				return response.setComplete();
			}

			final String token = request.getHeaders().getOrEmpty("Authorization").get(0);
			
			try {
				//lancio la validazione del token
				jwtUtil.validateJwtToken(token);
				
			} catch (JwtTokenMalformedException | JwtTokenMissingException e) {
				

				ServerHttpResponse response = exchange.getResponse();
				response.setStatusCode(HttpStatus.BAD_REQUEST);

				return response.setComplete();
			}
				String claims = jwtUtil.getUser(token);
				exchange.getRequest().mutate().header("sub", String.valueOf(claims)).build();
			}

			return chain.filter(exchange);
		}
	



	
}

				

			

