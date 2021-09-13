package com.banking.project.accountmanagementservice.entity;

import javax.persistence.*;
import java.math.BigDecimal;

public class BankAccountDTO {

    private int id;

    private BigDecimal balance;

    private String account_status;

    private Customer holder;

    public BankAccountDTO() {

    }

    public BankAccountDTO(BigDecimal balance, String account_status) {

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
