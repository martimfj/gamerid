package com.gamerid.bean;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity // This tells Hibernate to make a table out of this class
public class User {
    private @Id @GeneratedValue(strategy=GenerationType.IDENTITY) Long id;
	private String username;
	private String password;
	private String email;
	private String steam;
	private String riot;
	private String battlenet;
	private String discord;
	private String avatar;
	
	public User() {}
	
	public User(String username, String password, String email, String steam, String riot, String battlenet, String discord, String avatar){
		this.username = username;
		this.password = password;
		this.email = email;
		this.steam = steam;
        this.riot = riot;
        this.battlenet = battlenet;
        this.discord = discord;
        this.avatar = avatar;
	}
	
	public Long getId() {  
		return id;  
	}  
	public void setId(Long id) {  
		this.id = id;  
	} 
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getSteam() {
		return steam;
	}
	public void setSteam(String steam) {
		this.steam = steam;
	}
	public String getRiot() {
		return riot;
	}
	public void setRiot(String riot) {
		this.riot = riot;
	}
	public String getBattlenet() {
		return battlenet;
	}
	public void setBattlenet(String battlenet) {
		this.battlenet = battlenet;
	}
	public String getDiscord() {
		return discord;
	}
	public void setDiscord(String discord) {
		this.discord = discord;
	}
	public String getAvatar() {
		return avatar;
	}
	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}
}