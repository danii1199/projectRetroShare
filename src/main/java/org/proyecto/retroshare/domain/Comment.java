package org.proyecto.retroshare.domain;

import java.util.Date;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
public class Comment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String comment_text;
	@JsonFormat(pattern ="dd-MM-YYYY",shape = Shape.STRING)
	private Date comment_date;
	
	@JsonIgnoreProperties(value = {"comments","hibernateLazyInitializer"},allowSetters = true)
	@JoinColumn(name = "product_id")
	@ManyToOne(cascade = CascadeType.PERSIST,fetch = FetchType.LAZY)
	private Product productComment;
	
	@JsonIgnoreProperties(value = {"comments","hibernateLazyInitializer"},allowSetters = true)
	@JoinColumn(name = "user_id")
	@ManyToOne(cascade = CascadeType.PERSIST,fetch = FetchType.LAZY)
	private User userComment;
	
	public Comment(String comment_text, Date comment_date) {
		super();
		this.comment_text = comment_text;
		this.comment_date = comment_date;
	}


	public Comment() {
		super();
	}


	public long getId() {
		return id;
	}


	public void setId(long id) {
		this.id = id;
	}


	public String getComment_text() {
		return comment_text;
	}


	public void setComment_text(String comment_text) {
		this.comment_text = comment_text;
	}


	public Date getComment_date() {
		return comment_date;
	}


	public void setComment_date(Date comment_date) {
		this.comment_date = comment_date;
	}


	public Product getProductComment() {
		return productComment;
	}


	public void setProductComment(Product productComment) {
		this.productComment = productComment;
	}


	public User getUserComment() {
		return userComment;
	}


	public void setUserComment(User userComment) {
		this.userComment = userComment;
	}
	
	
	

}
