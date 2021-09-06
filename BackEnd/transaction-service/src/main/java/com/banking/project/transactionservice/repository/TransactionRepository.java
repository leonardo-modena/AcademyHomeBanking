package com.banking.project.transactionservice.repository;


import com.banking.project.transactionservice.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import org.springframework.data.domain.Pageable;
import java.util.List;

public interface TransactionRepository extends JpaRepository <Transaction, Integer> {

    @Query(value = "select t from Transaction t where t.idAccount.id=:idAccount order by t.dateTransaction DESC ")
    List<Transaction> findTransactionByIdAccountLastTen(@Param("idAccount") int idAccount, Pageable pageable);


    @Query(value = "select t from Transaction t where t.idAccount.id=:idAccount and t.dateTransaction  BETWEEN :value2 AND :value1 order by t.dateTransaction DESC ")
    List<Transaction> findAllByDateTransactionBetween(@Param("idAccount") int idAccount, long value1, long value2);


}