package com.gamerid.repository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.gamerid.bean.User;

public interface UserRepository extends CrudRepository<User, Long> {
	@Transactional
	User findByUsername(@Param("username") String username);
	
	@Transactional
	User findByEmail(@Param("email")String email);

	@Transactional
	String deleteByUsername(@Param("username") String username);
	
	@Modifying
    @Transactional
    @Query("delete from User u where u.email = ?1")
    void deleteUsersByEmail(String email);
	
	@Modifying
	@Transactional
	@Query("update User u set u.password = ?1 where u.username = ?2")
	void setUserPasswordByUsername(String password, String username);
	
	@Modifying
	@Transactional
	@Query("update User u set u.email = ?1 where u.username = ?2")
	void setUserEmailByUsername(String email, String username);

	@Modifying
	@Transactional
	@Query("update User u set u.username = ?1 where u.email = ?2")
	void setUserUsernameByEmail(String username, String email);
}

