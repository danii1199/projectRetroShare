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
	private boolean leido;
	
	@JsonIgnoreProperties(value = { "chats", "hibernateLazyInitializer" }, allowSetters = true)
	@JoinColumn(name = "userSend_id")
	@ManyToOne( optional = true)
	private User userSend;
	
	@JsonIgnoreProperties(value = { "chats", "hibernateLazyInitializer" }, allowSetters = true)
	@JoinColumn(name = "userReciber_id")
	@ManyToOne(optional = true)
	private User userReciber;

	public Chat() {
		super();
	}

	public Chat(String message, Calendar date, boolean leido) {
		super();
		this.message = message;
		this.date = date;
		this.leido = leido;
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

	public boolean isLeido() {
		return leido;
	}

	public void setLeido(boolean leido) {
		this.leido = leido;
	}

	public User getUserSend() {
		return userSend;
	}

	public void setUserSend(User userSend) {
		this.userSend = userSend;
	}

	public User getUserReciber() {
		return userReciber;
	}

	public void setUserReciber(User userReciber) {
		this.userReciber = userReciber;
	}

	

	
	
	

	
	

}
