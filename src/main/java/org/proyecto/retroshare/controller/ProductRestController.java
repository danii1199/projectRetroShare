package org.proyecto.retroshare.controller;

import java.util.List;

import org.proyecto.retroshare.domain.Product;
import org.proyecto.retroshare.exception.ProductNotFoundException;
import org.proyecto.retroshare.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/retroshare/")
public class ProductRestController {

	@Autowired
	private ProductRepository productRepository;
	
	//VER TODOS LOS PRODUCTOS
	@GetMapping(value = "/pr-all")
	public List<Product> findAll() {
		return productRepository.findAll();
	}
	@GetMapping(value = "/pr/{id}")
	public ResponseEntity<Product> getById(@PathVariable("id")  Long id) {
        Product prd = productRepository.findById(id)
                                    .orElseThrow(()->new ProductNotFoundException("No Product with ID : "+id));
        return ResponseEntity.ok().body(prd);
			     
	}
	
	// BORRAR UN JUEGO
	@GetMapping(value = "/p-delete/{id}")
	public String delete(@PathVariable Long id) {
		Product product = productRepository.getOne(id);
		if (product != null) {
			productRepository.delete(product);
		}

		return "redirect:pr-all";
	}
}
