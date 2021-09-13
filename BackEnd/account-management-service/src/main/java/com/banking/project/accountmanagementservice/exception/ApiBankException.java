package com.banking.project.accountmanagementservice.exception;

import org.springframework.http.HttpStatus;

/**
 * Eccezione custom che viene lanciata quando la disponibilità sul conto è
 * terminata
 *
 * @author sonia
 */
public class ApiBankException extends RuntimeException {

    private static final long serialVersionUID = -7806029002430564887L;

    private HttpStatus errorCode;
    private String errorMessage;

    public ApiBankException(Throwable throwable) {
        super(throwable);
    }

    public ApiBankException(String msg, Throwable throwable) {
        super(msg, throwable);
    }

    public ApiBankException(String msg) {
        super(msg);
    }

    public ApiBankException(String message, HttpStatus errorCode) {
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
