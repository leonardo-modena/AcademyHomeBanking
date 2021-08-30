package com.banking.project.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.*;

import org.hibernate.annotations.FilterJoinTable;
import org.hibernate.annotations.Where;

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
	private Date dateOfBirth;

	@Column(name = "gender")
	private String gender;

	@Column(name = "role")
	private String role;
	
	@OneToMany(fetch = FetchType.EAGER,mappedBy = "holder")
	private List <BankAccount> bankAccounts;

	/**
	 * Metodo per estrarre l'id filtrando così i dati che non servono del conto corrente
	 * @return
	 */
	public List<Integer> bankAccounts_id(){
		List<Integer> bAccounts = new ArrayList<>();
		for(BankAccount b: bankAccounts) {
			bAccounts.add(b.getId());
		}
		return bAccounts;
	};

	public Customer() {

	}
	
	public Customer(int id, String firstName, String lastName, String email, String password, Date dateOfBirth,
			String gender, String role) {
		this.id = id;
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

	public Date getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(Date dateOfBirth) {
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


	public List<Integer> getBankAccounts() {
		return bankAccounts_id();

	}
	public void setBankAccounts(List<BankAccount> bankAccounts) {
		this.bankAccounts = bankAccounts;
	}
	

}
