package com.banking.project.dao;
import com.banking.project.entity.Customer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface CustomerRepository extends JpaRepository<Customer,Integer> {


    @Query(value = "select * from users where role = :role", nativeQuery = true)
    Customer findAllByRolename(String role);

    @Query(value="select * from users where email= :email",nativeQuery = true)
    public Customer getUserByEmail(@Param("email") String email);
}
