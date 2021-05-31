package org.proyecto.retroshare.controller;

import java.util.List;

import org.proyecto.retroshare.domain.ProductStatus;
import org.proyecto.retroshare.domain.User;
import org.proyecto.retroshare.domain.Vinyl;
import org.proyecto.retroshare.repositories.ProductStatusRepository;
import org.proyecto.retroshare.repositories.UserRepository;
import org.proyecto.retroshare.repositories.VinylRepository;
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
public class VinylRestController {
	// ENLACE BBDD
	@Autowired
	private VinylRepository vinylRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ProductStatusRepository productStatusRepository;

	// CONSULTA DE TODOS LOS VINILOS
	@GetMapping(value = "/v-all")
	public List<Vinyl> findAll() {
		return vinylRepository.findAll();
	}

	// BUSCAR UN VINILO
	@GetMapping(value = "/v-find/{id}")
	public Vinyl find(@PathVariable Long id) {
		return vinylRepository.getOne(id);
	}

	// GUARDAR NUEVO VINILO
	@PostMapping(value = "/vinyl/{idUser}/{idProductStatus}")
	public ResponseEntity<Vinyl> save(@RequestBody Vinyl vinyl, @PathVariable Long idUser,
			@PathVariable Long idProductStatus) {
		User user = userRepository.getOne(idUser);
		vinyl.setUserOwner(user);
		user.getProductOwner().add(vinyl);

		ProductStatus productStatus = productStatusRepository.getOne(idProductStatus);
		vinyl.setProductStatus(productStatus);
		productStatus.getProducts().add(vinyl);

		Vinyl obj = vinylRepository.save(vinyl);

		return new ResponseEntity<Vinyl>(obj, HttpStatus.OK);
	}

	// Actualizar un vinilo
	@PostMapping(value = "v-update/{id}/{idProductStatus}")
	public ResponseEntity<Vinyl> update(@PathVariable Long id, @RequestBody Vinyl vinyl,
			@PathVariable Long idProductStatus) {

		Vinyl vinylUpdate = vinylRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("No existe el vinilo" + id));

		vinylUpdate.setDescription(vinyl.getDescription());
		vinylUpdate.setName(vinyl.getName());
		vinylUpdate.setArtists(vinyl.getArtists());
		vinylUpdate.setSongs(vinyl.getSongs());
		vinylUpdate.setYear(vinyl.getYear());
		vinylUpdate.setPrice(vinyl.getPrice());
		
		ProductStatus productStatus = productStatusRepository.findById(idProductStatus)
				.orElseThrow(() -> new ResourceNotFoundException("No existe el estado" + idProductStatus));
		vinylUpdate.setProductStatus(productStatus);
		productStatus.getProducts().add(vinylUpdate);

		Vinyl obj = vinylRepository.save(vinylUpdate);
		return new ResponseEntity<Vinyl>(obj, HttpStatus.OK);

	}

}
