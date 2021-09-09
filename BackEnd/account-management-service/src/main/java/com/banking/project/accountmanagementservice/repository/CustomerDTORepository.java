package com.banking.project.accountmanagementservice.repository;

import com.banking.project.accountmanagementservice.entity.CustomerDTO;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerDTORepository extends JpaRepository<CustomerDTO, Integer> {


}
