package com.banking.project.loginservice.springjwt.payload.response;
/**
 * Classe che si occupa di restituire il token
 * @author sonia
 *
 */
public class JwtResponse {
	private String token;

	public JwtResponse(String token) {
		this.token = token;
	}

	public String getToken() {
		return token;
	}
}
