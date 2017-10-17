package com.gamerid.bean;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;
import javax.persistence.PrimaryKeyJoinColumn;

@Entity // This tells Hibernate to make a table out of this class
@Table(name = "gamer_tag", catalog = "gamerid")
public class GamerTag {
    private Long userId;
	private String steam;
	private String riot;
	private String battlenet;
	private String discord;
	private User user;
	
	public GamerTag() {}
	
	public GamerTag(User user, String steam, String riot, String battlenet, String discord){
        this.user = user;
		this.steam = steam;
        this.riot = riot;
        this.battlenet = battlenet;
        this.discord = discord;
	}

	@GeneratedValue(generator = "generator")
	@GenericGenerator(name = "generator", strategy = "foreign", parameters = @Parameter(name = "property", value = "user"))
	@Id
	@Column(name = "user_id", unique = true, nullable = false)
	public Long getUserId() {  
		return userId;  
	}  
	public void setUserId(Long userId) {  
		this.userId = userId;  
	}
	@OneToOne(fetch = FetchType.LAZY)
	@PrimaryKeyJoinColumn
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
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
}

