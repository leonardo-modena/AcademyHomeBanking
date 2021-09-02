package com.banking.project.accountmanagementservice.repository;

import com.banking.project.accountmanagementservice.entity.BankAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

public interface BankAccountRepository extends JpaRepository<BankAccount,Integer> {
	
	@Query(value = "select * from  bank_account b where b.account_status = 'INACTIVE'",nativeQuery = true)
    List<BankAccount> findInactive();
	
	@Query(value = "select * from bank_account where account_status = 'CLOSING'", nativeQuery = true)
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

}
