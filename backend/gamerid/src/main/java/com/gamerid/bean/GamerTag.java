package com.gamerid.bean;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity // This tells Hibernate to make a table out of this class
@Table (name = "gamer_tag")
public class GamerTag {
    private @Id @GeneratedValue(strategy=GenerationType.IDENTITY) Long id;
	private String steam;
	private String riot;
	private String battlenet;
	private String discord;
	private User user;
	
	public GamerTag() {}
	
	public GamerTag(String steam, String riot, String battlenet, String discord){
        this.steam = steam;
        this.riot = riot;
        this.battlenet = battlenet;
        this.discord = discord;
	}
		
	public Long getId() {  
		return id;  
	}  
	public void setId(Long id) {  
		this.id = id;  
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
	
	@OneToOne(mappedBy = "gamerTag")
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}

