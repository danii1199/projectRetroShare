package org.proyecto.retroshare.domain;

import java.util.Collection;

import javax.persistence.CascadeType;
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
	private String image;


	@JsonIgnoreProperties(value = { "products", "hibernateLazyInitializer" }, allowSetters = true)
	@JoinColumn(name = "user_id")
	@ManyToOne(cascade = CascadeType.PERSIST, optional = true)
	private User user;
	
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
	
	@JsonIgnoreProperties(value = "products", allowSetters = true)
	@ManyToOne(cascade = CascadeType.PERSIST, optional = true)
	private ShoppingCart shoppingCart;
	
	

	public Product(String description, String image) {

		super();
		this.description = description;
		this.image = image;
	}

	public Product() {
		super();
	}




	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
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

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
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

	public ShoppingCart getShoppingCart() {
		return shoppingCart;
	}

	public void setShoppingCart(ShoppingCart shoppingCart) {
		this.shoppingCart = shoppingCart;
	}
	
	

}
