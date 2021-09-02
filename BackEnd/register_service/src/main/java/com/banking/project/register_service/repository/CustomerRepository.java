package com.banking.project.register_service.repository;


import com.banking.project.register_service.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CustomerRepository extends JpaRepository<Customer, Integer> {

    public boolean findCustomerByEmail(String email);


}
