package com.banking.project.dao;

import com.banking.project.entity.BankAccount;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BankAccountRepository extends JpaRepository<BankAccount,Integer> {
	
	@Query(value = "select * from bank_account where account_status = 'INACTIVE'", nativeQuery = true)
    List<BankAccount> findInactive();
	
	@Query(value = "select * from bank_account where account_status = 'CLOSING'", nativeQuery = true)
    List<BankAccount> findClosing();
	@Query(value = "INSERT INTO bank_account (balance, account_status, holder) values (0.0,'INACTIVE',?#{holder})",
            nativeQuery = true)
    BankAccount insertFirstAccount(@Param("holder") int holder);
}
