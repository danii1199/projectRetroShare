package org.proyecto.retroshare.controller;

import java.util.Calendar;
import java.util.Date;

import org.proyecto.retroshare.domain.ProductStatus;
import org.proyecto.retroshare.domain.Role;
import org.proyecto.retroshare.domain.User;
import org.proyecto.retroshare.repositories.GameConsoleRepository;
import org.proyecto.retroshare.repositories.GameRepository;
import org.proyecto.retroshare.repositories.ProductStatusRepository;
import org.proyecto.retroshare.repositories.RecordPlayerRepository;
import org.proyecto.retroshare.repositories.RoleRepository;
import org.proyecto.retroshare.repositories.UserRepository;
import org.proyecto.retroshare.repositories.VinylRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/retroshare/")
public class AnonymousController {

	@Autowired
	private RecordPlayerRepository recordplayerRepository;

	@Autowired
	private VinylRepository vinylRepository;

	@Autowired
	private GameRepository gameRepository;

	@Autowired
	private GameConsoleRepository gameconsoleRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private ProductStatusRepository productStatusRepository;

	@GetMapping("/init")
	public String init() {

		Role admin = new Role("ADMIN");
		Role usuario = new Role("USER");
		roleRepository.save(admin);
		roleRepository.save(usuario);

		Calendar fecha = Calendar.getInstance();

		User user1 = new User("David", "Pliego", "AbunaiSan", "david", "hombre", "Calle Falsa", 28830, "Madrid",
				"España", 666888444, "david@david.es", "avatar1.jpg", fecha);
		User user2 = new User("Pepe", "Pelas", "PepePelas", "pepe", "hombre", "Calle Falsa", 28830, "Madrid", "España",
				666898444, "pepe@pepe.es", "avatar.jpg", fecha);

		user1.setRole(admin);
		user2.setRole(usuario);

		String pwd1 = user1.getPassword();
		String pwdEncript1 = new BCryptPasswordEncoder().encode(pwd1);

		String pwd2 = user2.getPassword();
		String pwdEncript2 = new BCryptPasswordEncoder().encode(pwd2);

		user1.setPassword(pwdEncript1);
		user2.setPassword(pwdEncript2);

		userRepository.save(user1);
		userRepository.save(user2);

		ProductStatus nuevo = new ProductStatus("Nuevo");
		ProductStatus casiNuevo = new ProductStatus("Casi Nuevo");
		ProductStatus algoDanado = new ProductStatus("Algo Dañado");
		ProductStatus viejo = new ProductStatus("Viejo");

		productStatusRepository.save(nuevo);
		productStatusRepository.save(casiNuevo);
		productStatusRepository.save(algoDanado);
		productStatusRepository.save(viejo);

		return "redirect:/";

	}

}
