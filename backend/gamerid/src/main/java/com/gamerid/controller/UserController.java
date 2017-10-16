package com.gamerid.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gamerid.bean.User;
import com.gamerid.repository.UserRepository;
import com.gamerid.service.UserService;

@Controller
@RequestMapping(path="/api")
public class UserController {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private UserService userService;

	@RequestMapping(value = "/addUser", method = RequestMethod.GET)
	public @ResponseBody String addUser (@RequestParam String username, @RequestParam String password, @RequestParam String email){
		User userExists = userService.findByUsername(username);
		User emailExists = userService.findByEmail(email);
		
		if (userExists != null) {
			System.out.println(username + " já é cadastrado");
			return username + " já é cadastrado";
		}
		
		if (emailExists != null) {
			System.out.println(email + " já é cadastrado");
			return email + " já é cadastrado";
		} 
		
		else{
			User user = new User();
			user.setUsername(username);
			user.setPassword(password);
			user.setEmail(email);
			
			userService.saveUser(user);
			System.out.println("User created:");
			System.out.println(user);
			return "Usuário criado";
		}
		
		// http://localhost:8080/api/addUser?username={}&password={}&email={}
		// http://localhost:8080/api/addUser?username=Martim&password=123456&email=martimfj@al.insper.edu.br
		// Cria um usuário
	}
	
	@RequestMapping(value = "/allUsers", method = RequestMethod.GET)
	public @ResponseBody Iterable<User> getAllUsers() {
		return userRepository.findAll();
		// http://localhost:8080/api/allUsers
		// Retorna um JSON com todos os usuários da DB
	}
	
	@RequestMapping(value = "/deleteUser/{username}", method = RequestMethod.GET)
	public @ResponseBody String deleteUser (@PathVariable("username") String username){
		return userRepository.deleteByUsername(username);
		// http://localhost:8080/api/deleteUser/{username}
		// http://localhost:8080/api/deleteUser/Martim
		// Deleta um usuário em especifico
		
	}
	
	
	@RequestMapping(value = "/editUserPassword", method = RequestMethod.GET)
	public @ResponseBody String editUserPassword (@RequestParam String username, @RequestParam String password){
		userService.setUserPasswordByUsername(password, username);
		return "Senha alterada";
		// http://localhost:8080/api/editUserPassword?username={}&password={}
		// http://localhost:8080/api/editUserPassword?username=Martim&password=123456
		// Edita a senha de um usuário
	}
	
	@RequestMapping(value = "/editUserEmail", method = RequestMethod.GET)
	public @ResponseBody String editUserEmail (@RequestParam String email, @RequestParam String username){
		User emailExists = userService.findByEmail(email);
		
		if (emailExists != null) {
			System.out.println(email + " já é cadastrado");
			return email + " já é cadastrado";
		} 
		else{
			userService.setUserEmailByUsername(email, username);
			return "Email alterado";
		}
		// http://localhost:8080/api/editUserEmail?email={}&username={}
		// http://localhost:8080/api/editUserEmail?email=martim@insper.edu.br&username=Martim
		// Edita o email de um usuário
	}
	
	@RequestMapping(value = "/editUserUsername", method = RequestMethod.GET)
	public @ResponseBody String editUserUsername (@RequestParam String username, @RequestParam String email){
		User userExists = userService.findByUsername(username);
		
		if (userExists != null) {
			System.out.println(username + " já é cadastrado");
			return username + " já é cadastrado";
		} 
		else{
			userService.setUserUsernameByEmail(username, email);
			return "Username alterado";
		}
		// http://localhost:8080/api/editUserUsername?username={}&email={}
		// http://localhost:8080/api/editUserUsername?username=Martim&email=martim@insper.edu.br
		// Edita o nome de usuário de um usuário
	}
}

// Os requests são case sensitive