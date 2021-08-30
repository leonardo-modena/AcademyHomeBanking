package com.banking.project.controller;

import com.banking.project.dao.MyUserDetails;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/account")
public class AccountController {
	
	@GetMapping
	public String get() {
		return "<h1>Welcome to your page</h1>";
	}

	@GetMapping("/detail")
	public MyUserDetails test(@AuthenticationPrincipal MyUserDetails user) {
		return user;
	}
}
