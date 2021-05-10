package org.proyecto.retroshare.domain;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;

@Entity
public class StoreStatus {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	private String store_status;
	@JsonFormat(pattern="dd-MM-YY",shape = Shape.STRING)
	private Date date_status;
	
	@JsonIgnoreProperties(value = { "productStatus", "hibernateLazyInitializer" }, allowSetters = true)
	@JoinColumn(name = "product_id")
	@ManyToOne(cascade = CascadeType.PERSIST, optional = true)
	private Product product;
	
	public StoreStatus(String store_status, Date date_status) {
		super();
		this.store_status = store_status;
		this.date_status = date_status;
	}


	public StoreStatus() {
		super();
	}


	public long getId() {
		return id;
	}


	public void setId(long id) {
		this.id = id;
	}


	public String getStore_status() {
		return store_status;
	}


	public void setStore_status(String store_status) {
		this.store_status = store_status;
	}


	public Date getDate_status() {
		return date_status;
	}


	public void setDate_status(Date date_status) {
		this.date_status = date_status;
	}
	
	
	
}
