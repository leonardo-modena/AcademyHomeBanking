package com.banking.project.loginservice.security.jwt;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.banking.project.loginservice.services.MyUserDetails;

import io.jsonwebtoken.*;

@Component
public class JwtUtils {
	private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);
	//recupero i dati del token dall'application properties con @Value
	@Value("${security.jwt.secret}")
	private String secret;

	@Value("${security.jwt.expirationMs}")
	private int expirationMs;

	public String generateJwtToken(Authentication authentication) {

		MyUserDetails userDetails = (MyUserDetails) authentication.getPrincipal();
		List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority()).collect(Collectors.toList());
		//non mi serve la lista di ruoli ma solo il primo
		String role = roles.get(0);
		//codifico nel token l'id, il ruolo e la sua durata
		return Jwts.builder().setSubject(userDetails.getUsername()).claim("id", userDetails.getId()).claim("role",role).claim("expiration",expirationMs)
				.signWith(SignatureAlgorithm.HS512, secret).compact();
	}

	public String getUserNameFromJwtToken(String token) {
		return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody().getSubject();
	}

	public boolean validateJwtToken(String authToken) {
		try {
			Jwts.parser().setSigningKey(secret).parseClaimsJws(authToken);
			return true;
		} catch (SignatureException e) {
			logger.error("Invalid JWT signature: {}", e.getMessage());
		} catch (MalformedJwtException e) {
			logger.error("Invalid JWT token: {}", e.getMessage());
		} catch (ExpiredJwtException e) {
			logger.error("JWT token is expired: {}", e.getMessage());
		} catch (UnsupportedJwtException e) {
			logger.error("JWT token is unsupported: {}", e.getMessage());
		} catch (IllegalArgumentException e) {
			logger.error("JWT claims string is empty: {}", e.getMessage());
		}

		return false;
	}
}
