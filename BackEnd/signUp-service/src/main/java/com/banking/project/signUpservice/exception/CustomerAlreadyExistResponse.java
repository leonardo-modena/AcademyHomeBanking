package com.banking.project.signUpservice.exception;

import org.springframework.http.HttpStatus;

public class CustomerAlreadyExistResponse {

    private HttpStatus typeofError;
    private String error;

    public CustomerAlreadyExistResponse() {

    }

    public CustomerAlreadyExistResponse(HttpStatus typeofError, String error) {

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
