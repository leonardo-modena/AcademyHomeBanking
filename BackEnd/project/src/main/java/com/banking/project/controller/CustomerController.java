package com.banking.project.controller;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.banking.project.dao.BankAccountRepository;
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
import com.banking.project.entity.BankAccount;
import com.banking.project.entity.Customer;
import com.banking.project.exception.UserNotFoundException;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class CustomerController {

	@Autowired
	private CustomerRepository customerRepository;

	@Autowired
	private BankAccountRepository bankAccountRepository;



	/**
	 * Metodo che ritorna la lista di dipendenti e clienti
	 */
	@GetMapping("/users")
	public List<Customer> findAll() {
		return customerRepository.findAll();
	}

	/**
	 * Metodo che fornisce un utente indicando l'id
	 */
	@GetMapping("/users/{customerId}")
	public Optional<Customer> getCustomer(@PathVariable int customerId) {

		Optional<Customer> theCustomer = customerRepository.findById(customerId);
		if (theCustomer == null) {
			throw new UserNotFoundException("Cliente non trovato - " + customerId);
		}

		return theCustomer;
	}

	/**
	 * Registrazione di un nuovo utente e del suo nuovo conto
	 */
	@PostMapping("/registrazione")
	public Customer addCustomer(@RequestBody Customer theCustomer) {

		theCustomer.setId(0);
		List<BankAccount> bAccount=new ArrayList<>();
		BankAccount bankAccount = new BankAccount();
		bankAccount.setId(0);
		bankAccount.setBalance(new BigDecimal(0.0));
		bankAccount.setAccount_status("INACTIVE");
		bankAccount.setHolder(theCustomer);
		bAccount.add(bankAccount);
		
		theCustomer.setBankAccounts(bAccount);
		customerRepository.save(theCustomer);
		bankAccountRepository.save(bankAccount);
		
		
		return theCustomer;
	}

	/**
	 * Cancella un utente dato un id
	 */
	@DeleteMapping("/deletions/{customerId}")
	public String deleteEmployee(@PathVariable int customerId) {
		Optional<Customer> theCustomer = customerRepository.findById(customerId);
		if (theCustomer == null) {
			throw new UserNotFoundException("Cliente non trovato - " + customerId);
		}
		customerRepository.deleteById(customerId);

		return "Cliente con id: " + customerId + " rimosso";
	}
	/**
	 * Ritorna la lista di correntisti
	 * @return
	 */
	@GetMapping(value = "/users/role")
	public List<Customer> getUsersByRole(){
		return customerRepository.findAllByRolename("ROLE_C");
	}

}
