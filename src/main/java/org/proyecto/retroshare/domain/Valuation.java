package org.proyecto.retroshare.domain;

import java.util.Collection;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
public class Valuation {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	private Integer number_of_stars;
	@JsonFormat(pattern = "dd-MM-YYYY", shape = Shape.STRING)
	private Date valuation_date;
	
	@JsonIgnoreProperties(value="valuations",allowSetters = true)
	@ManyToMany(mappedBy = "valuations")
	private Collection<User> users;
	
	public Valuation(Integer number_of_stars, Date valuation_date) {
		super();
		this.number_of_stars = number_of_stars;
		this.valuation_date = valuation_date;
	}


	public Valuation() {
		super();
	}


	public long getId() {
		return id;
	}


	public void setId(long id) {
		this.id = id;
	}


	public Integer getNumber_of_stars() {
		return number_of_stars;
	}


	public void setNumber_of_stars(Integer number_of_stars) {
		this.number_of_stars = number_of_stars;
	}


	public Date getValuation_date() {
		return valuation_date;
	}


	public void setValuation_date(Date valuation_date) {
		this.valuation_date = valuation_date;
	}


	public Collection<User> getUsers() {
		return users;
	}


	public void setUsers(Collection<User> users) {
		this.users = users;
	}
	
	
	
}
