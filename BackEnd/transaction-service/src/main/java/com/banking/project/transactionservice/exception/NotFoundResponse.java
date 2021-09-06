package com.banking.project.transactionservice.exception;

import org.springframework.http.HttpStatus;

/**
 * Entità di risposta personalizzata per la NotFoundException
 * @author sonia
 *
 */

public class NotFoundResponse {
	
	private HttpStatus typeofError;
	private String error;

	public NotFoundResponse() {

	}

	public NotFoundResponse(HttpStatus typeofError, String error) {

		this.typeofError = typeofError;
		this.error = error;
	}

	public HttpStatus getTypeofError() {
		return typeofError;
	}

	public void setTypeofError(HttpStatus typeofError) {
		this.typeofError = typeofError;
	}

	public String getError() {
		return error;
	}

	public void setError(String error) {
		this.error = error;
	}

}

