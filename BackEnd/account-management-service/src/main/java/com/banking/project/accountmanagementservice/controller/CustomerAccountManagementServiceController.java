package com.banking.project.accountmanagementservice.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.banking.project.accountmanagementservice.entity.BankAccount;
import com.banking.project.accountmanagementservice.entity.Customer;
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
	public void closingAccount(@PathVariable int accountId) {
		bankAccountRepository.closingRequest(accountId);
	}
	/**
	 * Metodo per aprire un secondo conto
	 * @param bankAccount
	 * @return
	 */
	
	@GetMapping("/profile/{customerId}")
	public Optional <Customer> getCustomer(@PathVariable int customerId) {

		
		 return customerRepository.findById(customerId);
		
		
	}
	
	@GetMapping("/profile/bankAccount/{myBankAccount}")
	public Optional<BankAccount> getMyBankAccount(@PathVariable int myBankAccount) {

		Optional<BankAccount> theBankAccount = bankAccountRepository.findById(myBankAccount);

		return theBankAccount;
	}
	
	
	// da terminare
	@PostMapping("/new")
	public BankAccount newAccount(@RequestBody BankAccount bankAccount){
		
		if((bankAccount.getHolder().getBankAccounts().size()==1){
			
			int idFirstBankAccount = bankAccount.getHolder().getBankAccounts().get(0);
			
			bankAccountRepository.findById(idFirstBankAccount);
		}
		
		bankAccount.setId(0);
		
		bankAccountRepository.save(bankAccount);

		return bankAccount;
	}

}
