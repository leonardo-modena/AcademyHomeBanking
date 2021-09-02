package com.banking.project.accountmanagementservice.repository;

import com.banking.project.accountmanagementservice.entity.Customer;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.persistence.OrderBy;
import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {
	@Query(value = "SELECT c from Customer c order by c.firstName , c.lastName  ")
	List<Customer> listSortCustomer();

}
