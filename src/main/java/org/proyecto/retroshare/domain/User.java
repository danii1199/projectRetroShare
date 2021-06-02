package org.proyecto.retroshare.domain;

import java.util.Calendar;
import java.util.Collection;
import java.util.Calendar;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String firstName;
	private String lastName;
	@Column(unique = true)
	private String userName;
	@Column(name = "password", nullable = false)
	private String password;
	private String sex;
	private String address;
	private Integer zipCode;
	private String city;
	private String country;
	@Column(unique = true)
	private Integer phoneNumber;
	@Column(unique = true)
	private String email;
	@Column(unique = true)
	private String avatar;
	private Calendar date;
	private String verificate;
	
	@JsonIgnore
	@OneToMany(mappedBy = "userOwner", cascade=CascadeType.REMOVE,fetch = FetchType.LAZY)
	private Collection<Product> productOwner;
	@JsonIgnore
	@OneToMany(mappedBy = "userBuyer",cascade=CascadeType.REMOVE, fetch = FetchType.LAZY)
	private Collection<Product> productBuyer;
	
	@JsonIgnore
	@OneToMany(mappedBy = "userOwner", fetch = FetchType.LAZY)
	private Collection<Chat> messageOwner;
	@JsonIgnore
	@OneToMany(mappedBy = "userBuyer", fetch = FetchType.LAZY)
	private Collection<Chat> messageBuyer;

	
	/*
	 * @JsonIgnore
	 * 
	 * @OneToOne(mappedBy = "user", cascade = CascadeType.PERSIST, fetch =
	 * FetchType.LAZY) private Historial historial;
	 */

	@JsonIgnoreProperties(value = "users", allowSetters = true)
	@JoinColumn(name = "role_id")
	@ManyToOne(cascade = CascadeType.PERSIST, optional = true)
	private Role role;

	@JsonIgnoreProperties(value = "users", allowSetters = true)
	@ManyToMany(cascade = CascadeType.ALL)
	private Collection<Valuation> valuations;

	@JsonIgnoreProperties(value = "comments", allowSetters = true)
	@OneToMany(mappedBy = "productComment", cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
	private Collection<Comment> comments;

	public User(String firstName, String lastName, String userName, String password, String sex, String address,
			Integer zipCode, String city, String country, Integer phoneNumber, String email, String avatar,
			Calendar date) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.userName = userName;
		this.password = password;
		this.sex = sex;
		this.address = address;
		this.zipCode = zipCode;
		this.city = city;
		this.country = country;
		this.phoneNumber = phoneNumber;
		this.email = email;
		this.avatar = avatar;
		this.date = date;
	}

	public User() {

	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
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

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Integer getZipCode() {
		return zipCode;
	}

	public void setZipCode(Integer zipCode) {
		this.zipCode = zipCode;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public Integer getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(Integer phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getAvatar() {
		return avatar;
	}

	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}

	public Calendar getDate() {
		return date;
	}

	public void setDate(Calendar date) {
		this.date = date;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public Collection<Valuation> getValuations() {
		return valuations;
	}

	public void setValuations(Collection<Valuation> valuations) {
		this.valuations = valuations;
	}

	public Collection<Comment> getComments() {
		return comments;
	}

	public void setComments(Collection<Comment> comments) {
		this.comments = comments;
	}

	public Collection<Product> getProductOwner() {
		return productOwner;
	}

	public void setProductOwner(Collection<Product> productOwner) {
		this.productOwner = productOwner;
	}

	public Collection<Product> getProductBuyer() {
		return productBuyer;
	}

	public void setProductBuyer(Collection<Product> productBuyer) {
		this.productBuyer = productBuyer;
	}

	public Collection<Chat> getMessageOwner() {
		return messageOwner;
	}

	public void setMessageOwner(Collection<Chat> messageOwner) {
		this.messageOwner = messageOwner;
	}

	public Collection<Chat> getMessageBuyer() {
		return messageBuyer;
	}

	public void setMessageBuyer(Collection<Chat> messageBuyer) {
		this.messageBuyer = messageBuyer;
	}

	public String getVerificate() {
		return verificate;
	}

	public void setVerificate(String verificate) {
		this.verificate = verificate;
	}


	
	
	

}
