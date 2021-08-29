package com.banking.project.dao;

import com.banking.project.entity.BankAccount;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BankAccountRepository extends JpaRepository<BankAccount,Integer> {
	
	@Query(value = "select * from bank_account where account_status = 'INACTIVE'", nativeQuery = true)
    List<BankAccount> findInactive();
	
	@Query(value = "select * from bank_account where account_status = 'CLOSING'", nativeQuery = true)
    List<BankAccount> findClosing();
	
}
