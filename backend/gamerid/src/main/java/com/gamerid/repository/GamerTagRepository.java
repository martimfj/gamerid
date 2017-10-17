package com.gamerid.repository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.gamerid.bean.GamerTag;
import com.gamerid.bean.User;

public interface GamerTagRepository extends CrudRepository<GamerTag, Long> {
	@Transactional
	User findBySteam(@Param("steam") String steam);
	
	@Transactional
	User findByRiot(@Param("riot") String riot);
	
	@Transactional
	User findByBattlenet(@Param("battlenet")String battlenet);
	
	@Transactional
	User findByDiscord(@Param("discord")String discord);

	@Modifying
	@Transactional
	@Query("update gamer_tag u set u.steam = Null where u.steam = ?1 where u.steam = ?2")
	void setSteam(String steam, String updatedValue);
	
	@Modifying
	@Transactional
	@Query("update gamer_tag u set u.riot = Null where u.riot = ?1 where u.riot = ?2")
	void serRiot(String riot, String updatedValue);
	
	@Modifying
	@Transactional
	@Query("update gamer_tag u set u.battlenet = Null where u.battlenet = ?1 where u.battlenet = ?2")
	void serBattlenet(String battlenet, String updatedValue);
	
	@Modifying
	@Transactional
	@Query("update gamer_tag u set u.discord = Null where u.discord = ?1 where u.discord = ?2")
	void serDiscord(String discord, String updatedValue);
}

