package com.banking.project.transactionservice.controller;

import com.banking.project.transactionservice.entity.Customer;
import com.banking.project.transactionservice.exception.NotFoundException;
import com.banking.project.transactionservice.exception.ApiBankException;
import com.banking.project.transactionservice.entity.BankAccount;
import com.banking.project.transactionservice.entity.Transaction;
import com.banking.project.transactionservice.repository.BankAccountRepository;
import com.banking.project.transactionservice.repository.CustomerRepository;
import com.banking.project.transactionservice.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;


@RestController
@RequestMapping("/customer")
public class transactionController {

	@Autowired
	BankAccountRepository bankAccountRepository;

	@Autowired
	TransactionRepository transactionRepository;

	@Autowired
	CustomerRepository customerRepository;

	@GetMapping("/balance/{bankAccountId}")
	public BigDecimal getBalance(@PathVariable int bankAccountId) {
		return bankAccountRepository.getById(bankAccountId).getBalance();
	}

	@GetMapping("/prova/{id}")
	public BankAccount getBankAccount(@PathVariable int id) {
		return bankAccountRepository.getById(id);
	}

	@PostMapping("/withdrawal/{amount}/{bankAccountId}")
	public ResponseEntity<BankAccount> withDrawal(@PathVariable BigDecimal amount, @PathVariable int bankAccountId) {

		if (bankAccountRepository.existsById(bankAccountId)) {

			BankAccount bankAccount = bankAccountRepository.findById(bankAccountId).get();

			if (((bankAccount.getBalance().compareTo(amount) >= 0)
					&& bankAccount.getAccount_status().equals("ACTIVE"))) {

				bankAccount.setBalance(bankAccount.getBalance().subtract(amount));
				bankAccountRepository.save(bankAccount);
				saveTransaction(amount, bankAccount,0);

				return new ResponseEntity<>(bankAccount, HttpStatus.OK);
			} else {
				throw new ApiBankException("Disponibilità terminata sul conto n." + bankAccountId,
						HttpStatus.BAD_REQUEST);
			}

		} else {
			throw new NotFoundException("Conto non trovato", HttpStatus.NOT_FOUND);

		}
	}

	private void saveTransaction(BigDecimal amount, BankAccount bankAccount, int op) {

		Transaction transaction = new Transaction();

		transaction.setId(0);
		transaction.setAmount(amount);
		if(op==0)
		transaction.setType("WITHDRAWAL");
		else
		transaction.setType("DEPOSIT");
		transaction.setId_account(bankAccount);
		Date date = new Date();
		transaction.setDateTransaction(date.getTime());
		transactionRepository.save(transaction);
	}

	@PostMapping("/deposit/{amount}/{bankAccountId}")
	public ResponseEntity<BankAccount> deposit(@PathVariable BigDecimal amount, @PathVariable int bankAccountId) {

		if (bankAccountRepository.existsById(bankAccountId)) {

			BankAccount bankAccount = bankAccountRepository.findById(bankAccountId).get();

			if (((amount.compareTo(BigDecimal.ZERO) > 0) && amount.compareTo(BigDecimal.valueOf(5000.00)) <= 0)
					&& bankAccount.getAccount_status().equals("ACTIVE")) {

				bankAccount.setBalance(bankAccount.getBalance().add(amount));
				bankAccountRepository.save(bankAccount);
				saveTransaction(amount, bankAccount,1);

				return new ResponseEntity<>(bankAccount, HttpStatus.OK);
			} else {
				throw new ApiBankException("Limite massimo di ricarica 5000 euro", HttpStatus.BAD_REQUEST);
			}

		} else {
			throw new NotFoundException("Conto non trovato", HttpStatus.NOT_FOUND);

		}

	}

	@GetMapping("/transactions/{idAccount}")
	public List<Transaction> getTransactionByIdAccount(@PathVariable int idAccount) {
		return bankAccountRepository.findTransactionByidAccount(idAccount);

	}

	@GetMapping("/operation/{idCustomer}")
	public List<Transaction> getTransactionByIdCustomer(@PathVariable int idCustomer) {
		Customer customer=customerRepository.getById(idCustomer);
		return bankAccountRepository.findTransactionByIdCustomer(customer);

	}



}
