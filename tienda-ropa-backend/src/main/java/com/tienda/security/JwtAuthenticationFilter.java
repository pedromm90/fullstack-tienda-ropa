package com.tienda.security; // Filtro JWT

import java.io.IOException;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtAuthenticationFilter extends OncePerRequestFilter {
	
	private final JwtUtil jwtUtil;
	private final AuthenticationManager authenticationManager;
	
	public JwtAuthenticationFilter(JwtUtil jwtUtil, AuthenticationManager authenticationManager) {
		this.jwtUtil = jwtUtil;
		this.authenticationManager = authenticationManager;
	}
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse reponse, FilterChain chain)
			throws ServletException, IOException {
		String header = request.getHeader("Authorization");
		if (header != null && header.startsWith("Bearer ")) {
			String token = header.substring(7);
			if (jwtUtil.validateToken(token)) {
				String usuario = jwtUtil.getUsernameFromToken(token);
				UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(usuario, null, null);
				auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				SecurityContextHolder.getContext().setAuthentication(auth);
			}
		}
		chain.doFilter(request, reponse);
	}

}
