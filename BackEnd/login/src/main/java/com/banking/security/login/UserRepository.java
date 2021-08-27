package com.banking.security.login;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
 
public interface UserRepository extends CrudRepository<User, Integer> {
 
    @Query(value="select * from utenti where email= :email",nativeQuery = true)
    public User getUserByEmail(@Param("email") String email);
}