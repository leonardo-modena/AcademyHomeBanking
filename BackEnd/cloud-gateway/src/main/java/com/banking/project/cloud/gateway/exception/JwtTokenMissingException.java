package com.banking.project.cloud.gateway.exception;

import javax.naming.AuthenticationException;
/**
 * Classe che lancia l'eccezione di token mancante
 */
public class JwtTokenMissingException extends AuthenticationException {

	private static final long serialVersionUID = 1L;

	public JwtTokenMissingException(String msg) {
		super(msg);
	}

}