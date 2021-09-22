package com.banking.project.loginservice.dto;

public class LoginRequest {
	
	//Rimossi @NotBlank su username e password in quanto danno errore sulla console del browser
	
	private String username;
	
	private String password;

	public LoginRequest(String username, String password) {
		this.username = username;
		this.password = password;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
