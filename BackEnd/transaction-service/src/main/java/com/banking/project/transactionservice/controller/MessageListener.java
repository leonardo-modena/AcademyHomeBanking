package com.banking.project.transactionservice.controller;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.banking.project.transactionservice.entity.BankAccount;
import com.banking.project.transactionservice.entity.Transaction;
import com.banking.project.transactionservice.rabbitconfig.MQConfigTransaction;
import com.banking.project.transactionservice.repository.TransactionRepository;

@Component
public class MessageListener {

	@Autowired
	TransactionRepository transactionRepository;

	/**
	 * Metodo che rimane in attesa sulla coda aspettando che arrivi un oggetto di
	 * tipo BankAccount per registrare la transazione di apertura conto
	 * 
	 * @param theBankAccount
	 */
	@RabbitListener(queues = MQConfigTransaction.QUEUE)
	public void listener(BankAccount theBankAccount) {

		Transaction transaction = new Transaction();
		transaction.setType("DEPOSIT");
		transaction.setDateTransaction(System.currentTimeMillis());
		transaction.setAmount(theBankAccount.getBalance());
		transaction.setCausal("Apertura nuovo conto");
		transaction.setId_account(theBankAccount);
		transactionRepository.save(transaction);

		System.out.println("Message received from queue : " + theBankAccount.toString());
	}
}
