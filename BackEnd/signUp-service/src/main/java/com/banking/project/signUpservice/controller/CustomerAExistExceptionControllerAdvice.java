package com.banking.project.signUpservice.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.banking.project.signUpservice.exception.CustomerAlreadyExistException;
import com.banking.project.signUpservice.exception.CustomerAlreadyExistResponse;

@ControllerAdvice
public class CustomerAExistExceptionControllerAdvice {

    @ExceptionHandler(CustomerAlreadyExistException.class)
    @ResponseBody
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public CustomerAlreadyExistResponse handleApiBankException(CustomerAlreadyExistException e) {
        CustomerAlreadyExistResponse response = new CustomerAlreadyExistResponse(e.getErrorCode(),
                e.getErrorMessage());
        return response;
    }
}


