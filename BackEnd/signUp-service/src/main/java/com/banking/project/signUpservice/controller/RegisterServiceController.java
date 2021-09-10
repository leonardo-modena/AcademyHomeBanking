package com.banking.project.signUpservice.controller;

import com.banking.project.signUpservice.entity.Customer;
import com.banking.project.signUpservice.exception.CustomerAlreadyExistException;
import com.banking.project.signUpservice.rabbitConfig.MQConfig;
import com.banking.project.signUpservice.repository.BankAccountRepository;
import com.banking.project.signUpservice.repository.CustomerRepository;
import org.hibernate.cfg.Environment;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/signup")
public class RegisterServiceController {

	private Logger logger = LoggerFactory.getLogger(RegisterServiceController.class);

	@Autowired
	private RabbitTemplate template;

	@Autowired
	private CustomerRepository customerRepository;

	@PostMapping("")
	public Customer registerCustomer(@RequestBody Customer theCustomer) {

		logger.info("Register Customer");
		
		try {
		
		Customer user = customerRepository.getCustomerByEmail(theCustomer.getEmail());
		
		}catch(CustomerAlreadyExistException e) {
			//e.getMessage("Esiste già un account con quest'email");
		}

//		if((user.getEmail()==theCustomer.getEmail())){ 
//			throw new CustomerAlreadyExistException("Esiste già un account con quest'email: " + theCustomer.getEmail()); 
//			}
		
		theCustomer.setRole("ROLE_C");
		customerRepository.save(theCustomer);

		template.convertAndSend(MQConfig.EXCHANGE, MQConfig.ROUTING_KEY,
				customerRepository.getCustomerByEmail(theCustomer.getEmail()));
		return theCustomer;

	}
}
