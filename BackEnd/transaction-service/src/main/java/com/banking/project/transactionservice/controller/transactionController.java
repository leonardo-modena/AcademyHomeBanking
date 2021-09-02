package com.banking.project.transactionservice.controller;

import com.banking.project.transactionservice.repository.BankAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;

@RestController
@RequestMapping("/customer")
public class transactionController {

    @Autowired
    BankAccountRepository bankAccountRepository;


    @GetMapping("/balance/{bankAccountId}")
    private BigDecimal getBalance(@PathVariable int bankAccountId)
    {
        return bankAccountRepository.getById(bankAccountId).getBalance();
    }

}
