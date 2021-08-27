package com.banking.project.entity;

import com.banking.project.ENUM.Account_Status;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name="bank_account")
public class BankAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "balance")
    private BigDecimal balance;

    @Column(name = "account_status")
    private Account_Status account_status;

    @OneToOne(cascade = {CascadeType.PERSIST,CascadeType.DETACH,
            CascadeType.MERGE,CascadeType.REFRESH})
    @JoinColumn(name = "holder")
    private Customer holder;


    public BankAccount(){

    }

    public BankAccount(int id, BigDecimal balance, Account_Status account_status, Customer holder) {
        this.id = id;
        this.balance = balance;
        this.account_status = account_status;
        this.holder = holder;
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

    public Account_Status getAccount_status() {
        return account_status;
    }

    public void setAccount_status(Account_Status account_status) {
        this.account_status = account_status;
    }

    public Customer getHolder() {
        return holder;
    }

    public void setHolder(Customer holder) {
        this.holder = holder;
    }
}
