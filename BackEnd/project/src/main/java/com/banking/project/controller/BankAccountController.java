package com.banking.project.controller;

import com.banking.project.dao.BankAccountRepository;
import com.banking.project.dao.CustomerRepository;
import com.banking.project.dao.MyUserDetails;
import com.banking.project.dao.UserDetailsServiceImpl;
import com.banking.project.entity.BankAccount;
import com.banking.project.entity.Customer;
import com.banking.project.exception.UserNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/home/bankAccount")
public class BankAccountController {
	@Autowired
	private BankAccountRepository bankAccountRepository;

	/**
	 * Metodo che ritorna la lista di conti associati ai clienti
	 */
	@GetMapping("/accounts")
	public List<BankAccount> findAll() {
		return bankAccountRepository
				.findAll();
	}

	@PostMapping("/newBankAccount")
	public BankAccount newAccount(@RequestBody BankAccount bankAccount){
		bankAccount.setId(0);
		
		bankAccountRepository.save(bankAccount);

		return bankAccount;
	}


	/**
	 * Metodo che ritorna i dati del singolo conto corrente richiesto da parametro
	 * 
	 * @param myBankAccount
	 * @return
	 */
	@GetMapping("/myAccount/{myBankAccount}")
	public Optional<BankAccount> getMyBankAccount(@PathVariable int myBankAccount) {

		Optional<BankAccount> theBankAccount = bankAccountRepository.findById(myBankAccount);
		if (theBankAccount == null) {
			throw new UserNotFoundException("Conto non trovato - " + myBankAccount);
		}

		return theBankAccount;
	}
	//aggiungere metodo cancellazione del conto

	/**
	 * Metodo che ritorna tutti gli account inattivi
	 * 
	 * @return lista conti corrente che il dipendente dovrà attivare
	 */
	@GetMapping(value = "/accounts/inactive")
	public List<BankAccount> getInactive() {
		return bankAccountRepository.findInactive();
	}

	/**
	 * Metodo che ritorna tutti gli account che devono essere disattivati dal
	 * dipendente
	 * 
	 * @return lista conti corrente per cui è stata chiesta la chiusura
	 */
	@GetMapping(value = "/accounts/closing")
	public List<BankAccount> getClosing() {
		return bankAccountRepository.findClosing();
	}
}
