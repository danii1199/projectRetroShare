package org.proyecto.retroshare.domain;


import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@PrimaryKeyJoinColumn(name = "productId")
public class GameConsole extends Product {

	private String name;
	private Integer year;
	private Float price;

	@JsonIgnoreProperties(value = { "gameconsoles", "hibernateLazyInitializer" }, allowSetters = true)


	public GameConsole(String description, String name, Integer year, Float price) {
		super();
		this.name = name;
		this.year = year;
		this.price = price;
	}


	public GameConsole() {
		super();
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getYear() {
		return year;
	}

	public void setYear(Integer year) {
		this.year = year;
	}

	public Float getPrice() {
		return price;
	}

	public void setPrice(Float price) {
		this.price = price;
	}

}
