package com.banking.project.transactionservice.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idtransaction")
    private int id;

    @Column(name = "type")
    private String type;

    @Column(name = "datetransaction")
    private long dateTransaction;

    @Column(name = "causal")
    private String causal;

    @Column(name = "amount")
    private BigDecimal amount;

    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "idaccount",referencedColumnName = "id",nullable = false)
    @JsonIgnore
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

    public long getDateTransaction() {
        return dateTransaction;
    }

    public void setDateTransaction(long dateTransaction) {
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

    public String getCausal() {
        return causal;
    }

    public void setCausal(String causal) {
        this.causal = causal;
    }
}
