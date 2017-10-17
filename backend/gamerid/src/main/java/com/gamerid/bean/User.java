package com.gamerid.bean;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

// https://hellokoding.com/jpa-one-to-one-foreignkey-relationship-example-with-spring-boot-maven-and-mysql/
// https://stackoverflow.com/questions/38696214/how-to-model-a-one-to-one-relationship-in-jpa-when-the-parent-table-has-a-comp
// https://www.dineshonjava.com/spring-crud-example-using-one-to-one/
// https://hellokoding.com/registration-and-login-example-with-spring-security-spring-boot-spring-data-jpa-hsql-jsp/
// https://www.mkyong.com/hibernate/hibernate-one-to-one-relationship-example-annotation/

@Entity // This tells Hibernate to make a table out of this class
@Table(name = "user", catalog = "gamerid", uniqueConstraints = 
		@UniqueConstraint(columnNames = {"username","password","email"}))

public class User {
    private Long userId;
	private String username;
	private String password;
	private String email;
	private GamerTag gamerTag;

	public User() {}
	
	public User(String username, String password, String email){
		this.username = username;
		this.password = password;
		this.email = email;
	}
	
	public User(String username, String password, String email, GamerTag gamerTag){
		this.username = username;
		this.password = password;
		this.email = email;
		this.gamerTag = gamerTag;
	}
	
	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "user_id", unique = true, nullable = false)
	public Long getUserId() {  
		return userId;  
	}  
	public void setUserId(Long userId) {  
		this.userId = userId;  
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
	@OneToOne(fetch = FetchType.LAZY, mappedBy = "user", cascade = CascadeType.ALL)
	public GamerTag getGamerTag() {
		return gamerTag;
	}
	public void setGamerTag(GamerTag gamerTag) {
		this.gamerTag = gamerTag;
	}
}
