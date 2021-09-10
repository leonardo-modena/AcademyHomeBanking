package com.banking.project.accountmanagementservice.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name = "users")
public class CustomerDTO {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "firstname")
    private String firstName;

    @Column(name = "lastname")
    private String lastName;

    @Column(name = "email")
    private String email;

    @JsonIgnore
    @Column(name = "password")
    private String password;

    @Column(name = "dateofbirth")
    private long dateOfBirth;

    @Column(name = "gender")
    private String gender;

    @Column(name = "role")
    private String role;



    @OneToMany( mappedBy = "holder")
    private List<BankAccount> bankAccounts;

    /**
     * Metodo per estrarre l'id filtrando così i dati che non servono del conto
     * corrente
     *
     * @return
     */
    public List<BankAccount> bankAccounts_modified() {
        List<BankAccount> bAccounts = new ArrayList<>();
        for (BankAccount b : bankAccounts) {
            // non voglio che mi vengano mostrati i conti chiusi
            if (!(b.getAccount_status().equals("CLOSING")))
                bAccounts.add(b);
        }
        return bAccounts;
    }

    public CustomerDTO() {

    }

    public CustomerDTO(String firstName, String lastName, String email, String password, long dateOfBirth, String gender,
                       String role) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.role = role;
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

    public long getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(long dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public List<BankAccount> getBankAccounts() {
        return bankAccounts_modified();

    }

    public void setBankAccounts(List<BankAccount> bankAccounts) {
        this.bankAccounts = bankAccounts;
    }

}