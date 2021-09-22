package com.banking.project.loginservice.controller;

import javax.naming.AuthenticationException;

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
import com.banking.project.loginservice.dto.JwtResponse;
import com.banking.project.loginservice.dto.LoginRequest;
import com.banking.project.loginservice.encoder.Sha256Encoder;
import com.banking.project.loginservice.security.jwt.JwtUtils;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequestMapping("/auth")
public class AuthController {
	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	CustomerRepository customerRepository;
	//Encoder custom in quanto quello fornito da PasswordEncoder per la sha256 è deprecato
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
	@Operation(summary = "Login utente", description = "Pagina di autenticazione per l'utente", tags = "Login")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Autenticazione utente avvenuta, token generato", content = {
			@Content(mediaType = "application/json", schema = @Schema(implementation = ResponseEntity.class)) }),
			@ApiResponse(responseCode = "401", description = "Utente non trovato/Utente non autorizzato", content = {
			@Content(mediaType = "application/json", schema = @Schema(implementation = AuthenticationException.class)) })
	
	})
	//Rimosso @Valid prima di @RequestBody in quanto la validazione non è accettata sul browser
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
