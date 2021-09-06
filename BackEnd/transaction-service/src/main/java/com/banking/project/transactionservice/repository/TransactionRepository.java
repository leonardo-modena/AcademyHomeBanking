package com.banking.project.transactionservice.repository;


import com.banking.project.transactionservice.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TransactionRepository extends JpaRepository <Transaction, Integer> {



    @Query(value = "select * from transactions t where t.id_account =:id ",nativeQuery = true)
    List<Transaction> findTransactionById_account(@Param("id") int id);


}
