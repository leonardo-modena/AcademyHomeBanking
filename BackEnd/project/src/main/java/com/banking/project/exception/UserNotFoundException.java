package com.banking.project.exception;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class UserNotFoundException extends RuntimeException {
	
	private static final long serialVersionUID = 1885653349235601203L;
    public UserNotFoundException(String message){
    super(message);

    }
}

