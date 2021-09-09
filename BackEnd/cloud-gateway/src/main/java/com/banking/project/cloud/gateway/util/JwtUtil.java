package com.banking.project.cloud.gateway.util;

import org.springframework.beans.factory.annotation.Value;

import org.springframework.stereotype.Component;

import com.banking.project.cloud.gateway.exception.JwtTokenMalformedException;
import com.banking.project.cloud.gateway.exception.JwtTokenMissingException;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;

import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

@Component
public class JwtUtil {

	@Value("${jwt.secret}")
	private String jwtSecret;

	/**
	 * Metodo che recupera l'utente decodificando il token
	 * 
	 * @param token
	 * @return
	 */
	public String getUser(final String token) {

		return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();

	}

	/**
	 * Metodo che si occupa della validazione del token
	 * 
	 * @param authToken
	 * @throws JwtTokenMalformedException
	 * @throws JwtTokenMissingException
	 */
	public void validateJwtToken(String authToken) throws JwtTokenMalformedException, JwtTokenMissingException {
		try {
			Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
		} catch (SignatureException ex) {
			throw new JwtTokenMalformedException("Invalid JWT signature");
		} catch (MalformedJwtException ex) {
			throw new JwtTokenMalformedException("Invalid JWT token");
		} catch (ExpiredJwtException ex) {
			throw new JwtTokenMalformedException("Expired JWT token");
		} catch (UnsupportedJwtException ex) {
			throw new JwtTokenMalformedException("Unsupported JWT token");
		} catch (IllegalArgumentException ex) {
			throw new JwtTokenMissingException("JWT claims string is empty.");
		}
	}

}