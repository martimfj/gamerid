package com.gamerid.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gamerid.bean.User;
import com.gamerid.repository.UserRepository;

@Service("userService")
public class UserService {

	private UserRepository userRepository;
	
    @Autowired
    public UserService(UserRepository userRepository) { 
    	this.userRepository = userRepository;
    }
    
	public User findByEmail(String email) {
		return userRepository.findByEmail(email);
	}
	
	public User findByUsername(String username) {
		return userRepository.findByUsername(username);
	}
	
	public String deleteByUsername(String username) {
		return userRepository.deleteByUsername(username);
	}
	
	public String deleteByEmail(String username) {
		return userRepository.deleteByUsername(username);
	}
	
	public void saveUser(User user) {
		userRepository.save(user);
	}
	
	public void setUserPasswordByUsername(String password, String username) {
		userRepository.setUserPasswordByUsername(password, username);
	}
	
	public void setUserEmailByUsername(String email, String username) {
		userRepository.setUserEmailByUsername(email, username);
	}
	
	public void setUserUsernameByEmail(String username, String email) {
		userRepository.setUserUsernameByEmail(username, email);
	}	
}