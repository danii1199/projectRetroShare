package org.proyecto.retroshare.domain;


import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@PrimaryKeyJoinColumn(name = "productId")
public class Vinyl extends Product {

	private String name;
	private String artists;
	private String songs;
	private Integer year;
	private Float price;

	@JsonIgnoreProperties(value = { "vinyls", "hibernateLazyInitializer" }, allowSetters = true)

	public Vinyl(String description, String name, String artists, String songs, Integer year, Float price) {
		super();

		this.name = name;
		this.artists = artists;
		this.songs = songs;
		this.year = year;
		this.price = price;
	}

	public Vinyl() {
		super();
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getArtists() {
		return artists;
	}

	public void setArtists(String artists) {
		this.artists = artists;
	}

	public String getSongs() {
		return songs;
	}

	public void setSongs(String songs) {
		this.songs = songs;
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
