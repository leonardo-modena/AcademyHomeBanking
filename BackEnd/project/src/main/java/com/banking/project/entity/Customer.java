package com.banking.project.entity;

import javax.persistence.*;

@Entity
@Table(name="utenti")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "nome")
    private String firstName;

    @Column(name = "cognome")
    private String lastName;

    @Column(name = "email")
    private String email;

    @Column(name="password")
    private String password;

    @Column (name = "ruolo")
    private com.banking.project.ENUM.ruolo ruolo ;

    public Customer(){

    }

    public Customer(String firstName, String lastName, String email,String password, Enum ruolo) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password=password;
        this.ruolo= com.banking.project.ENUM.ruolo.C;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public com.banking.project.ENUM.ruolo getRuolo() {
        return ruolo;
    }

    public void setRuolo(com.banking.project.ENUM.ruolo ruolo) {
        this.ruolo = ruolo;
    }
}
