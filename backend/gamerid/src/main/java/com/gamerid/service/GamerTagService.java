package com.gamerid.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.gamerid.bean.User;
import com.gamerid.repository.UserRepository;

@Service("gamertagService")
public class GamerTagService {
	private UserRepository userRepository;
	
    @Autowired
    public GamerTagService(UserRepository userRepository) { 
    	this.userRepository = userRepository;
    }
   
	public User findBySteam(String steam) {
		return userRepository.findBySteam(steam);
	}
	public User findByRiot(String riot) {
		return userRepository.findByRiot(riot);
	}
	public User findByBattlenet(String battlenet) {
		return userRepository.findByBattlenet(battlenet);
	}
	public User findByDiscord(String discord) {
		return userRepository.findByDiscord(discord);
	}
	
	public void setSteam(String steam, String username) {
		userRepository.setSteam(steam, username);
	}
	public void setRiot(String riot, String username) {
		userRepository.setRiot(riot, username);
	}
	public void setBattlenet(String battlenet, String username) {
		userRepository.setBattlenet(battlenet, username);
	}
	public void setDiscord(String discord, String username) {
		userRepository.setDiscord(discord, username);
	}


}
