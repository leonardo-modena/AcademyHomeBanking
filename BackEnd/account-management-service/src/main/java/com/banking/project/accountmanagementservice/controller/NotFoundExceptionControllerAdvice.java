package com.banking.project.accountmanagementservice.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.banking.project.accountmanagementservice.exception.NotFoundException;
import com.banking.project.accountmanagementservice.exception.NotFoundResponse;

@ControllerAdvice
public class NotFoundExceptionControllerAdvice {
	@ExceptionHandler(NotFoundException.class)
	@ResponseBody
	@ResponseStatus(HttpStatus.NOT_FOUND)
	public NotFoundResponse handleNotFoundException(com.banking.project.accountmanagementservice.exception.NotFoundException e) {
		NotFoundResponse response = new NotFoundResponse(e.getErrorCode(),e.getErrorMessage());
		return response;
	}
}
