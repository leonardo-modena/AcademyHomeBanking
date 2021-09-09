package com.banking.project.accountmanagementservice.controller;

import com.banking.project.accountmanagementservice.entity.BankAccount;
import com.banking.project.accountmanagementservice.entity.BankAccountDTO;
import com.banking.project.accountmanagementservice.entity.Customer;
import com.banking.project.accountmanagementservice.repository.BankAccountDTORepository;
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

   @Autowired
   private BankAccountDTORepository bankAccountDTORepository;


    @GetMapping(value = "/listInactiveAccounts")
    public List<BankAccountDTO> getInactive() {
        return bankAccountDTORepository.findInactive();
    }

    @PutMapping(value = "/activeAccount/{accountId}")
    public void activeAccount(@PathVariable int accountId) {
        bankAccountRepository.activeAccount(accountId);
    }

    @GetMapping(value = "listClosingAccounts")
    public List<BankAccountDTO> getClosing(){
        return bankAccountDTORepository.findClosing();
    }



    @DeleteMapping(value = "close/{accountId}")
    public void closeAccount(@PathVariable int accountId) {
        BankAccount bankAccount = bankAccountRepository.getById(accountId);
        Customer customer = bankAccount.getHolder();
        if (bankAccountRepository.count(customer) == 1) {
            bankAccountRepository.deleteAccount(accountId);
            customerRepository.deleteAccount(customer);
        } else {
            bankAccountRepository.deleteAccount(accountId);
        }
    }

    @GetMapping(value = "/listSortedCustomer")
    public List<Customer> getListCustomerSort() {

        return customerRepository.listSortCustomer();
    }

}
