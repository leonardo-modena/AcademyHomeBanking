package com.banking.project.transactionservice.repository;


import com.banking.project.transactionservice.entity.BankAccount;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BankAccountRepository extends JpaRepository<BankAccount,Integer> {
	


}
