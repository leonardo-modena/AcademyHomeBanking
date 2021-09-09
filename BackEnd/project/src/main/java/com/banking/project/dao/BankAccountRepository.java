package com.banking.project.dao;

import com.banking.project.entity.BankAccount;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;

public interface BankAccountRepository extends JpaRepository<BankAccount,Integer> {
	
	@Query(value = "select * from bank_account where account_status = 'INACTIVE'", nativeQuery = true)
    List<BankAccount> findInactive();
	
	@Query(value = "select * from bank_account where account_status = 'CLOSING'", nativeQuery = true)
    List<BankAccount> findClosing();

	@Transactional
	@Modifying(clearAutomatically = true)
    @Query("update BankAccount b set b.account_status= 'ACTIVE' where b.id=:accountId")
    void activeAccount(@Param("accountId")int accountId);

}
