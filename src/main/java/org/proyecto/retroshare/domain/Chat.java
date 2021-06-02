package org.proyecto.retroshare.domain;

import java.util.Calendar;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
public class Chat {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String message;
	private Calendar date;
	
	@JsonIgnoreProperties(value = { "users", "hibernateLazyInitializer" }, allowSetters = true)
	@JoinColumn(name = "userSend_id")
	@ManyToOne( optional = true)
	private User userSend;
	
	@JsonIgnoreProperties(value = { "users", "hibernateLazyInitializer" }, allowSetters = true)
	@JoinColumn(name = "userReciber_id")
	@ManyToOne(optional = true)
	private User userReciber;

	public Chat() {
		super();
	}

	public Chat(String message, Calendar date) {
		super();
		this.message = message;
		this.date = date;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Calendar getDate() {
		return date;
	}

	public void setDate(Calendar date) {
		this.date = date;
	}

	public User getUserOwner() {
		return userSend;
	}

	public void setUserOwner(User userSend) {
		this.userSend = userSend;
	}

	public User getUserBuyer() {
		return userReciber;
	}

	public void setUserBuyer(User userReciber) {
		this.userReciber = userReciber;
	}
	
	

	
	

}
