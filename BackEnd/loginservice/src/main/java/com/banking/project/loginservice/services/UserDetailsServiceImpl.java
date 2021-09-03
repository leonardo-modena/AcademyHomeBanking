package com.banking.project.loginservice.services;

import com.banking.project.loginservice.dao.CustomerRepository;
import com.banking.project.loginservice.entity.Customer;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	private CustomerRepository customerRepository;

	/**
	 * Prende l'utente (se esiste) e restituisce i suoi dati
	 */
	@Override
	@Transactional
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		// utilizzo della email come username dell'utente
		Customer user = customerRepository.getUserByEmail(email);
		return MyUserDetails.build(user);
	}

}