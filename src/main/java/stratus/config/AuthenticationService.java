package stratus.config;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;

public class AuthenticationService {

    public static void addToken(HttpServletResponse resp, String username) {
        String jwtToken = Jwts.builder().setSubject(username)
                .setExpiration(new Date(System.currentTimeMillis() + 1000000))
                .signWith(SignatureAlgorithm.HS512, "SecretKey")
                .compact();
        resp.addHeader("Authorization", "Bearer " + jwtToken);
        resp.addHeader("Access-Control-Expose-Headers", "Authorization");
    }

    public static Authentication getAuthentication(HttpServletRequest req) {
        String token = req.getHeader("Authorization");
        if (token != null) {
            String user = Jwts.parser()
                    .setSigningKey("SecretKey")
                    .parseClaimsJws(token.replace("Bearer ", ""))
                    .getBody().getSubject();
            if (user != null) {
                return new UsernamePasswordAuthenticationToken(user, null);
            }

        }
        return null;
    }
}
