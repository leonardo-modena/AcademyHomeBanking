package com.banking.project.accountmanagementservice.controller;

import java.math.BigDecimal;
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
public class CustomerAccountManagementServiceController {
	@Autowired
	private BankAccountRepository bankAccountRepository;

	@Autowired
	private CustomerRepository customerRepository;

	/**
	 * Metodo che richiede la chiusura dell'account da parte dell'utente, setta lo
	 * stato a "CLOSING"
	 *
	 * @param accountId
	 */

	@PutMapping(value = "/closingRequest/{accountId}")
	public void closingAccount(@PathVariable int accountId) {
		bankAccountRepository.closingRequest(accountId);
	}

	/**
	 * Metodo per recuperare le informazioni di un conto con l'id
	 *
	 * @param
	 * @return
	 */

	@GetMapping("/profile/{customerId}")
	public Optional<Customer> getCustomer(@PathVariable int customerId) {

		return customerRepository.findById(customerId);

	}

	@GetMapping("/profile/bankAccount/{myBankAccount}")
	public Optional<BankAccount> getMyBankAccount(@PathVariable int myBankAccount) {

		Optional<BankAccount> theBankAccount = bankAccountRepository.findById(myBankAccount);

		return theBankAccount;
	}

	// da terminare
	@PostMapping("/new/{id}/{balance}")
	public String newAccount(@PathVariable int id, @PathVariable BigDecimal balance) {

		BankAccount newBankAccount = new BankAccount();

		if (bankAccountRepository.existsById(id)) {

			BankAccount bankAccount = bankAccountRepository.getById(id);
			BigDecimal balanceOld=bankAccount.getBalance();
			if (((balanceOld.compareTo(balance))>=0) && bankAccount.getAccount_status() == "ACTIVE") {

				BigDecimal newOldBalance = bankAccount.getBalance().subtract(balance);

				bankAccount.setBalance(newOldBalance);

				newBankAccount.setId(0);

				newBankAccount.setBalance(balance);

				newBankAccount.setAccount_status("ACTIVE");

				newBankAccount.setHolder(bankAccount.getHolder());

				bankAccountRepository.save(newBankAccount);
			} else {

				return "Operazione negata";
			}

		} else {

			return "Conto non trovato";
		}

		return "Creazione nuovo conto";
	}

}
