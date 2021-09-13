package com.banking.project.signUpservice.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.*;


@Entity
@Table(name = "users")
public class Customer {


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

    @Column(name = "password")
    private String password;

    @Column(name = "dateofbirth")
    private Long dateOfBirth;

    @Column(name = "gender")
    private String gender;


    @Column(name = "role")
    private String role;


    @JsonIgnore
    @OneToMany(fetch = FetchType.EAGER, mappedBy = "holder")
    private List<BankAccount> bankAccounts;

    /**
     * Metodo per estrarre l'id filtrando così i dati che non servono del conto corrente
     *
     * @return
     */
	/*
	public List<Integer> bankAccounts_id(){
		List<Integer> bAccounts = new ArrayList<>();
		for(BankAccount b: bankAccounts) {
			bAccounts.add(b.getId());
		}
		return bAccounts;
	};*/
    public Customer() {

    }

    public Customer(String firstName, String lastName, String email, String password, Long dateOfBirth,
                    String gender, String role) {
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

    public Long getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Long dateOfBirth) {
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

/*
	public List<Integer> getBankAccounts() {
		return bankAccounts_id();

	}*/

    public List<BankAccount> getBankAccounts() {
        return bankAccounts;
    }

    public void setBankAccounts(List<BankAccount> bankAccounts) {
        this.bankAccounts = bankAccounts;
    }


}
