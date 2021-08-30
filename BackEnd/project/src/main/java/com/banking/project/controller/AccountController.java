package com.banking.project.controller;

import com.banking.project.dao.MyUserDetails;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class AccountController {
	
	@GetMapping("/")
	public String getHomepage() {
		return "Welcome to your favorite bank!";
	}

	@GetMapping("/user/profilo")
	public MyUserDetails loginUser(@AuthenticationPrincipal MyUserDetails user) {
		return user;
	}

	@GetMapping("/admin")
	public MyUserDetails loginEmployee(@AuthenticationPrincipal MyUserDetails user) {
		return user;
	}

}
