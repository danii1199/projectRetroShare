package org.proyecto.retroshare.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.proyecto.retroshare.domain.Game;
import org.proyecto.retroshare.domain.ProductStatus;
import org.proyecto.retroshare.domain.User;
import org.proyecto.retroshare.repositories.GameRepository;
import org.proyecto.retroshare.repositories.ProductStatusRepository;
import org.proyecto.retroshare.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/retroshare/")
public class GameRestController {

	// ENLACE BBDD
	@Autowired
	private GameRepository gameRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ProductStatusRepository productStatusRepository;

	// CONSULTA DE TODOS LOS JUEGOS
	@GetMapping(value = "/g-all")
	public List<Game> findAll() {
		return gameRepository.findAll();
	}

	// BUSCAR UN JUEGO
	@GetMapping(value = "/g-find/{id}")
	public Game find(@PathVariable Long id) {
		return gameRepository.getOne(id);
	}

	// GUARDAR NUEVO JUEGO
	@PostMapping(value = "/game/{idUser}/{idProductStatus}")
	public ResponseEntity<Game> save(@ModelAttribute Game game, @PathVariable Long idUser,
			@PathVariable Long idProductStatus, @ModelAttribute("files") MultipartFile[] files) {
		
		for (MultipartFile file : files) {
			
				try {
					saveUploadedFile(file);
					//game.setImages(file.getName()
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
		}	
		
		// User user = userRepository.getOne(idUser);
		User user = userRepository.findById(idUser)
				.orElseThrow(() -> new ResourceNotFoundException("No existe el user" + idUser));
		game.setUserOwner(user);
		user.getProductOwner().add(game);

		ProductStatus productStatus = productStatusRepository.getOne(idProductStatus);
		game.setProductStatus(productStatus);
		productStatus.getProducts().add(game);

		Game obj = gameRepository.save(game);

		return new ResponseEntity<Game>(obj, HttpStatus.OK);
	}

	// Actualizar un juego
	@PostMapping(value = "g-update/{id}/{idProductStatus}")
	public ResponseEntity<Game> update(@PathVariable Long id, @RequestBody Game game,
			@PathVariable Long idProductStatus) {

		Game gameUpdate = gameRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("No existe el juego" + id));

		gameUpdate.setDescription(game.getDescription());
		gameUpdate.setName(game.getName());
		gameUpdate.setGender(game.getGender());
		gameUpdate.setPrice(game.getPrice());
		gameUpdate.setDeveloper(game.getDeveloper());

		ProductStatus productStatus = productStatusRepository.findById(idProductStatus)
				.orElseThrow(() -> new ResourceNotFoundException("No existe el estado" + idProductStatus));
		gameUpdate.setProductStatus(productStatus);
		productStatus.getProducts().add(gameUpdate);

		Game obj = gameRepository.save(gameUpdate);
		return new ResponseEntity<Game>(obj, HttpStatus.OK);

	}

	private void saveUploadedFile(MultipartFile file) throws IOException {
		if (!file.isEmpty()) {
			byte[] bytes = file.getBytes();
			Path path = Paths.get("../retroshareProyect/src/main/ui/public/" + file.getOriginalFilename());
			Files.write(path, bytes);
		}
	}

}
