package com.banking.project.transactionservice.repository;

import com.banking.project.transactionservice.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import org.springframework.data.domain.Pageable;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Integer> {
	/**
	 * Query che restituisce una lista di 10 transazioni relative al conto (dalla
	 * più recente)
	 * 
	 * @param idAccount
	 * @param pageable
	 */
	@Query(value = "select t from Transaction t where t.idAccount.id=:idAccount order by t.dateTransaction DESC ")
	List<Transaction> findTransactionByIdAccountLastTen(@Param("idAccount") int idAccount, Pageable pageable);

	/**
	 * Query che restituisce una lista di transazioni effettuate negli ultimi tre
	 * mesi
	 * 
	 * @param idAccount
	 * @param value1
	 * @param value2
	 */
	@Query(value = "select t from Transaction t where t.idAccount.id=:idAccount and t.dateTransaction  BETWEEN :value2 AND :value1 order by t.dateTransaction DESC ")
	List<Transaction> findTransactionByDateTransactionLastThreeMonths(@Param("idAccount") int idAccount, long value1,
			long value2);

	/**
	 * Query che restituisce una lista di transazioni effettuate in un periodo
	 * scelto dall'utente
	 * 
	 * @param idAccount
	 * @param value1
	 * @param value2
	 */
	@Query(value = "select t from Transaction t where t.idAccount.id=:idAccount and t.dateTransaction  BETWEEN :value1 AND :value2 order by t.dateTransaction DESC ")
	List<Transaction> findAllByDateTransactionBetween(@Param("idAccount") int idAccount, long value1, long value2);

}