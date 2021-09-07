package com.banking.project.signUpservice.repository;


import com.banking.project.signUpservice.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CustomerRepository extends JpaRepository<Customer, Integer> {

    public boolean findCustomerByEmail(String email);


}
