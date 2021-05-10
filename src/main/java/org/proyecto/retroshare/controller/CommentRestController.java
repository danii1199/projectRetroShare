package org.proyecto.retroshare.controller;

import java.util.List;

import org.proyecto.retroshare.domain.Comment;
import org.proyecto.retroshare.domain.Product;
import org.proyecto.retroshare.domain.User;
import org.proyecto.retroshare.repositories.CommentRepository;
import org.proyecto.retroshare.repositories.ProductRepository;
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
public class CommentRestController {

	// ENLACE BBDD
	@Autowired
	private CommentRepository commentRepository;

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private ProductRepository productRepository;

	// CONSULTA DE TODOS LOS JUEGOS
	@GetMapping(value = "/comment-all")
	public List<Comment> findAll() {
		return commentRepository.findAll();
	}

	// BUSCAR UN JUEGO
	@GetMapping(value = "/comment-find/{id}")
	public Comment find(@PathVariable Long id) {
		return commentRepository.getOne(id);
	}

	// GUARDAR NUEVO JUEGO
	@PostMapping(value = "/comment/{idUser}/{idProduct}")
	public ResponseEntity<Comment> save(@RequestBody Comment comment, @PathVariable Long idUser,
			@PathVariable Long idProduct) {

		// User user = userRepository.getOne(idUser);
		User user = userRepository.findById(idUser)
				.orElseThrow(() -> new ResourceNotFoundException("No existe el user" + idUser));
		comment.setUserComment(user);
		user.getComments().add(comment);

		Product product= productRepository.getOne(idProduct);
		comment.setProductComment(product);
		product.getComments().add(comment);

		Comment obj = commentRepository.save(comment);

		return new ResponseEntity<Comment>(obj, HttpStatus.OK);
	}

	// Actualizar un juego
	@PostMapping(value = "comment-update/{id}")
	public ResponseEntity<Comment> update(@PathVariable Long id, @RequestBody Comment comment) {

		Comment commentUpdate = commentRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("No existe el comentario" + id));

		commentUpdate.setComment_text(comment.getComment_text());
		commentUpdate.setComment_date(comment.getComment_date());


		Comment obj = commentRepository.save(commentUpdate);
		return new ResponseEntity<Comment>(obj, HttpStatus.OK);

	}

}
