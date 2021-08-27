package com.banking.project.dao;
import com.banking.project.entity.Customer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
//import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.awt.print.Pageable;
import java.util.Collection;
import java.util.List;

//@RepositoryRestResource(path = "customers")
public interface CustomerRepository extends JpaRepository<Customer,Integer> {


    @Query(value = "select * from users where role = :role", nativeQuery = true)
    Customer findAllByRolename(String role);

    @Query(value="select * from users where email= :email",nativeQuery = true)
    public Customer getUserByEmail(@Param("email") String email);
}
