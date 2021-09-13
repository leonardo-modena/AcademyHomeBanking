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
 * Classe che si occupa di gestire le richieste controllando il token
 */
@Component
public class JwtAuthenticationFilter implements GatewayFilter {

	@Autowired
	private JwtUtil jwtUtil;

	@Override
	public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
		ServerHttpRequest request = (ServerHttpRequest) exchange.getRequest();
		// lista di endpoints del gateway
		final List<String> apiEndpoints = List.of("/signup", "/signin");

		Predicate<ServerHttpRequest> isApiSecured = r -> apiEndpoints.stream()
				.noneMatch(uri -> r.getURI().getPath().contains(uri));

		if (isApiSecured.test(request)) {
			// controllo di Authorization, voglio vedere se c'è
			if (!request.getHeaders().containsKey("Authorization")) {
				ServerHttpResponse response = exchange.getResponse();
				// non c'è, setto unauthorized
				response.setStatusCode(HttpStatus.UNAUTHORIZED);
				// ritorno l'errore
				return response.setComplete();
			}
			// Authorization è settato, prendo il token
			final String token = request.getHeaders().getOrEmpty("Authorization").get(0);

			try {
				// lancio la validazione del token
				jwtUtil.validateJwtToken(token);

			} catch (JwtTokenMalformedException | JwtTokenMissingException e) {

				// il token è malformato o non presente, preparo una response
				ServerHttpResponse response = exchange.getResponse();
				// setto lo status code con BAD REQUEST
				response.setStatusCode(HttpStatus.BAD_REQUEST);
				// ritorno l'errore
				return response.setComplete();
			}
			// recupero l'utente
			String claims = jwtUtil.getUser(token);
			exchange.getRequest().mutate().header("sub", String.valueOf(claims)).build();
		}
		//filtro le richieste in base all'utente
		return chain.filter(exchange);
	}

}
