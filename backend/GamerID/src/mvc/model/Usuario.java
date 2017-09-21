package mvc.model;
import org.springframework.web.multipart.MultipartFile;

public class Usuario {
	private Integer id;
	private String username;
	private String password;
	private String email;
	private String steam;
	private String riot;
	private String battlenet;
	private String discord;
	private MultipartFile avatar;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
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
	public MultipartFile getAvatar() {
		return avatar;
	}
	public void setAvatar(MultipartFile avatar) {
		this.avatar = avatar;
	}
}
