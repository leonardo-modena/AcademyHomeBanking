package com.banking.project.accountmanagementservice.controller;

import com.banking.project.accountmanagementservice.entity.BankAccount;
import com.banking.project.accountmanagementservice.entity.Customer;
import com.banking.project.accountmanagementservice.repository.BankAccountRepository;
import com.banking.project.accountmanagementservice.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;


import javax.persistence.OrderBy;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminAccountManagementServiceController {

   @Autowired
   private BankAccountRepository bankAccountRepository;

   @Autowired
   private CustomerRepository customerRepository;


    @GetMapping(value = "/listInactiveAccounts")
    public List<BankAccount> getInactive() {
        return bankAccountRepository.findInactive();
    }

    @PutMapping(value = "/activeAccount/{accountId}")
    public void activeAccount(@PathVariable int accountId) {
        bankAccountRepository.activeAccount(accountId);
    }

    @GetMapping(value = "listClosingAccounts")
    public List<BankAccount> getClosing(){
        return bankAccountRepository.findClosing();
    }

    @DeleteMapping(value = "close/{accountId}")
    public void closeAccount(@PathVariable int accountId){
        bankAccountRepository.deleteAccount(accountId);
    }


    @GetMapping(value = "/listSortedCustomer")
    public List<Customer> getListCustomerSort() {

        return customerRepository.listSortCustomer();
    }

}
