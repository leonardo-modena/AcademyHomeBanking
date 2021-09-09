package com.banking.project.accountmanagementservice.repository;

import com.banking.project.accountmanagementservice.entity.BankAccount;
import com.banking.project.accountmanagementservice.entity.BankAccountDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BankAccountDTORepository  extends JpaRepository<BankAccountDTO, Integer> {

    @Query(value = "select b from BankAccountDTO b inner join Customer c on c=b.holder where b.account_status='INACTIVE'")
    List<BankAccountDTO> findInactive();

    @Query(value = "select b from BankAccountDTO b inner join Customer c on c=b.holder where b.account_status='CLOSING'")
    List<BankAccountDTO> findClosing();

}
