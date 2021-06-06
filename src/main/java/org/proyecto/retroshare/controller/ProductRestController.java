package org.proyecto.retroshare.controller;

import java.io.IOException;
import java.util.List;

import org.proyecto.retroshare.domain.Product;
import org.proyecto.retroshare.domain.User;
import org.proyecto.retroshare.exception.ProductNotFoundException;
import org.proyecto.retroshare.repositories.ProductRepository;
import org.proyecto.retroshare.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/retroshare/")
public class ProductRestController {

	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private UserRepository userRepository;

	// VER TODOS LOS PRODUCTOS
	@GetMapping(value = "/pr-all")
	public List<Product> findAll() {
		return productRepository.findAll();
		
	}

	@GetMapping(value = "/pr/{id}")
	public ResponseEntity<Product> getById(@PathVariable("id") Long id) {
		Product prd = productRepository.findById(id)
				.orElseThrow(() -> new ProductNotFoundException("No Product with ID : " + id));
		return ResponseEntity.ok().body(prd);

	}

	// BORRAR UN JUEGO
	@PostMapping(value = "/pr-delete/{id}")
	public String delete(@PathVariable Long id) {
		Product product = productRepository.getOne(id);
		if (product != null) {
			productRepository.delete(product);
		}

		return "redirect:pr-all";
	}

	@PostMapping(value = "/pr-buy/{id}/{userId}")
	public ResponseEntity<Product> update(@PathVariable Long id, @PathVariable Long userId,
			@RequestBody Product product) {

		Product productUpdate = productRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("No existe el producto " + id));

		User user = userRepository.getOne(userId);

		productUpdate.setUserBuyer(user);
		user.getProductBuyer().add(productUpdate);

		Product obj = productRepository.save(productUpdate);

		return new ResponseEntity<Product>(obj, HttpStatus.OK);

	}
	
}
