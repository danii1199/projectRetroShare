package org.proyecto.retroshare.controller;

import java.util.List;

import org.proyecto.retroshare.domain.Chat;
import org.proyecto.retroshare.domain.Role;
import org.proyecto.retroshare.domain.User;
import org.proyecto.retroshare.repositories.ChatRepository;
import org.proyecto.retroshare.repositories.RoleRepository;
import org.proyecto.retroshare.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/retroshare/")
public class ChatRestController {

	// ENLACE BBDD
	@Autowired
	private ChatRepository chatRepository;
	@Autowired
	private UserRepository userRepository;

	// CONSULTA DE TODOS LOS USUARIOS
	@GetMapping(value = "/chat-all")
	public List<Chat> findAll() {
		return chatRepository.findAll();
	}

	// BUSCAR UN USUARIO
	@GetMapping(value = "/char-find/{id}")
	public Chat find(@PathVariable Long id) {
		return chatRepository.getOne(id);
	}

	// GUARDAR NUEVO USUARIO
	@PostMapping(value = "/chat-save/{idUserOwner}/{idUserBuyer}")
	public ResponseEntity<Chat> save(@RequestBody Chat chat,@PathVariable Long idUserOwner,@PathVariable Long idUserBuyer ) {
		
		User user = userRepository.getOne(idUserOwner);

		chat.setUserOwner(user);
		user.getMessageOwner().add(chat);
		
		User user2 = userRepository.getOne(idUserBuyer);

		chat.setUserBuyer(user2);
		user2.getMessageBuyer().add(chat);
		
		Chat obj = chatRepository.save(chat);

		return new ResponseEntity<Chat>(obj, HttpStatus.OK);
	}

}
