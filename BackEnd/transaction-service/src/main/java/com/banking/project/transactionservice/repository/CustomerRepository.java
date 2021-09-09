package com.banking.project.transactionservice.repository;

import com.banking.project.transactionservice.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {


}
