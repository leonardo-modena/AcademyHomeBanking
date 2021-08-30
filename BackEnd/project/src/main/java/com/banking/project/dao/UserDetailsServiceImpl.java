package com.banking.project.dao;

import com.banking.project.entity.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class UserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	private CustomerRepository customerRepository;

	/**
	 * Prende l'utente (se esiste) e restituisce i suoi dati
	 */
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		// utilizzo della email come username dell'utente
		Customer user = customerRepository.getUserByEmail(email);

		if (user == null) {
			throw new UsernameNotFoundException("Utente non trovato");
		}

		return new MyUserDetails(user);
	}

}
