package com.banking.project.loginservice.services;

import com.banking.project.loginservice.entity.Customer;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.common.hash.Hashing;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.Collection;

public class MyUserDetails implements UserDetails {

	private static final long serialVersionUID = 1L;
	private int id;
	private String username;
	private String firstName;
	private String lastName;
	private long dateOfBirth;
	private String gender;
	@JsonIgnore
	private String password;

	private SimpleGrantedAuthority authority;

	
	public MyUserDetails(int id, String username, String password,String firstName, String lastName, long dateOfBirth, String gender,
			SimpleGrantedAuthority authority) {
		this.id = id;
		this.username = username;
		this.firstName = firstName;
		this.lastName = lastName;
		this.dateOfBirth = dateOfBirth;
		this.gender = gender;
		this.password = password;
		this.authority = authority;
	}

	/**
	 * Metodo che crea un oggetto MyUserDetails con i dettagli dell'utente
	 * @param user
	 * @return MyUserDetails con all'interno authority
	 */
	public static MyUserDetails build(Customer user) {
		SimpleGrantedAuthority authority = new SimpleGrantedAuthority(user.getRole());
		String passwordCrypt= Hashing.sha256()
  			  .hashString(user.getPassword(),StandardCharsets.UTF_8)
			  .toString();
		return new MyUserDetails(user.getId(), user.getEmail(),passwordCrypt, user.getFirstName(),
				user.getLastName(),user.getDateOfBirth(),user.getGender(),authority);
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return Arrays.asList(authority);
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return username;
	}

	public int getId() {
		return id;
	}
	

	public String getFirstName() {
		return firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public long getDateOfBirth() {
		return dateOfBirth;
	}

	public String getGender() {
		return gender;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

}