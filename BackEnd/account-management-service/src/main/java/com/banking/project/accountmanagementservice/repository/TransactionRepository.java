package com.banking.project.accountmanagementservice.repository;

import com.banking.project.accountmanagementservice.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Transaction, Integer> {
	
}