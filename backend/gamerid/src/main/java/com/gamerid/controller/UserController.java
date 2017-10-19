package com.gamerid.controller;


import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.gamerid.bean.User;
import com.gamerid.repository.UserRepository;
import com.gamerid.service.GamerTagService;
import com.gamerid.service.UserService;

@RestController
@Controller
@RequestMapping(path="/api")
public class UserController {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private UserService userService;
	@Autowired
	private GamerTagService gamertagService;

	//@RequestParam(value = "discord", required=false) String discord) -> Caso o Parâmetro não seja obrigatorio
	@RequestMapping(value = "/addUser", method = {RequestMethod.GET, RequestMethod.POST})
	public ResponseEntity<User> addUser (@RequestParam String username, @RequestParam String password, @RequestParam String email, @RequestParam String steam, @RequestParam String riot, @RequestParam String battlenet, @RequestParam String discord){
		User userExists = userService.findByUsername(username);
		User emailExists = userService.findByEmail(email);
		User user = new User();
		user.setPassword(password);
		user.setAvatar(null);
		
		if (userExists != null) {
			System.out.println(username + " já é cadastrado");
			return new ResponseEntity<User>(HttpStatus.BAD_REQUEST);
		}else{user.setUsername(username);}
		
		if (emailExists != null) {
			System.out.println(email + " já é cadastrado");
			return new ResponseEntity<User>(HttpStatus.BAD_REQUEST);
		}else{user.setEmail(email);}
		
		if(steam.equals("null")){
			user.setSteam(null);
			System.out.println("Nenhuma SteamID passada no cadastro");
		}
		else{
			User steamExists = gamertagService.findBySteam(steam);
			if (steamExists != null){
				System.out.println(steam+" GamerTag já é cadastrada");
				return new ResponseEntity<User>(HttpStatus.BAD_REQUEST);
			}else{user.setSteam(steam);}
		}
		
		if(riot.equals("null")){
			user.setRiot(null);
			System.out.println("Nenhuma RiotID passada no cadastro");
		}
		else{
			User riotExists = gamertagService.findByRiot(riot);
			if (riotExists != null){
				System.out.println(riot+" GamerTag já é cadastrada");
				return new ResponseEntity<User>(HttpStatus.BAD_REQUEST);
			}else{user.setRiot(riot);}
		}
		
		if(battlenet.equals("null")){
			user.setBattlenet(null);
			System.out.println("Nenhuma BattlenetID passada no cadastro");
		}
		else{
			User battlenetExists = gamertagService.findByBattlenet(battlenet);
			if (battlenetExists != null){
				System.out.println(battlenet+" GamerTag já é cadastrada");
				return new ResponseEntity<User>(HttpStatus.BAD_REQUEST);
			}else{user.setBattlenet(battlenet);}
		}
		
		if(discord.equals("null")){
			user.setDiscord(null);
			System.out.println("Nenhuma DiscordID passada no cadastro");
		}
		else{
			User discordExists = gamertagService.findByDiscord(discord);
			if (discordExists != null){
				System.out.println(discord+" GamerTag já é cadastrada");
				return new ResponseEntity<User>(HttpStatus.BAD_REQUEST);
			}else{user.setDiscord(discord);}
		}
			
		userService.saveUser(user);
		System.out.println("User created:");
		System.out.println(user);
		return new ResponseEntity<User>(user, HttpStatus.OK);
		
		// http://localhost:8080/api/addUser?username={}&password={}&email={}&steam={}&riot={}&battlenet={}&discord={}
		// Cria um usuário
		// Discord param = Nome + %23 + Número
		// Check http://www.eso.org/~ndelmott/url_encode.html for other representations
	}
	
	@RequestMapping(value = "/login", method = {RequestMethod.GET, RequestMethod.POST})
    public ResponseEntity<User> login(@RequestParam String username, @RequestParam String password){
        System.out.println("Autenticando username: " + username + " | password: " + password);
        User userExists = userService.findByUsername(username);
        if (userExists != null) {
            System.out.println(username + " é cadastrado");
            if (Objects.equals(userExists.getPassword(), password)){
                System.out.println("Senha verificada");
                return new ResponseEntity<User>(userExists, HttpStatus.OK);
            } else{
                System.out.println("Senha errada");
                return new ResponseEntity<User>(HttpStatus.BAD_REQUEST);
            }
        } else {
            System.out.println(username + " não é cadastrado");
            return new ResponseEntity<User>(HttpStatus.BAD_REQUEST);
        } 
    }
	
