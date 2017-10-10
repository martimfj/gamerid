package mvc.model;

import java.io.*;
import java.sql.*;
import java.util.*;
import org.springframework.web.multipart.MultipartFile;

public class UsuarioDAO {
	private Connection connection = null;
	
	public UsuarioDAO() {
		try {
			 Class.forName("com.mysql.jdbc.Driver");
			 connection = DriverManager.getConnection(
			 "jdbc:mysql://localhost/gamerid", "root", "123456");
			 } 
		catch (SQLException | ClassNotFoundException e) {e.printStackTrace();}}
	
	 public void addUser(Usuario usuario) throws IOException {
		 MultipartFile filePart = usuario.getAvatar();
		 /* Rotina para salvar o arquivo no servidor */
		 if (!filePart.isEmpty()) {
			 String fileName = filePart.getOriginalFilename();
			 File uploads = new File("/tmp");
				 File file = new File(uploads, fileName);
				 	try (InputStream input = filePart.getInputStream()) {
				 		File.copy(input, file.toPath());
				 	}
		 }
		 
		 try {
			 String sql = "INSERT INTO user (username, password, avatar) values(?,?,?)";
			 PreparedStatement stmt = connection.prepareStatement(sql);
			 stmt.setString(1,usuario.getUsername());
			 stmt.setString(2,usuario.getPassword());
			 stmt.setBinaryStream(3, filePart.getInputStream());
			 stmt.execute();
			 stmt.close();
		 }
		 catch (SQLException e) {e.printStackTrace();}}
	 
	 public boolean existingUser(Usuario usuario) {
		 boolean exists = false;
		 try {
			 PreparedStatement stmt = connection.
			 prepareStatement("SELECT COUNT(*) FROM user WHERE username=? AND password=? LIMIT 1");
			 stmt.setString(1, usuario.getUsername());
			 stmt.setString(2, usuario.getPassword());
			 ResultSet rs = stmt.executeQuery();
			 if(rs.next()){
				 if(rs.getInt(1) != 0) {exists = true;}
			 }
			 rs.close();
			 stmt.close();
		 	}
		 	catch(SQLException e) {System.out.println(e);}
		 return exists;
		 }

	 public byte[] searchAvatar(String username) {
		 byte[] imgData = null;
		 try {
			 PreparedStatement stmt = connection.
			 prepareStatement("SELECT * FROM user WHERE username=? ");
			 stmt.setString(1, username);
			 ResultSet rs = stmt.executeQuery();
			 
			 if(rs.next()) {
				 Blob image = rs.getBlob("avatar");
				 imgData = image.getBytes(1, (int) image.length());
			 }
			 
			 rs.close();
			 stmt.close();
		 }
		 catch(SQLException e) {System.out.println(e);}
		 return imgData;
		 }
	}

