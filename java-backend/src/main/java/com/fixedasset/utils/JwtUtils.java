package com.fixedasset.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.Date;

@Data
@Component
@ConfigurationProperties(prefix = "waiterxiaoyy.jwt")
public class JwtUtils {

	private long expire;
	private String secret;
	private String header;

	// JWT Generate
	public String generateToken(String username) {

		Date nowDate = new Date();
		Date expireDate = new Date(nowDate.getTime() + 1000 * expire);

		return Jwts.builder()
				.setHeaderParam("typ", "JWT")
				.setSubject(username)
				.setIssuedAt(nowDate)
				.setExpiration(expireDate)// Expires in 7 days
				.signWith(SignatureAlgorithm.HS512, secret)
				.compact();
	}

	// Claim & Check JWT
	public Claims getClaimByToken(String jwt) {
		try {
			return Jwts.parser()
					.setSigningKey(secret)
					.parseClaimsJws(jwt)
					.getBody();
		} catch (Exception e) {
			return null;
		}
	}

	// JWT Check if Expired
	public boolean isTokenExpired(Claims claims) {
		return claims.getExpiration().before(new Date());
	}

}
