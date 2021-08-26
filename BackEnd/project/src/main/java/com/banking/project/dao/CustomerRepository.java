package com.banking.project.dao;
import com.banking.project.entity.Customer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "customers")
public interface CustomerRepository extends JpaRepository<Customer,Integer> {

}
