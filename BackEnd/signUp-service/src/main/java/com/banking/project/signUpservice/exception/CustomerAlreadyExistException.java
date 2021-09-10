package com.banking.project.signUpservice.exception;

import org.springframework.http.HttpStatus;


public class CustomerAlreadyExistException extends RuntimeException {

	private static final long serialVersionUID = -7806029002430564887L;

	private HttpStatus errorCode;
	private String errorMessage;

	public CustomerAlreadyExistException(Throwable throwable) {
		super(throwable);
	}

	public CustomerAlreadyExistException(String msg, Throwable throwable) {
		super(msg, throwable);
	}

	public CustomerAlreadyExistException(String msg) {
		super(msg);
	}

	public CustomerAlreadyExistException(String message, HttpStatus errorCode) {
		super();
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
		return "Errore : " + this.errorCode + ", " + "message: " + this.errorMessage;
	}
}
