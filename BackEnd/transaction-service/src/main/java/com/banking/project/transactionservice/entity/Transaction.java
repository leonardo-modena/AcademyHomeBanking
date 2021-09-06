package com.banking.project.transactionservice.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_transaction")
    private int id;

    @Column(name = "type")
    private String type;

    @Column(name = "date_transaction")
    private Date  dateTransaction;

    @Column(name = "amount")
    private BigDecimal amount;



    @JsonIgnore
    @ManyToOne()
    @JoinColumn(name = "id_account",referencedColumnName = "id",nullable = false)
    private BankAccount idAccount;


    public Transaction(){

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Date getDateTransaction() {
        return dateTransaction;
    }

    public void setDateTransaction(Date dateTransaction) {
        this.dateTransaction = dateTransaction;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public BankAccount getId_account() {
        return idAccount;
    }

    public void setId_account(BankAccount account) {
        this.idAccount = account;
        account.getId();
    }
}
