package com.banking.project.accountmanagementservice.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.banking.project.accountmanagementservice.exception.ApiBankException;
import com.banking.project.accountmanagementservice.exception.ApiBankResponse;

@ControllerAdvice
public class ApiBankControllerAdvice {

	@ExceptionHandler(ApiBankException.class)
	@ResponseBody
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ApiBankResponse handleApiBankException(ApiBankException e) {
		ApiBankResponse response = new ApiBankResponse(e.getErrorCode(),e.getErrorMessage());
		return response;
	}
}
