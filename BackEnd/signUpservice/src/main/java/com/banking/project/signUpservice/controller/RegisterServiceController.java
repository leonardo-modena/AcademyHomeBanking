package com.banking.project.signUpservice.controller;

import com.banking.project.signUpservice.entity.BankAccount;
import com.banking.project.signUpservice.entity.Customer;
import com.banking.project.signUpservice.repository.BankAccountRepository;
import com.banking.project.signUpservice.repository.CustomerRepository;
import org.hibernate.cfg.Environment;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@RestController

public class RegisterServiceController {

    private Logger logger = LoggerFactory.getLogger(RegisterServiceController.class);

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private BankAccountRepository bankAccountRepository;

    private Environment environment;

    @PostMapping ("/registrazione")
    public Customer registerCustomer(@RequestBody Customer theCustomer) {

        logger.info("Register Customer");

       /* if(customerRepository.findCustomerByEmail(theCustomer.getEmail())){
            throw new CustomerAlreadyExsistException("There is an account with that email address: "
                    + theCustomer.getEmail());
        }*/

        theCustomer.setId(0);
        theCustomer.setRole("ROLE_C");
        List<BankAccount> bAccount=new ArrayList<>();
        theCustomer.setBankAccounts(bAccount);

        BankAccount bankAccount = new BankAccount();
        bankAccount.setId(0);
        bankAccount.setBalance(BigDecimal.ZERO);
        bankAccount.setAccount_status("INACTIVE");
        bankAccount.setHolder(theCustomer);
        bAccount.add(bankAccount);


        customerRepository.save(theCustomer);
        bankAccountRepository.save(bankAccount);

        return theCustomer;

    }
}
