package com.gamerid.bean;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

// https://hellokoding.com/jpa-one-to-one-foreignkey-relationship-example-with-spring-boot-maven-and-mysql/
// https://stackoverflow.com/questions/38696214/how-to-model-a-one-to-one-relationship-in-jpa-when-the-parent-table-has-a-comp
// https://www.dineshonjava.com/spring-crud-example-using-one-to-one/

@Entity // This tells Hibernate to make a table out of this class
public class User {
    private @Id @GeneratedValue(strategy=GenerationType.IDENTITY) Long id;
	private String username;
	private String password;
	private String email;
	
	@OneToOne(mappedBy = "u")
	private GamerTag gamerTag;

	public User() {}
	
	public User(String username, String password, String email, GamerTag gamerTag){
		this.username = username;
		this.password = password;
		this.email = email;
		this.gamerTag = gamerTag;
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
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "id")
	public GamerTag getGamerTag() {
		return gamerTag;
	}
	public void setGamerTag(GamerTag gamerTag) {
		this.gamerTag = gamerTag;
	}
}
