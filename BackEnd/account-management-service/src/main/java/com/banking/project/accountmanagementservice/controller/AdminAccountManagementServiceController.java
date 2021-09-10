package com.banking.project.accountmanagementservice.controller;

import com.banking.project.accountmanagementservice.entity.BankAccount;
import com.banking.project.accountmanagementservice.entity.BankAccountDTO;
import com.banking.project.accountmanagementservice.entity.Customer;
import com.banking.project.accountmanagementservice.repository.BankAccountRepository;
import com.banking.project.accountmanagementservice.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    public List<BankAccountDTO> getInactive() {
        List<BankAccount> bankAccounts=bankAccountRepository.findInactive();
        List<BankAccountDTO> bankAccountDTOS=new ArrayList<>();
        BankAccountDTO bankAccountDTO=new BankAccountDTO();
        for(BankAccount i:bankAccounts ){
            bankAccountDTO.setId(i.getId());
            bankAccountDTO.setBalance(i.getBalance());
            bankAccountDTO.setAccount_status(i.getAccount_status());
            bankAccountDTO.setHolder(i.getHolder());
            bankAccountDTOS.add(bankAccountDTO);
        }
        return bankAccountDTOS;
    }

    @PutMapping(value = "/activeAccount/{accountId}")
    public void activeAccount(@PathVariable int accountId) {
        bankAccountRepository.activeAccount(accountId);
    }

    @GetMapping(value = "/listClosingAccounts")
    public List<BankAccountDTO> getClosing(){

        List<BankAccount> bankAccounts=bankAccountRepository.findClosing();
        List<BankAccountDTO>  bankAccount_DTOS=new ArrayList<>();
        BankAccountDTO bankAccountDTO=new BankAccountDTO();

        for(BankAccount i:bankAccounts ){
            bankAccountDTO.setId(i.getId());
            bankAccountDTO.setBalance(i.getBalance());
            bankAccountDTO.setAccount_status(i.getAccount_status());
            bankAccountDTO.setHolder(i.getHolder());
            bankAccount_DTOS.add(bankAccountDTO);
        }
        return bankAccount_DTOS;
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
