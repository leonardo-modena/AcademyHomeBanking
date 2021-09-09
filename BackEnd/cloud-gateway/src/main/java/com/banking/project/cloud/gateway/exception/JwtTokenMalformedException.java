package com.banking.project.cloud.gateway.exception;

import javax.naming.AuthenticationException;
/**
 * Classe che lancia l'eccezione di token malformato
 *
 */
public class JwtTokenMalformedException extends AuthenticationException {

	private static final long serialVersionUID = 1L;

	public JwtTokenMalformedException(String msg) {
		super(msg);
	}

}