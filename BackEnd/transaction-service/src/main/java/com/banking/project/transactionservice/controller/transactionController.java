package com.banking.project.transactionservice.controller;

import com.banking.project.transactionservice.entity.BankAccount;
import com.banking.project.transactionservice.entity.Transaction;
import com.banking.project.transactionservice.repository.BankAccountRepository;
import com.banking.project.transactionservice.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/customer")
public class transactionController {

    @Autowired
    BankAccountRepository bankAccountRepository;

    @Autowired
    TransactionRepository transactionRepository;


    @GetMapping("/balance/{bankAccountId}")
    public BigDecimal getBalance(@PathVariable int bankAccountId)
    {
        return bankAccountRepository.getById(bankAccountId).getBalance();
    }

    @GetMapping("/prova/{id}")
    public BankAccount getBankAccount(@PathVariable int id){
        return bankAccountRepository.getById(id);
    }
    @PostMapping("/withdrawal/{amount}/{bankAccountId}")
    public  Boolean withDrawal( @PathVariable BigDecimal amount,@PathVariable int bankAccountId){

        BankAccount bankAccount=new BankAccount();
        if(bankAccountRepository.existsById(bankAccountId)){

            bankAccount=bankAccountRepository.getById(bankAccountId);

            if((bankAccount.getBalance().compareTo(amount)>=0 && bankAccount.getAccount_status().equals("ACTIVE"))){

                bankAccount.setBalance(bankAccount.getBalance().subtract(amount));
                return true;
            }
            else{
               return false;
            }

        }
        else {

            return false;
        }
    }





    @GetMapping("/transactions")
    public List<Transaction> getTransaction(){

        return transactionRepository.findAll();
    }

}
