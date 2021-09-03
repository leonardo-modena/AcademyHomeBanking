package com.banking.project.transactionservice.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.List;

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


	@JsonIgnore
	@ManyToOne()
	@JoinColumn(name = "holder", nullable = false)
	private Customer holder;



	@JsonIgnore
	@OneToMany(fetch = FetchType.EAGER,mappedBy = "id_account")
	private List<Transaction> transactions;


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
		holder.getId();
	}
	

}
