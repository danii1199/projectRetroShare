package org.proyecto.retroshare.domain;

import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@PrimaryKeyJoinColumn(name = "productId")
public class Game extends Product {

	private String name;
	private String gender;
	private String developer;
	private Float price;
	

	@JsonIgnoreProperties(value = { "games", "hibernateLazyInitializer" }, allowSetters = true)
	
	

	public Game() {
		super();
	}


	public Game(String description, String name, String gender, String developer, Float price) {
		super();
		this.name = name;
		this.gender = gender;
		this.developer = developer;
		this.price = price;
	}



	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getDeveloper() {
		return developer;
	}

	public void setDeveloper(String developer) {
		this.developer = developer;
	}

	public Float getPrice() {
		return price;
	}

	public void setPrice(Float price) {
		this.price = price;
	}



}
