package com.banking.project.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.banking.project.dao.CustomerRepository;
import com.banking.project.entity.Customer;

@RestController
@RequestMapping("/prova")
public class CustomerController {
	
	private CustomerRepository customerRepository; 
	
	@GetMapping("/customers")
	public List<Customer>customers(){
		return customerRepository.findAll();
	}
}