package com.banking.project.controller;


import com.banking.project.dao.BankAccountRepository;
import com.banking.project.dao.CustomerRepository;
import com.banking.project.entity.BankAccount;
import com.banking.project.entity.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/home/bankAccount")
public class BankAccountController {
    @Autowired
    private BankAccountRepository bankAccountRepository;

    /**
     * Metodo che ritorna la lista di dipendenti e clienti
     */
    @GetMapping("/accounts")
    public List<BankAccount> findAll() {
        return bankAccountRepository.findAll();
    }


}
