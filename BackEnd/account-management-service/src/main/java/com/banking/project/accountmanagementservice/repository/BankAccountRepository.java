package com.banking.project.accountmanagementservice.repository;

import com.banking.project.accountmanagementservice.entity.BankAccount;
import com.banking.project.accountmanagementservice.entity.BankAccountDTO;
import com.banking.project.accountmanagementservice.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

public interface BankAccountRepository extends JpaRepository<BankAccount,Integer> {

    @Query(value = "select b from BankAccount b inner join Customer c on c=b.holder where b.account_status='INACTIVE'")
    List<BankAccount> findInactive();

    @Query(value = "select b from BankAccount b inner join Customer c on c=b.holder where b.account_status='CLOSING'")
    List<BankAccount> findClosing();

	@Transactional
	@Modifying(clearAutomatically = true)
    @Query("update BankAccount b set b.account_status= 'ACTIVE' where b.id=:accountId")
    void activeAccount(@Param("accountId")int accountId);

	 /** Query che cancella l'account indicato dall'id
	 * @param accountId
	 */

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query("delete BankAccount b where b.id=:accountId and b.account_status='CLOSING'")
    void deleteAccount(@Param("accountId")int accountId);

    @Transactional 
    @Modifying(clearAutomatically = true)
    @Query("update BankAccount b set b.account_status= 'CLOSING' where b.id=:accountId")
    void closingRequest(@Param("accountId")int accountId);

    @Query("select count(b) from BankAccount b where b.holder=:customer")
    long count(@Param("customer") Customer customer);


}
