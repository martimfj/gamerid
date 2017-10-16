package com.gamerid.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gamerid.repository.GamerTagRepository;

@Service("gamertagService")
public class GamerTagService {

	private GamerTagRepository gamertagRepository;
	
    @Autowired
    public GamerTagService(GamerTagRepository gamertagRepository) { 
    	this.gamertagRepository = gamertagRepository;
    }

}
