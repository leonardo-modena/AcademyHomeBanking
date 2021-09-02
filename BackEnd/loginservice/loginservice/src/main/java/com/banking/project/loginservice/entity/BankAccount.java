package com.banking.project.loginservice.entity;

import javax.persistence.*;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.math.BigDecimal;

@Entity
@Table(name = "bank_account")
public class BankAccount {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private int id;

	@Column(name = "balance")
	private BigDecimal balance;

	@Column(name = "account_status")
	private String account_status;

	@ManyToOne(fetch = FetchType.LAZY)	
	@JoinColumn(name = "holder", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	private Customer holder;

	public BankAccount() {

	}

	public BankAccount(BigDecimal balance, String account_status) {

		this.balance = balance;
		this.account_status = account_status;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public BigDecimal getBalance() {
		return balance;
	}

	public void setBalance(BigDecimal balance) {
		this.balance = balance;
	}

	public String getAccount_status() {
		return account_status;
	}

	public void setAccount_status(String account_status) {
		this.account_status = account_status;
	}

	public Customer getHolder() {
		return holder;
	}

	public void setHolder(Customer holder) {
		this.holder = holder;
	}
	

}
