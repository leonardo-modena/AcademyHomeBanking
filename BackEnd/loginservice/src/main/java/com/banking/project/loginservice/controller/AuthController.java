package com.banking.project.loginservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.banking.project.loginservice.dao.CustomerRepository;
import com.banking.project.loginservice.encoder.Sha256Encoder;
import com.banking.project.loginservice.security.jwt.JwtUtils;
import com.banking.project.loginservice.springjwt.payload.request.LoginRequest;
import com.banking.project.loginservice.springjwt.payload.response.JwtResponse;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequestMapping("/auth")
public class AuthController {
	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	CustomerRepository customerRepository;

	@Autowired
	Sha256Encoder encoder;

	@Autowired
	JwtUtils jwtUtils;

	@Value("${security.jwt.expirationMs}")
	private int tokenExpiration;

	/**
	 * Metodo che autentica l'utente con username e password
	 * 
	 * @param loginRequest
	 * @return JwtResponse
	 */
	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		// generazione del token
		String jwt = jwtUtils.generateJwtToken(authentication);
		return ResponseEntity.ok(new JwtResponse(jwt));
	}

}
