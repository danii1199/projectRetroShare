package org.proyecto.retroshare.controller;

import java.util.List;

import org.proyecto.retroshare.domain.GameConsole;
import org.proyecto.retroshare.domain.ProductStatus;
import org.proyecto.retroshare.domain.User;
import org.proyecto.retroshare.repositories.GameConsoleRepository;
import org.proyecto.retroshare.repositories.ProductStatusRepository;
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
public class GameConsoleRestController {
	// ENLACE BBDD
	@Autowired
	private GameConsoleRepository gameconsoleRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ProductStatusRepository productStatusRepository;

	// CONSULTA DE TODOS LOS JUEGOS
	@GetMapping(value = "/gc-all")
	public List<GameConsole> findAll() {
		return gameconsoleRepository.findAll();
	}

	// BUSCAR UN JUEGO
	@GetMapping(value = "/gc-find/{id}")
	public GameConsole find(@PathVariable Long id) {
		return gameconsoleRepository.getOne(id);
	}

	// GUARDAR NUEVO JUEGO
	@PostMapping(value = "/gameconsole/{idUser}/{idProductStatus}")
	public ResponseEntity<GameConsole> save(@RequestBody GameConsole gameConsole, @PathVariable Long idUser,
			@PathVariable Long idProductStatus) {
		// User user = userRepository.getOne(idUser);
		User user = userRepository.findById(idUser)
				.orElseThrow(() -> new ResourceNotFoundException("No existe el usuario" + idUser));
		gameConsole.setUserOwner(user);
		user.getProductOwner().add(gameConsole);

		ProductStatus productStatus = productStatusRepository.getOne(idProductStatus);

		gameConsole.setProductStatus(productStatus);
		productStatus.getProducts().add(gameConsole);

		GameConsole obj = gameconsoleRepository.save(gameConsole);

		return new ResponseEntity<GameConsole>(obj, HttpStatus.OK);
	}

	// Actualizar una consola
	@PostMapping(value = "gc-update/{id}/{idProductStatus}")
	public ResponseEntity<GameConsole> update(@PathVariable Long id, @RequestBody GameConsole gameConsole,
			@PathVariable Long idProductStatus) {

		GameConsole gameConsoleUpdate = gameconsoleRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("No existe la consola " + id));

		gameConsoleUpdate.setDescription(gameConsole.getDescription());
		gameConsoleUpdate.setName(gameConsole.getName());
		gameConsoleUpdate.setPrice(gameConsole.getPrice());
		gameConsoleUpdate.setYear(gameConsole.getYear());

		ProductStatus productStatus = productStatusRepository.findById(idProductStatus)
				.orElseThrow(() -> new ResourceNotFoundException("No existe el estado" + idProductStatus));
		gameConsoleUpdate.setProductStatus(productStatus);
		productStatus.getProducts().add(gameConsoleUpdate);

		GameConsole obj = gameconsoleRepository.save(gameConsoleUpdate);
		return new ResponseEntity<GameConsole>(obj, HttpStatus.OK);

	}

}
