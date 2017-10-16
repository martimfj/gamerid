package com.gamerid.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gamerid.bean.GamerTag;
import com.gamerid.repository.GamerTagRepository;

@Controller    // This means that this class is a Controller
@RequestMapping(path="/api") // This means URL's start with /api (after Application path)
public class GamerTagController {
	@Autowired
	private GamerTagRepository gamertagRepository;
	
	@GetMapping(path="/addGamerTag") // Map ONLY GET Requests
	public @ResponseBody String addNewGamerTag (@RequestParam String steam, @RequestParam String riot, @RequestParam String battlenet, @RequestParam String discord) {

		GamerTag gamertag = new GamerTag();
		gamertag.setSteam(steam);
		gamertag.setRiot(riot);
		gamertag.setBattlenet(battlenet);
		gamertag.setDiscord(discord);
		
		gamertagRepository.save(gamertag);
		return "GamerTag Saved";
	}
	// http://localhost:8080/api/addGamerTag?steam=gohard&riot=123456&battlenet=martimfj@al.insper.edu.br&discord=Martim#1251
	
	@GetMapping(path="/allGamerTags")
	public @ResponseBody Iterable<GamerTag> getAllGamerTags() {
		// This returns a JSON or XML with the users
		return gamertagRepository.findAll();
	}
}
