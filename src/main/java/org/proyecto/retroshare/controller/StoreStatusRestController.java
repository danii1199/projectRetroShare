package org.proyecto.retroshare.controller;

import java.util.List;

import org.proyecto.retroshare.domain.StoreStatus;
import org.proyecto.retroshare.repositories.StoreStatusRepository;
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
public class StoreStatusRestController {

	// ENLACE BBDD
	@Autowired
	private StoreStatusRepository storeStatusRepository;

	// Consulta de los estados
	@GetMapping(value = "/ss-all")
	public List<StoreStatus> findAll() {
		return storeStatusRepository.findAll();
	}

	// Buscar un estado
	@GetMapping(value = "/ss-find/{id}")
	public StoreStatus find(@PathVariable Long id) {
		return storeStatusRepository.getOne(id);
	}

	// Guardar un estado
	@PostMapping(value = "/ss-save")
	public ResponseEntity<StoreStatus> save(@RequestBody StoreStatus storeStatus) {
		StoreStatus obj = storeStatusRepository.save(storeStatus);

		return new ResponseEntity<StoreStatus>(obj, HttpStatus.OK);
	}

	// Actualizar un estado
	@PostMapping(value = "ss-update/{id}")
	public ResponseEntity<StoreStatus> update(@PathVariable Long id, @RequestBody StoreStatus storeStatus) {

		StoreStatus storeStatusUpdate = storeStatusRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("No existe el estado" + id));

		storeStatusUpdate.setStore_status(storeStatus.getStore_status());
		storeStatusUpdate.setDate_status(storeStatus.getDate_status());

		StoreStatus obj = storeStatusRepository.save(storeStatusUpdate);
		return new ResponseEntity<StoreStatus>(obj, HttpStatus.OK);

	}

	// BORRAR UN USUARIO
	@GetMapping(value = "/ss-delete/{id}")
	public ResponseEntity<StoreStatus> delete(@PathVariable Long id) {
		StoreStatus storeStatus = storeStatusRepository.getOne(id);
		if (storeStatus != null) {
			storeStatusRepository.delete(storeStatus);
		}

		return new ResponseEntity<StoreStatus>(storeStatus, HttpStatus.OK);
	}

}
