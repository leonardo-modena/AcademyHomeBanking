package com.banking.project.accountmanagementservice.repository;

import com.banking.project.accountmanagementservice.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {

	/**
	 * Query che restituisce una lista di utenti in base al ruolo
	 * 
	 * @param role
	 * @return lista di utenti in base al ruolo indicato
	 */
	@Query(value = "select * from users where role = 'ROLE_C'", nativeQuery = true)
	List<Customer> findAllCustumer();


	/**
	 * Query che restituisce l'utente la cui email è quella indicata da parametro
	 * 
	 * @param email
	 * @return utente con la email indicata
	 */
	@Query(value = "select * from users where email= :email", nativeQuery = true)
	Customer getUserByEmail(@Param("email") String email);

}
