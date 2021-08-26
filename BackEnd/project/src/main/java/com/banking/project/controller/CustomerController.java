package com.banking.project.controller;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import javax.annotation.Resource;
import com.banking.project.dao.CustomerRepository;
import com.banking.project.entity.Customer;
import com.banking.project.exception.UserNotFoundException;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/home")
public class CustomerController {
	
	@Autowired
	private CustomerRepository customerRepository; 
	
	/**
	 * Metodo che ritorna la lista di dipendenti e clienti
	 */
	@GetMapping("/users")
	public List<Customer> findAll(){
		return customerRepository.findAll();
	}
	
	@GetMapping("/customers/{customerId}")
	public Optional<Customer> getCustomer(@PathVariable int customerId) {
		
		Optional<Customer> theCustomer = customerRepository.findById(customerId);
		if (theCustomer == null) {
			throw new UserNotFoundException("Cliente non trovato - " + customerId);
		}
		
		return theCustomer;
	}
	
//	// add mapping for POST /employees - add new employee
//	
//	@PostMapping("/employees")
//	public Employee addEmployee(@RequestBody Employee theEmployee) {
//		
//		// also just in case they pass an id in JSON ... set id to 0
//		// this is to force a save of new item ... instead of update
//		
//		theEmployee.setId(0);
//		
//		employeeService.save(theEmployee);
//		
//		return theEmployee;
//	}
//	
//	// add mapping for PUT /employees - update existing employee
//	
//	@PutMapping("/employees")
//	public Employee updateEmployee(@RequestBody Employee theEmployee) {
//		
//		employeeService.save(theEmployee);
//		
//		return theEmployee;
//	}
//	
//	// add mapping for DELETE /employees/{employeeId} - delete employee
//	
//	@DeleteMapping("/employees/{employeeId}")
//	public String deleteEmployee(@PathVariable int employeeId) {
//		
//		Employee tempEmployee = employeeService.findById(employeeId);
//		
//		// throw exception if null
//		
//		if (tempEmployee == null) {
//			throw new RuntimeException("Employee id not found - " + employeeId);
//		}
//		
//		employeeService.deleteById(employeeId);
//		
//		return "Deleted employee id - " + employeeId;
//	}
//	
}
