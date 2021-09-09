package com.banking.project.accountmanagementservice.controller;

import com.banking.project.accountmanagementservice.entity.BankAccount;
import com.banking.project.accountmanagementservice.entity.Customer;
import com.banking.project.accountmanagementservice.rabbitConfig.MQConfig;
import com.banking.project.accountmanagementservice.repository.BankAccountRepository;
import com.banking.project.accountmanagementservice.repository.CustomerRepository;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;


@Component
public class MessageListener {

    @Autowired
    BankAccountRepository bankAccountRepository;
    @Autowired
    CustomerRepository customerRepository;

    @RabbitListener(queues = MQConfig.QUEUE)
    public void listener(Customer theCustomer) {

        BankAccount bankAccount = new BankAccount();
        bankAccount.setId(0);
        bankAccount.setBalance(BigDecimal.ZERO);
        bankAccount.setAccount_status("INACTIVE");
        bankAccount.setHolder(customerRepository.getById(theCustomer.getId()));

        List<BankAccount> bAccount=new ArrayList<>();
        bAccount.add(bankAccount);
        theCustomer.setBankAccounts(bAccount);

        Customer customer=customerRepository.getById(theCustomer.getId());
        customerRepository.save(customer);

        bankAccountRepository.save(bankAccount);

        System.out.println("Message received from queue : " + theCustomer.toString());
    }
}
