package mvc.model;

import java.io.*;
import java.sql.*;
import java.util.*;

public class DAO {
	private Connection connection = null;
	
	public DAO() {
		try {
			Class.forName("com.mysql.jdbc.Driver");
			connection = DriverManager.getConnection("jdbc:mysql://localhost/gamerid?verifyServerCertificate=false&useSSL=true", "root", "timl1550s");
		} catch (SQLException | ClassNotFoundException e)
		{e.printStackTrace();}
	}
	
	public void addUser(User user){
		try {
			String sql = "INSERT INTO Users (username, password, email), values(?,?,?)";
			PreparedStatement stmt = connection.prepareStatement(sql);
			stmt.setString(1,user.getUsername());
			stmt.setString(2,user.getPassword());
			stmt.setString(3,user.getEmail());
			stmt.execute();
			stmt.close();
		} catch (SQLException e) {e.printStackTrace();}
	}
	
	public void addGamerTag(User user){
		try {
			String sql = "INSERT INTO Users (steam, riot, battlenet, discord), values(?,?,?,?)";
			PreparedStatement stmt = connection.prepareStatement(sql);
			stmt.setString(1,user.getSteam());
			stmt.setString(2,user.getRiot());
			stmt.setString(3,user.getBattlenet());
			stmt.setString(4,user.getDiscord());
			stmt.execute();
			stmt.close();
		} catch (SQLException e) {e.printStackTrace();}
	}
	
	public void UpdateGamerTag(User user) {
		try {
			String sql = "UPDATE Users SET (steam, riot, battlenet, discord) = values(?,?,?,?) WHERE id=?";
			PreparedStatement stmt = connection.prepareStatement(sql);
			stmt.setString(1,user.getSteam());
			stmt.setString(2,user.getRiot());
			stmt.setString(3,user.getBattlenet());
			stmt.setString(4,user.getDiscord());
			stmt.setInt(4,user.getId());
			stmt.execute();
			stmt.close();
		} catch (SQLException e) {e.printStackTrace();}
	}
	
	public void RemoveGamerTag(User user) {
		try {
			String sql = "UPDATE Users SET (?) = null WHERE id=?";
			PreparedStatement stmt = connection.prepareStatement(sql);
			//Tem que pegar GamerTag a ser alterada: puxar do Json retornado?
			//stmt.setString(1,user.getSteam());
			stmt.setInt(2,user.getId());
			stmt.execute();
			stmt.close();
		} catch (SQLException e) {e.printStackTrace();}
	}
}

