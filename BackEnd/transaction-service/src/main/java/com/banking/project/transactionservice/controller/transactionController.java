package com.banking.project.transactionservice.controller;

import com.banking.project.transactionservice.entity.BankAccount;
import com.banking.project.transactionservice.entity.Transaction;
import com.banking.project.transactionservice.repository.BankAccountRepository;
import com.banking.project.transactionservice.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Optional;

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

        if(bankAccountRepository.existsById(bankAccountId)){

           BankAccount bankAccount=bankAccountRepository.getById(bankAccountId);

            if(((bankAccount.getBalance().compareTo(amount)>=0) && bankAccount.getAccount_status().equals("ACTIVE"))){

                bankAccount.setBalance(bankAccount.getBalance().subtract(amount));
                bankAccountRepository.save(bankAccount);
                saveTransaction(amount,bankAccount);

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


    private void saveTransaction(BigDecimal amount,BankAccount bankAccount){

        Transaction transaction=new Transaction();

        transaction.setId(0);
        transaction.setAmount(amount);
        transaction.setType("WITHDRAWAL");
       transaction.setId_account(bankAccount);
        Date date=new Date();
        transaction.setDateTransaction(date);
        transactionRepository.save(transaction);

    }


    @GetMapping("/transactions/{id}")
    public List<Transaction> getTransaction(@PathVariable int id){
        return transactionRepository.findTransactionById_account(id);

    }

}
