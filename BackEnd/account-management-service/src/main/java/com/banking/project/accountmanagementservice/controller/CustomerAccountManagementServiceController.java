package com.banking.project.accountmanagementservice.controller;

import java.math.BigDecimal;
import java.util.Optional;

import com.banking.project.accountmanagementservice.entity.Customer;
import com.banking.project.accountmanagementservice.entity.CustomerDTO;
import com.banking.project.accountmanagementservice.rabbitConfig.MQConfig;
import com.banking.project.accountmanagementservice.repository.CustomerRepository;
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


	@PutMapping(value = "/closingRequest/{accountId}")
	public void closingAccount(@PathVariable int accountId) {
		String message="Closing request from "+accountId;
		template.convertAndSend(MQConfig.EXCHANGE, MQConfig.ROUTING_KEY,message);
		bankAccountRepository.closingRequest(accountId);

	}

	/**
	 * Metodo per recuperare le informazioni di un cliente dato 'id
	 *
	 * @param
	 * @return
	 */

	@GetMapping("/profile/{customerId}")
	public CustomerDTO getCustomer(@PathVariable int customerId) {

	Customer customer= customerRepository.getById(customerId);
		CustomerDTO customerDTO=new CustomerDTO();

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

	@GetMapping("/profile/bankAccount/{myBankAccount}")
	public Optional<BankAccount> getMyBankAccount(@PathVariable int myBankAccount) {

		Optional<BankAccount> theBankAccount = bankAccountRepository.findById(myBankAccount);

		return theBankAccount;
	}

	/**
	 * Metodo che, dato un id conto e l'importo della ricarica da effettuare, permette di creare un secondo conto
	 * @param id
	 * @param balance
	 * @return
	 */
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

				throw new ApiBankException("Disponibilità terminata sul conto n."+id,HttpStatus.BAD_REQUEST);
			}

		} else {

			throw new NotFoundException("Conto non trovato", HttpStatus.NOT_ACCEPTABLE);
		}

		return new ResponseEntity<>(newBankAccount,HttpStatus.OK);
	}

}
