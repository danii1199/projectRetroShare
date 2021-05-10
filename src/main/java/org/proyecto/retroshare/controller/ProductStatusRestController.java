package org.proyecto.retroshare.controller;

import java.util.List;

import org.proyecto.retroshare.domain.ProductStatus;
import org.proyecto.retroshare.repositories.ProductStatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
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
public class ProductStatusRestController {

	// ENLACE BBDD
	@Autowired
	private ProductStatusRepository productStatusRepository;

	// Consulta de los estados
	@GetMapping(value = "/ps-all")
	public List<ProductStatus> findAll() {
		return productStatusRepository.findAll();
	}

	// Buscar un estado
	@GetMapping(value = "/ps-find/{id}")
	public ProductStatus find(@PathVariable Long id) {
		return productStatusRepository.getOne(id);
	}

	// Guardar un estado
	@PostMapping(value = "/ps-save")
	public ResponseEntity<ProductStatus> save(@RequestBody ProductStatus productStatus) {
		ProductStatus obj = productStatusRepository.save(productStatus);

		return new ResponseEntity<ProductStatus>(obj, HttpStatus.OK);
	}

	// Actualizar un estado
	@PostMapping(value = "ps-update/{id}")
	public ResponseEntity<ProductStatus> update(@PathVariable Long id, @RequestBody ProductStatus productStatus) {

		ProductStatus productStatusUpdate = productStatusRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("No existe el estado" + id));

		productStatusUpdate.setStatus(productStatus.getStatus());

		ProductStatus obj = productStatusRepository.save(productStatusUpdate);
		return new ResponseEntity<ProductStatus>(obj, HttpStatus.OK);

	}

	// BORRAR UN USUARIO
	@GetMapping(value = "/ps-delete/{id}")
	public ResponseEntity<ProductStatus> delete(@PathVariable Long id) {
		ProductStatus productStatus = productStatusRepository.getOne(id);
		if (productStatus != null) {
			productStatusRepository.delete(productStatus);
		}

		return new ResponseEntity<ProductStatus>(productStatus, HttpStatus.OK);
	}

}
