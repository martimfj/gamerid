package mvc.controller;

import java.io.IOException;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import mvc.model.Usuario;
import mvc.model.UsuarioDAO;

@Controller
public class LoginController{
	@RequestMapping("registro")
	public String registro() {
		return "formulario-registro";
	}
	
	@RequestMapping(value = "efetuaRegistro", method = RequestMethod.POST)
	public String upload(Usuario usuario) throws IOException {
		UsuarioDAO dao = new UsuarioDAO();
		dao.addUser(usuario);
		return "redirect:loginForm";
	}
}