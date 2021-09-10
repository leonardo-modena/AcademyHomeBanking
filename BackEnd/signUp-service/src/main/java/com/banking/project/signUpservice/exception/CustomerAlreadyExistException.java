package com.banking.project.signUpservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class CustomerAlreadyExistException extends RuntimeException {

	private static final long serialVersionUID = 1885653349235601203L;

	public CustomerAlreadyExistException(String message) {
		super(message);
	}

	public CustomerAlreadyExistException(Throwable throwable) {
		super(throwable);
	}

	public CustomerAlreadyExistException(String msg, Throwable throwable) {
		super(msg, throwable);
	}

}
