package com.tienda.controller; // Controlador de autenticación

import com.tienda.model.Usuario;
import com.tienda.repository.UsuarioRepository;
import com.tienda.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

// @CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/auth")
public class AuthController {
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@Autowired
	private UsuarioRepository usuarioRepository;

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginRequest request) {
		authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(request.getUsuario(), request.getPassword()));
		Usuario usuario = usuarioRepository.findByUsuario(request.getUsuario());
		String token = jwtUtil.generateToken(usuario.getUsuario());
		return ResponseEntity.ok(new LoginResponse(token));	
	}
	
	class LoginRequest {
		private String Usuario;
		private String Password;
		
		
		// GETTERS - SETTERS
		public String getUsuario() {
			return Usuario;
		}
		public void setUsuario(String usuario) {
			Usuario = usuario;
		}
		public String getPassword() {
			return Password;
		}
		public void setPassword(String password) {
			Password = password;
		}
	}
	
	class LoginResponse {
		private String token;
		
		public LoginResponse(String token) {
			this.token = token;
		}

		public String getToken() {
			return token;
		}

		public void setToken(String token) {
			this.token = token;
		}
	}
}
