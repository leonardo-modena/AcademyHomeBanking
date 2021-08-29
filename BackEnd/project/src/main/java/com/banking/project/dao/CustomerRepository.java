package com.banking.project.dao;

import com.banking.project.entity.Customer;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {

	/**
	 * Query che restituisce una lista di utenti in base al ruolo
	 * 
	 * @param role
	 * @return lista di utenti in base al ruolo indicato
	 */
	@Query(value = "select * from users where role = :role", nativeQuery = true)
	List<Customer> findAllByRolename(String role);

	/**
	 * Query che restituisce l'utente la cui email è quella indicata da parametro
	 * 
	 * @param email
	 * @return utente con la email indicata
	 */
	@Query(value = "select * from users where email= :email", nativeQuery = true)
	Customer getUserByEmail(@Param("email") String email);

}
