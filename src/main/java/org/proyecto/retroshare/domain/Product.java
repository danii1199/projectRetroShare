package org.proyecto.retroshare.domain;

import java.util.Collection;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Inheritance(strategy = InheritanceType.JOINED)
@Entity
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String description;
	private String images;

	@JsonIgnoreProperties(value = { "products", "hibernateLazyInitializer" }, allowSetters = true)
	@JoinColumn(name = "userOwner_id")
	@ManyToOne(optional = true)
	private User userOwner;

	@JsonIgnoreProperties(value = { "products", "hibernateLazyInitializer" }, allowSetters = true)
	@JoinColumn(name = "userBuyer_id")
	@ManyToOne(optional = true)
	private User userBuyer;

	/*
	 * @JsonIgnore
	 * 
	 * @OneToOne(mappedBy = "product", cascade = CascadeType.PERSIST, fetch =
	 * FetchType.LAZY) private Historial historial;
	 */

	@JsonIgnoreProperties(value = { "products", "hibernateLazyInitializer" }, allowSetters = true)
	@JoinColumn(name = "productStatus_id")
	@ManyToOne(cascade = CascadeType.PERSIST, optional = true)
	private ProductStatus productStatus;

	@JsonIgnoreProperties(value = "products", allowSetters = true)
	@OneToMany(mappedBy = "product", cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
	private Collection<StoreStatus> store_status;

	@JsonIgnoreProperties(value = "comments", allowSetters = true)
	@OneToMany(mappedBy = "productComment", cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
	private Collection<Comment> comments;

	public Product() {
		super();
	}

	public Product(String description, String images) {
		super();
		this.description = description;
		this.images = images;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getImages() {
		return images;
	}

	public void setImages(String images) {
		this.images = images;
	}

	public User getUserOwner() {
		return userOwner;
	}

	public void setUserOwner(User userOwner) {
		this.userOwner = userOwner;
	}

	public User getUserBuyer() {
		return userBuyer;
	}

	public void setUserBuyer(User userBuyer) {
		this.userBuyer = userBuyer;
	}

	public ProductStatus getProductStatus() {
		return productStatus;
	}

	public void setProductStatus(ProductStatus productStatus) {
		this.productStatus = productStatus;
	}

	public Collection<StoreStatus> getStore_status() {
		return store_status;
	}

	public void setStore_status(Collection<StoreStatus> store_status) {
		this.store_status = store_status;
	}

	public Collection<Comment> getComments() {
		return comments;
	}

	public void setComments(Collection<Comment> comments) {
		this.comments = comments;
	}

	

}
