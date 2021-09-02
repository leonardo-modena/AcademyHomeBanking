package com.banking.project.loginservice.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/test")
public class AccountController {
	
	@GetMapping("/")
	public String getHomepage() {
		return "Welcome to your favorite bank!";
	}

	@GetMapping("/user/profilo")
	@PreAuthorize("hasRole('C')")
	public String loginUser() {
		return "Pagina cliente";
	}

	@GetMapping("/admin")
	@PreAuthorize("hasRole('D')")
	public String loginEmployee() {
		return "Pagina dipendente";
	}
	
}
