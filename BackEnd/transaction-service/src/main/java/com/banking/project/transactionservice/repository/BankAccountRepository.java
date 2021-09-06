package com.banking.project.transactionservice.repository;


import com.banking.project.transactionservice.entity.BankAccount;
import com.banking.project.transactionservice.entity.Customer;
import com.banking.project.transactionservice.entity.Transaction;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BankAccountRepository extends JpaRepository<BankAccount,Integer> {
	
	@Query(value = "select b.transactions from BankAccount b where b.id=:idAccount")
    List<Transaction> findTransactionByidAccount(@Param("idAccount") int idAccount);


    @Query(value = "select b.transactions from BankAccount b where b.holder=:customer ")
    List<Transaction> findTransactionByIdCustomer(Customer customer);



}
