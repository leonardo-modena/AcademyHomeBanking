package com.banking.project.signUpservice.repository;


import com.banking.project.signUpservice.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface CustomerRepository extends JpaRepository<Customer, Integer> {

    @Query(value = "select * from users where email= :email", nativeQuery = true)
    Customer getCustomerByEmail(@Param("email") String email);
}