	@RequestMapping(value = "/avatar", method = {RequestMethod.GET, RequestMethod.POST})
    public ResponseEntity<String> avatar(@RequestParam String username){
        System.out.println("username: " + username);
        User userExists = userService.findByUsername(username);
        String avatar = userExists.getAvatar();
        userService.setUserAvatarByUsername(avatar, username);
        return new ResponseEntity<String>(avatar, HttpStatus.OK);
    }
	
	@RequestMapping(value = "/setAvatar", method = {RequestMethod.GET, RequestMethod.POST})
    public String avatar(@RequestParam String username, String avatar){
        System.out.println("username: " + username);
        User userExists = userService.findByUsername(username);
        if (userExists != null) {
        	userService.setUserAvatarByUsername(avatar, username);
        	return "Novo avatar setado";
        } else {
        	return "Usuario nao encontrado";
        }
        
       
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
		// Deleta um usuário em especifico
	}
	
	@RequestMapping(value = "/editUserPassword", method = RequestMethod.GET)
	public @ResponseBody String editUserPassword (@RequestParam String username, @RequestParam String password){
		userService.setUserPasswordByUsername(password, username);
		return "Senha alterada";
		// http://localhost:8080/api/editUserPassword?username={}&password={}
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
		// Edita o nome de usuário de um usuário
	}
	
	// -------------------------- Gamertag -------------------------- //
	
	@RequestMapping(value = "/setSteamID", method = RequestMethod.GET)
	public @ResponseBody String setSteamID (@RequestParam String steam, String username){
		User steamExists = gamertagService.findBySteam(steam);
		
		if (steamExists != null) {
			System.out.println(steam + " já é cadastrado");
			return steam + " já é cadastrado";
		}
				
		else{
			gamertagService.setSteam(steam, username);
			return "SteamID criado";
		}
		// http://localhost:8080/api/setSteamID?steam={}&username={}
		// Cria a um SteamID
	}
	
	@RequestMapping(value = "/setRiotID", method = RequestMethod.GET)
	public @ResponseBody String setRiotID (@RequestParam String riot, String username){
		User riotExists = gamertagService.findByRiot(riot);
		
		if (riotExists != null) {
			System.out.println(riot + " já é cadastrado");
			return riot + " já é cadastrado";
		}
				
		else{
			gamertagService.setRiot(riot, username);
			return "RiotID criado";
		}
		// http://localhost:8080/api/setRiotID?riot={}&username={}
		// Cria a um RiotID
	}
	
	@RequestMapping(value = "/setBattlenetID", method = RequestMethod.GET)
	public @ResponseBody String setBattlenetID (@RequestParam String battlenet, String username){
		User battlenetExists = gamertagService.findByBattlenet(battlenet);
		
		if (battlenetExists != null) {
			System.out.println(battlenet + " já é cadastrado");
			return battlenet + " já é cadastrado";
		}
				
		else{
			gamertagService.setRiot(battlenet, username);
			return "BattlenetID criado";
		}
		// http://localhost:8080/api/setBattlenetID?battlenet={}&username={}
		// Cria a um BattlenetID
	}
	
	@RequestMapping(value = "/setDiscordID", method = RequestMethod.GET)
	public @ResponseBody String setDiscordID (@RequestParam String discord, String username){
		User discordExists = gamertagService.findByDiscord(discord);
		
		if (discordExists != null) {
			System.out.println(discord + " já é cadastrado");
			return discord + " já é cadastrado";
		}
				
		else{
			gamertagService.setDiscord(discord, username);
			return "DiscordID criado";
		}
		// http://localhost:8080/api/setDiscordID?discord={}&username={}
		// Cria a um DiscordID
	}
}

// ATENÇÃO: Os requests são case sensitive