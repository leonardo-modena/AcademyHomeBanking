package com.banking.project.loginservice.springjwt.payload.response;

import java.util.Date;

public class JwtResponse {
	private String token;
	private int id;
	private String firstName;
	private String lastName;
	private Date dateOfBirth;
	private String username;
	private String role;
	private String gender;
	private int tokenExpiration;

	public JwtResponse(String token, int id, String firstName, String lastName, Date dateOfBirth, String username,
			String role, String gender, int tokenExpiration) {
		
		this.token = token;
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.dateOfBirth = dateOfBirth;
		this.username = username;
		this.role = role;
		this.gender = gender;
		this.tokenExpiration = tokenExpiration;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public Date getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(Date dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public int getTokenExpiration() {
		return tokenExpiration;
	}

	public void setTokenExpiration(int tokenExpiration) {
		this.tokenExpiration = tokenExpiration;
	}
}
