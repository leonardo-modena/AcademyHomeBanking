package com.banking.project.accountmanagementservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.banking.project.accountmanagementservice.entity.BankAccount;
import com.banking.project.accountmanagementservice.repository.BankAccountRepository;
import com.banking.project.accountmanagementservice.repository.CustomerRepository;

@RestController
@RequestMapping("/customer")
public class CustomerAccountManagementServiceController{
	@Autowired
	private BankAccountRepository bankAccountRepository;
	
	@Autowired
	private CustomerRepository customerRepository;

	/**
	 * Metodo che richiede la chiusura dell'account da parte dell'utente, setta lo stato a "CLOSING"
	 * @param accountId
	 */
	
	@PutMapping(value = "/closingRequest/{accountId}")
	public void activeAccount(@PathVariable int accountId) {
		bankAccountRepository.closingRequest(accountId);
	}
	/**
	 * Metodo per aprire un secondo conto
	 * @param bankAccount
	 * @return
	 */
	
	// da terminare
	@PostMapping("/new")
	public BankAccount newAccount(@RequestBody BankAccount bankAccount){
		
		
		bankAccount.setId(0);
		
		bankAccountRepository.save(bankAccount);

		return bankAccount;
	}

}



