package org.proyecto.retroshare.controller;

import java.io.IOException;
import java.util.Calendar;
import java.util.List;

import javax.mail.MessagingException;

import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.proyecto.retroshare.config.JwtTokenProvider;
import org.proyecto.retroshare.domain.Role;
import org.proyecto.retroshare.domain.User;
import org.proyecto.retroshare.repositories.RoleRepository;
import org.proyecto.retroshare.repositories.UserRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.proyecto.retroshare.service.EmailSenderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/retroshare/")
public class UserRestController {
	
	private static Logger log = LoggerFactory.getLogger(UserRestController.class);
	// ENLACE BBDD
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private EmailSenderService service;
	
	@Autowired
	private JwtTokenProvider tokenProvider;

	// CONSULTA DE TODOS LOS USUARIOS
	@GetMapping(value = "all")
	public List<User> findAll() {
		return userRepository.findAll();
	}

	// BUSCAR UN USUARIO
	@GetMapping(value = "/find/{id}")
	public User find(@PathVariable Long id) {
		return userRepository.getOne(id);
	}
	
	//BUSCAR POR CORREO
	@GetMapping(value = "/find-email/{email}")
	public User find(@PathVariable String email) {
		return userRepository.findByEmail(email);
	}
	

	// GUARDAR NUEVO USUARIO
	@PostMapping(value = "/save/{idRole}")
	public ResponseEntity<User> save(@RequestBody User user, @PathVariable Long idRole) throws MessagingException {

		/* PASSWORD ENCRIPTADA */
		String pwd = user.getPassword();
		String pwdEncript = new BCryptPasswordEncoder().encode(pwd);
		user.setPassword(pwdEncript);

		Role role = roleRepository.findById(idRole)
				.orElseThrow(() -> new ResourceNotFoundException("No existe el rol" + idRole));
		user.setRole(role);
		role.getUsers().add(user);
		
		
		Calendar fecha=Calendar.getInstance();
		
		user.setDate(fecha);
		
		user.setVerificate("false");
		
		service.sendSimpleEmail(user.getEmail(),"<html><body>"
        		+ "<p>Para verificar este correo pulsa el siguiente link de enlace</p>"
        		+ "<br>"
        		+ "<a href='retroshare-m8dimk8bq-danii1199.vercel.app/verification/"+user.getUserName()+"'>Pulsa aqui</a>"
        		+ "</body></html>");
		
		User obj = userRepository.save(user);
		return new ResponseEntity<User>(obj, HttpStatus.OK);
	}

	// Actualizar un ususario
	@PostMapping(value = "/update/{id}")
	public ResponseEntity<User> update(@PathVariable Long id, @RequestBody User user,
			@RequestPart(name = "file", required = false) MultipartFile file) throws IOException {

		User userUpdate = userRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("No existe el usuario" + id));

		//userUpdate.setFirstName(user.getFirstName());
		//userUpdate.setLastName(user.getLastName());
		userUpdate.setUserName(user.getUserName());
		//userUpdate.setPassword(user.getPassword());
		userUpdate.setSex(user.getSex());
		userUpdate.setAddress(user.getAddress());
		userUpdate.setZipCode(user.getZipCode());
		userUpdate.setCity(user.getCity());
		userUpdate.setCountry(user.getCountry());
		userUpdate.setPhoneNumber(user.getPhoneNumber());
		//userUpdate.setEmail(user.getEmail());
		userUpdate.setAvatar(user.getAvatar());

		/* FOTO USUARIO */
		/*if (!file.isEmpty()) {
			String ruta = "\\src\\main\\resources\\static\\img\\users";
			Long contador = userRepository.count() + 1;
			try {
				byte[] bytes = file.getBytes();
				Path rutaAbsoluta = Paths.get(ruta + "//" + contador + "-" + user.getClass().getSimpleName() + "-"
						+ file.getOriginalFilename());
				Files.write(rutaAbsoluta, bytes);

				user.setAvatar(contador + "-" + user.getClass().getSimpleName() + "-" + file.getOriginalFilename());
			} catch (Exception e) {
				// TODO: handle exception
			}
		}*/
		User obj = userRepository.save(userUpdate);
		return new ResponseEntity<User>(obj, HttpStatus.OK);

	}

	// BORRAR UN USUARIO
	@PostMapping(value = "/delete/{id}")
	public String delete(@PathVariable Long id) {
		User user = userRepository.getOne(id);
		if (user != null) {
			userRepository.delete(user);
		}
		return "redirect:all";
	}

	@PostMapping(value = "/login", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<String> authenticate(@RequestBody User user) {
		log.info("UserResourceImpl : authenticate");
		JSONObject jsonObject = new JSONObject();
		try {
			Authentication authentication = authenticationManager
					.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
			if (authentication.isAuthenticated()) {
				String email = user.getEmail();
				User usuario = userRepository.findByEmail(user.getEmail());
				jsonObject.put("id", usuario.getId());
				jsonObject.put("name", authentication.getName());
				jsonObject.put("authorities", authentication.getAuthorities());
				jsonObject.put("token", tokenProvider.createToken(email, userRepository.findByEmail(email).getRole()));
				return new ResponseEntity<String>(jsonObject.toString(), HttpStatus.OK);

			}
		} catch (JSONException e) {
			try {
				jsonObject.put("exception", e.getMessage());
			} catch (JSONException e1) {
				e1.printStackTrace();
			}
			return new ResponseEntity<String>(jsonObject.toString(), HttpStatus.UNAUTHORIZED);
		}
		return null;
	}
	
	

	// Actualizar un juego
		@PostMapping(value = "verification/{userName}")
		public ResponseEntity<User> update(@PathVariable String userName) {

			User userUpadate= userRepository.findByUserName(userName);

			userUpadate.setVerificate("true");


			User obj = userRepository.save(userUpadate);
			return new ResponseEntity<User>(obj, HttpStatus.OK);

		}
		
		// Actualizar un juego
				@PostMapping(value = "disabled/{id}")
				public ResponseEntity<User> update(@PathVariable Long id) {
					Long num=(long) 3;
					User userUpadate= userRepository.getOne(id);
					Role role= roleRepository.getOne(num);

					userUpadate.setRole(role);
					role.getUsers().add(userUpadate);


					User obj = userRepository.save(userUpadate);
					return new ResponseEntity<User>(obj, HttpStatus.OK);

				}

}
