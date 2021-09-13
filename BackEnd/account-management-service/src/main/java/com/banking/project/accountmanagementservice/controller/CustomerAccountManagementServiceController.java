package com.banking.project.accountmanagementservice.controller;

import java.math.BigDecimal;
import java.util.Optional;

import com.banking.project.accountmanagementservice.entity.Customer;
import com.banking.project.accountmanagementservice.entity.CustomerDTO;
import com.banking.project.accountmanagementservice.exception.NotFoundResponse;
import com.banking.project.accountmanagementservice.rabbitConfig.MQConfig;
import com.banking.project.accountmanagementservice.repository.CustomerRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.banking.project.accountmanagementservice.entity.BankAccount;
import com.banking.project.accountmanagementservice.exception.ApiBankException;
import com.banking.project.accountmanagementservice.exception.NotFoundException;
import com.banking.project.accountmanagementservice.repository.BankAccountRepository;

@RestController
@RequestMapping("/customer")
public class CustomerAccountManagementServiceController {
	@Autowired
	private BankAccountRepository bankAccountRepository;

	@Autowired

	private CustomerRepository customerRepository;


	@Autowired
	private RabbitTemplate template;
	/**
	 * Metodo che richiede la chiusura del conto da parte dell'utente, setta lo
	 * stato a "CLOSING"
	 *
	 * @param accountId
	 */


	@Operation(summary="Richiesta di chiusura conto", description="Invio  richiesta di chiusura del conto alla sede amministrativa")
	@ApiResponses(value= {
			@ApiResponse(responseCode= "200", description = "Id valido, stato conto in chiusura "),
			@ApiResponse(responseCode="404", description = "Id conto non valido",content = {
							@Content(mediaType = "application/json", schema = @Schema(implementation = NotFoundResponse.class)) }),
	})

	@PutMapping(value = "/closingRequest/{accountId}")
	public void closingAccount(@PathVariable int accountId) {
		if(bankAccountRepository.existsById(accountId)) {
			bankAccountRepository.closingRequest(accountId);
		}
		else
			throw new NotFoundException("Conto non trovato", HttpStatus.NOT_FOUND);
	}

	/**
	 * Metodo per recuperare le informazioni di un cliente dato 'id
	 *
	 * @param
	 * @return
	 */
	@Operation(summary = "Profilo utente", description = "Dato un id Correntista restituisce il suo profile")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Ritorna il saldo", content = {
			@Content(mediaType = "application/json", schema = @Schema(implementation = CustomerDTO.class)) }),
			@ApiResponse(responseCode = "404", description = "Id Correntista non trovato", content = {
					@Content(mediaType = "application/json", schema = @Schema(implementation = NotFoundResponse.class)) })

	})
	@GetMapping("/profile/{customerId}")
	public CustomerDTO getCustomer(@PathVariable int customerId) {

		if(customerRepository.existsById(customerId)) {
			Customer customer = customerRepository.getById(customerId);
			CustomerDTO customerDTO = new CustomerDTO();

			customerDTO.setId(customer.getId());
			customerDTO.setFirstName(customer.getFirstName());
			customerDTO.setLastName(customer.getLastName());
			customerDTO.setEmail(customer.getEmail());
			customerDTO.setDateOfBirth(customer.getDateOfBirth());
			customerDTO.setGender(customer.getGender());
			customerDTO.setRole(customer.getRole());
			customerDTO.setDateOfBirth(customer.getDateOfBirth());
			customerDTO.setBankAccounts(customer.getBankAccounts());
			return customerDTO;
		}
		else
			throw new NotFoundException("Conto non trovato", HttpStatus.NOT_FOUND);

	}



	@Operation(summary = "Dettaglio conto ", description = "Dato un id conto, va a restituire i dettaglio del conto ")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Ritorna il conto", content = {
			@Content(mediaType = "application/json", schema = @Schema(implementation = BankAccount.class)) }),
			@ApiResponse(responseCode = "404", description = "Id conto non trovato", content = {
					@Content(mediaType = "application/json", schema = @Schema(implementation = NotFoundResponse.class)) })

	})
	@GetMapping("/profile/bankAccount/{myBankAccountId}")
	public Optional<BankAccount> getMyBankAccount(@PathVariable int myBankAccountId) {

		if(bankAccountRepository.existsById(myBankAccountId)) {
			Optional<BankAccount> theBankAccount = bankAccountRepository.findById(myBankAccountId);

			return theBankAccount;
		}
		else
			throw new NotFoundException("Conto non trovato", HttpStatus.NOT_FOUND);
	}

	/**
	 * Metodo che, dato un id conto e l'importo della ricarica da effettuare, permette di creare un secondo conto
	 * @param id
	 * @param balance
	 * @return
	 */

	@Operation(summary = "Apertura nuovo conto ", description = "Dato  id conto appartenente allo stesso correntista e un " +
			"importo che sia valido va a restituire un nuovo conto ")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Ritorna il conto", content = {
			@Content(mediaType = "application/json", schema = @Schema(implementation = BankAccount.class)) }),
			@ApiResponse(responseCode = "404", description = "Id conto non trovato", content = {
					@Content(mediaType = "application/json", schema = @Schema(implementation = NotFoundResponse.class)) })

	})
	@PostMapping("/new/{id}/{balance}")
	public ResponseEntity<BankAccount> newAccount(@PathVariable int id, @PathVariable BigDecimal balance) {

		BankAccount newBankAccount = new BankAccount();

		if (bankAccountRepository.existsById(id)) {

			BankAccount bankAccount = bankAccountRepository.getById(id);
			BigDecimal balanceOld=bankAccount.getBalance();
			if (((balanceOld.compareTo(balance))>=0) && bankAccount.getAccount_status().equals("ACTIVE")) {

				BigDecimal newOldBalance = bankAccount.getBalance().subtract(balance);

				bankAccount.setBalance(newOldBalance);

				newBankAccount.setId(0);

				newBankAccount.setBalance(balance);

				newBankAccount.setAccount_status("ACTIVE");

				newBankAccount.setHolder(bankAccount.getHolder());

				bankAccountRepository.save(newBankAccount);
				
			} else {

				throw new ApiBankException("Disponibilità terminata o conto non attivo sul conto n."+id,HttpStatus.BAD_REQUEST);
			}

		} else {

			throw new NotFoundException("Conto non trovato", HttpStatus.NOT_FOUND);
		}

		return new ResponseEntity<>(newBankAccount,HttpStatus.OK);
	}

}
