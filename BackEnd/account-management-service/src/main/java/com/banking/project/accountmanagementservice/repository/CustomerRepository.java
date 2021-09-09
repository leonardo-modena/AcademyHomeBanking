package com.banking.project.accountmanagementservice.repository;

import com.banking.project.accountmanagementservice.entity.Customer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {

	@Query(value = "SELECT c from Customer c where c.role ='ROLE_C' order by c.firstName , c.lastName ")
	List<Customer> listSortCustomer();




	@Transactional
	@Modifying(clearAutomatically = true)
	@Query(value = "DELETE Customer c where c=:customer")
	void deleteAccount(@Param("customer")Customer customer);

}
