package com.banking.project.loginservice.encoder;

import java.nio.charset.StandardCharsets;

import org.springframework.security.crypto.password.PasswordEncoder;

import com.google.common.hash.Hashing;

/**
 * Encoder custom per codificare in sha256
 * 
 * @author sonia
 *
 */
public class Sha256Encoder implements PasswordEncoder {

	/**
	 * Metodo che ritorna una stringa codificata in sha256
	 */
	@Override
	public String encode(CharSequence rawPassword) {

		String sha256hex = Hashing.sha256().hashString(rawPassword, StandardCharsets.UTF_8).toString();

		return sha256hex;
	}

	/**
	 * Metodo che controlla se la password coincide con la stringa codificata
	 */
	@Override
	public boolean matches(CharSequence rawPassword, String encodedPassword) {

		String sha256 = Hashing.sha256().hashString(rawPassword, StandardCharsets.UTF_8).toString();

		boolean match = sha256.equals(encodedPassword);

		return match;
	}

}
