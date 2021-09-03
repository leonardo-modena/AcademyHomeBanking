package com.banking.project.loginservice.springjwt.payload.response;

public class JwtResponse {
	private String token;
	private int expirationMs;

	public JwtResponse(String token,int expirationMs) {
		this.token = token;
		this.expirationMs=expirationMs;
	}

	public String getToken() {
		return token;
	}

	public int getExpirationMs() {
		return expirationMs;
	}

}
