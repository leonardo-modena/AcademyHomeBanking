package com.banking.project.transactionservice.exception;

import org.springframework.http.HttpStatus;

/**
 * Entità di risposta personalizzata
 * 
 * @author sonia
 *
 */
public class ApiBankResponse {

	private HttpStatus typeofError;
	private String error;

	public ApiBankResponse() {

	}

	public ApiBankResponse(HttpStatus typeofError, String error) {

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
