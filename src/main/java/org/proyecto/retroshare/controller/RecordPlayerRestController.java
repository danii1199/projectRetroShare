package org.proyecto.retroshare.controller;

import java.util.List;

import org.proyecto.retroshare.domain.ProductStatus;
import org.proyecto.retroshare.domain.RecordPlayer;
import org.proyecto.retroshare.domain.User;
import org.proyecto.retroshare.repositories.ProductStatusRepository;
import org.proyecto.retroshare.repositories.RecordPlayerRepository;
import org.proyecto.retroshare.repositories.UserRepository;
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
public class RecordPlayerRestController {
	// ENLACE BBDD
	@Autowired
	private RecordPlayerRepository recordplayerRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ProductStatusRepository productStatusRepository;

	// CONSULTA DE TODOS LOS TOCADISCOS
	@GetMapping(value = "/rp-all")
	public List<RecordPlayer> findAll() {
		return recordplayerRepository.findAll();
	}

	// BUSCAR UN TOCADISCO
	@GetMapping(value = "/rp-find/{id}")
	public RecordPlayer find(@PathVariable Long id) {
		return recordplayerRepository.getOne(id);
	}

	// GUARDAR NUEVO TOCADISCO
	@PostMapping(value = "/recordplayer/{idUser}/{idProductStatus}")
	public ResponseEntity<RecordPlayer> save(@RequestBody RecordPlayer recordPlayer, @PathVariable Long idUser,
			@PathVariable Long idProductStatus) {
		User user = userRepository.getOne(idUser);
		recordPlayer.setUser(user);
		user.getProducts().add(recordPlayer);

		ProductStatus productStatus = productStatusRepository.getOne(idProductStatus);
		recordPlayer.setProductStatus(productStatus);
		productStatus.getProducts().add(recordPlayer);

		RecordPlayer obj = recordplayerRepository.save(recordPlayer);

		return new ResponseEntity<RecordPlayer>(obj, HttpStatus.OK);
	}

	// Actualizar un tocadisco
	@PostMapping(value = "rp-update/{id}/{idProductStatus}")
	public ResponseEntity<RecordPlayer> update(@PathVariable Long id, @RequestBody RecordPlayer recordPlayer,
			@PathVariable Long idProductStatus) {

		RecordPlayer recordPlayerUpdate = recordplayerRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("No existe el tocadisco" + id));

		recordPlayerUpdate.setDescription(recordPlayer.getDescription());
		recordPlayerUpdate.setName(recordPlayer.getName());
		recordPlayerUpdate.setModel(recordPlayer.getModel());
		recordPlayerUpdate.setBrand(recordPlayer.getBrand());
		recordPlayerUpdate.setYear(recordPlayer.getYear());
		recordPlayerUpdate.setPrice(recordPlayer.getPrice());
		
		ProductStatus productStatus = productStatusRepository.findById(idProductStatus)
				.orElseThrow(() -> new ResourceNotFoundException("No existe el estado" + idProductStatus));
		recordPlayerUpdate.setProductStatus(productStatus);
		productStatus.getProducts().add(recordPlayerUpdate);

		RecordPlayer obj = recordplayerRepository.save(recordPlayerUpdate);
		return new ResponseEntity<RecordPlayer>(obj, HttpStatus.OK);

	}

}
