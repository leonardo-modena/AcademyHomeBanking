package com.banking.project.transactionservice.controller;

import com.banking.project.transactionservice.entity.Customer;
import com.banking.project.transactionservice.exception.NotFoundException;
import com.banking.project.transactionservice.exception.NotFoundResponse;
import com.banking.project.transactionservice.exception.ApiBankException;
import com.banking.project.transactionservice.exception.ApiBankResponse;
import com.banking.project.transactionservice.entity.BankAccount;
import com.banking.project.transactionservice.entity.Transaction;
import com.banking.project.transactionservice.repository.BankAccountRepository;
import com.banking.project.transactionservice.repository.CustomerRepository;
import com.banking.project.transactionservice.repository.TransactionRepository;

import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/bankAccount")
public class TransactionController {

	@Autowired
	BankAccountRepository bankAccountRepository;

	@Autowired
	TransactionRepository transactionRepository;

	@Autowired
	CustomerRepository customerRepository;

	@Operation(summary = "Saldo del conto", description = "Dato un conto restituisce il suo saldo", tags = "Saldo")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Ritorna il saldo", content = {
			@Content(mediaType = "application/json", schema = @Schema(implementation = BigDecimal.class)) }),
			@ApiResponse(responseCode = "404", description = "Conto non trovato", content = {
			@Content(mediaType = "application/json", schema = @Schema(implementation = NotFoundResponse.class)) })
	
	})
	@GetMapping("/balance/{bankAccountId}")
	public BigDecimal getBalance(@PathVariable int bankAccountId) {
		if (bankAccountRepository.existsById(bankAccountId)) {
			return bankAccountRepository.getById(bankAccountId).getBalance();
		} else
			throw new NotFoundException("Conto non trovato", HttpStatus.NOT_FOUND);
	}
	@Operation(summary = "Prelievo", description = "Dato un importo, una causale e un numero di conto effettua un prelievo di denaro", tags = "Prelievo")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Effettua un prelievo sul conto", content = {
			@Content(mediaType = "application/json", schema = @Schema(implementation = BankAccount.class)) }),
			@ApiResponse(responseCode = "400", description = "Disponibilità terminata", content = {
					@Content(mediaType = "application/json", schema = @Schema(implementation = ApiBankResponse.class)) }),
			@ApiResponse(responseCode = "404", description = "Conto non trovato", content = {
			@Content(mediaType = "application/json", schema = @Schema(implementation = NotFoundResponse.class)) })
	
	})
	@PostMapping("/withdrawal/{amount}/{causal}/{bankAccountId}")
	public ResponseEntity<BankAccount> withDrawal(@PathVariable String amount, @PathVariable String causal,
			@PathVariable int bankAccountId) {
		// abs impedisce che vengano gestiti numeri negativi, prendendo così sempre l'importo positivo
		BigDecimal bigDecimal = new BigDecimal(amount).abs();
		
		if (bankAccountRepository.existsById(bankAccountId)) {

			BankAccount bankAccount = bankAccountRepository.findById(bankAccountId).get();

			if (((bankAccount.getBalance().compareTo(bigDecimal) >= 0)
					&& bankAccount.getAccount_status().equals("ACTIVE"))) {

				bankAccount.setBalance(bankAccount.getBalance().subtract(bigDecimal));
				bankAccountRepository.save(bankAccount);
				saveTransaction(bigDecimal, bankAccount, 0, causal);

				return new ResponseEntity<>(bankAccount, HttpStatus.OK);
			} else {
				throw new ApiBankException("Disponibilità terminata sul conto n." + bankAccountId,
						HttpStatus.BAD_REQUEST);
			}

		} else {
			throw new NotFoundException("Conto non trovato", HttpStatus.NOT_FOUND);

		}
	}

	private void saveTransaction(BigDecimal amount, BankAccount bankAccount, int op, String causal) {

		Transaction transaction = new Transaction();
		transaction.setCausal(causal);
		transaction.setId(0);
		transaction.setAmount(amount);
		if (op == 0)
			transaction.setType("WITHDRAWAL");
		else
			transaction.setType("DEPOSIT");
		transaction.setId_account(bankAccount);
		Date date = new Date();
		transaction.setDateTransaction(date.getTime());
		transactionRepository.save(transaction);
	}
	@Operation(summary = "Deposito", description = "Dato un importo, una causale e un numero di conto effettua un deposito di denaro", tags = "Deposito")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Effettua un deposito sul conto", content = {
			@Content(mediaType = "application/json", schema = @Schema(implementation = BankAccount.class)) }),
			@ApiResponse(responseCode = "400", description = "Range di ricarica errato", content = {
					@Content(mediaType = "application/json", schema = @Schema(implementation = ApiBankResponse.class)) }),
			@ApiResponse(responseCode = "404", description = "Conto non trovato", content = {
			@Content(mediaType = "application/json", schema = @Schema(implementation = NotFoundResponse.class)) })
	
	})
	@PostMapping("/deposit/{amount}/{causal}/{bankAccountId}")
	public ResponseEntity<BankAccount> deposit(@PathVariable BigDecimal amount, @PathVariable String causal,
			@PathVariable int bankAccountId) {

		if (bankAccountRepository.existsById(bankAccountId)) {

			BankAccount bankAccount = bankAccountRepository.findById(bankAccountId).get();

			if (((amount.compareTo(BigDecimal.ZERO) > 0) && amount.compareTo(BigDecimal.valueOf(5000.00)) <= 0)
					&& bankAccount.getAccount_status().equals("ACTIVE")) {

				bankAccount.setBalance(bankAccount.getBalance().add(amount));
				bankAccountRepository.save(bankAccount);
				saveTransaction(amount, bankAccount, 1, causal);

				return new ResponseEntity<>(bankAccount, HttpStatus.OK);
			} else {
				throw new ApiBankException("L'importo deve essere tra 0.01 euro e 5000 euro", HttpStatus.BAD_REQUEST);
			}

		} else {
			throw new NotFoundException("Conto non trovato", HttpStatus.NOT_FOUND);

		}

	}
	@Operation(summary = "Transazioni per data", description = "Dato un conto, un filtro date (lastTen,lastThreeMonths,betweenTwoDates) "
			+ "e due valori interi di inizio e fine per la data ( da settare a 0 per lastTen e lastThreeMonths), "
			+ "restituisce le transazioni effettuate", tags = "Transazioni per data")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Elenco transazioni filtrate per data", content = {
			@Content(mediaType = "application/json", schema = @Schema(implementation = Transaction.class)) }),
			@ApiResponse(responseCode = "404", description = "Errore nome filtro date", content = {
			@Content(mediaType = "application/json", schema = @Schema(implementation = NotFoundResponse.class)) })
	
	})
	@GetMapping("/transactions/{idAccount}/{type}/{startDate}/{endDate}")
	public List<Transaction> getTransactionByIdAccount(@PathVariable int idAccount, @PathVariable String type,
			@PathVariable long startDate, @PathVariable long endDate) {

		switch (type) {
		case "lastTen":
			Pageable topTen = PageRequest.of(0, 10);
			return transactionRepository.findTransactionByIdAccountLastTen(idAccount, topTen);

		case "lastThreeMonths":
			long value = System.currentTimeMillis() - 7884000000l;
			return transactionRepository.findTransactionByDateTransactionLastThreeMonths(idAccount,
					System.currentTimeMillis(), value);

		case "betweenTwoDates":
			return transactionRepository.findAllByDateTransactionBetween(idAccount, startDate, endDate);

		}

		throw new NotFoundException("Errore di filtro date", HttpStatus.NOT_FOUND);

	}
	@Operation(summary = "Transazioni dell'utente", description = "Dato l'id di un utente, restituisce la lista delle transazioni effettuate su tutti i conti"
			,tags = "Transazioni per utente")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Elenco transazioni", content = {
			@Content(mediaType = "application/json", schema = @Schema(implementation = Transaction.class)) })
	})
	@GetMapping("/operation/{idCustomer}")
	public List<Transaction> getTransactionByIdCustomer(@PathVariable int idCustomer) {
		Customer customer = customerRepository.getById(idCustomer);
		return bankAccountRepository.findTransactionByIdCustomer(customer);

	}

}
