package com.banking.project.transactionservice.exception;

import org.springframework.http.HttpStatus;

/**
 * Eccezione custom che viene lanciata quando il conto non viene trovato
 * terminata
 *
 */
public class NotFoundException extends RuntimeException {

	private static final long serialVersionUID = -7806029002430564887L;

	private HttpStatus errorCode;
	private String errorMessage;

	public NotFoundException(Throwable throwable) {
		super(throwable);
	}

	public NotFoundException(String msg, Throwable throwable) {
		super(msg, throwable);
	}

	public NotFoundException(String msg) {
		super(msg);
	}

	public NotFoundException(String message, HttpStatus errorCode) {
		this.errorCode = errorCode;
		this.errorMessage = message;
	}

	public HttpStatus getErrorCode() {
		return errorCode;
	}

	public void setErrorCode(HttpStatus errorCode) {
		this.errorCode = errorCode;
	}

	public String getErrorMessage() {
		return errorMessage;
	}

	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}

	@Override
	public String toString() {
		return "Error : " + this.errorCode + ", " +"message: " + this.errorMessage;
	}
}
