package com.banking.project.register_service.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class CustomerAlreadyExsistException extends RuntimeException {

    private static final long serialVersionUID = 1885653349235601203L;
    public CustomerAlreadyExsistException(String message){
        super(message);

    }
}

