package org.proyecto.retroshare.controller;

import java.util.List;

import org.proyecto.retroshare.domain.User;
import org.proyecto.retroshare.domain.Valuation;
import org.proyecto.retroshare.repositories.UserRepository;
import org.proyecto.retroshare.repositories.ValuationRepository;
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
public class ValuationStatusRestController {

	// ENLACE BBDD
	@Autowired
	private ValuationRepository valuationRepository;
	
	@Autowired
	private UserRepository UserRepository;

	// Consulta de los estados
	@GetMapping(value = "/valuation-all")
	public List<Valuation> findAll() {
		return valuationRepository.findAll();
	}

	// Buscar un estado
	@GetMapping(value = "/valuation-find/{id}")
	public Valuation find(@PathVariable Long id) {
		return valuationRepository.getOne(id);
	}

	// Guardar un estado
	@PostMapping(value = "/valuation-save/{idUser}")
	public ResponseEntity<Valuation> save(@RequestBody Valuation valuation,Long idUser) {
		
		User user = UserRepository.findById(idUser)
				.orElseThrow(()-> new ResourceNotFoundException("No existe el usuario "+idUser));

		valuation.getUsers().add(user);
		user.getValuations().add(valuation);
		
		Valuation obj = valuationRepository.save(valuation);
		return new ResponseEntity<Valuation>(obj, HttpStatus.OK);
	}

	// Actualizar un estado
	@PostMapping(value = "valuation-update/{id}")
	public ResponseEntity<Valuation> update(@PathVariable Long id, @RequestBody Valuation valuation) {

		Valuation valuationUpdate = valuationRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("No existe la valoracion " + id));

		valuationUpdate.setNumber_of_stars(valuation.getNumber_of_stars());
		valuationUpdate.setValuation_date(valuation.getValuation_date());
		
		Valuation obj = valuationRepository.save(valuationUpdate);
		return new ResponseEntity<Valuation>(obj, HttpStatus.OK);

	}

	// BORRAR UN USUARIO
	@GetMapping(value = "/valuation-delete/{id}")
	public ResponseEntity<Valuation> delete(@PathVariable Long id) {
		Valuation valuation = valuationRepository.getOne(id);
		if (valuation != null) {
			valuationRepository.delete(valuation);
		}

		return new ResponseEntity<Valuation>(valuation, HttpStatus.OK);
	}

}
