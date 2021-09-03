package com.banking.project.transactionservice.repository;


import com.banking.project.transactionservice.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository <Transaction, Integer> {


}
