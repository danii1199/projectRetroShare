package org.proyecto.retroshare.domain;


import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@PrimaryKeyJoinColumn(name = "productId")
public class RecordPlayer extends Product {

	private String name;
	private String model;
	private String brand;
	private Integer year;
	private Float price;

	@JsonIgnoreProperties(value = { "recordplayers", "hibernateLazyInitializer" }, allowSetters = true)

	public RecordPlayer(String description, String name, String model, String brand, Integer year, Float price) {
		super();

		this.name = name;
		this.model = model;
		this.brand = brand;
		this.year = year;
		this.price = price;
	}

	public RecordPlayer() {
		super();
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
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
