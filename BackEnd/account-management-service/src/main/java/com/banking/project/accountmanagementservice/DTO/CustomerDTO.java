package com.banking.project.accountmanagementservice.DTO;
import com.banking.project.accountmanagementservice.entity.BankAccount;

import java.util.ArrayList;
import java.util.List;

public class CustomerDTO {


    private int id;

    private String firstName;

    private String lastName;

    private String email;

    private long dateOfBirth;

    private String gender;

    private String role;


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

    public CustomerDTO(String firstName, String lastName, String email, long dateOfBirth, String gender,
                       String role) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
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
