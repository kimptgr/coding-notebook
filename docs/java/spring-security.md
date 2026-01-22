---
title: Spring Security et JWT
sidebar_position: 1
---

# CDA

## Java

# Sécurité et JWT

```java
@RestController
public class JwtController {

    @GetMapping("/auth")
    public ServiceResponse<String> auth(){
        return new ServiceResponse<>("206", "Authentifié(e) avec succès", "untoken");
    }
}

```

```java
class LoginRequest {
    public String email;
    public String password;
}

@RestController
public class JwtController {

    @PostMapping("/auth")
    public ServiceResponse<String> auth(@RequestBody LoginRequest loginRequest){
        // Est-ce que email/password
        if (!loginRequest.email.equals("sgobin@eni-ecole.fr") || !loginRequest.password.equals("123456")){
            return new ServiceResponse<>("989", "Couple email / mot de passe incorrect");
        }

        // Générer un token
        String token = "untoken";

        return new ServiceResponse<>("206", "Authentifié(e) avec succès", token);
    }
}

```

```java
 implementation 'io.jsonwebtoken:jjwt-api:0.12.6'
 runtimeOnly 'io.jsonwebtoken:jjwt-impl:0.12.6'
 runtimeOnly 'io.jsonwebtoken:jjwt-jackson:0.12.6'

```

```java
   // Guard clause : Email pate * nb heure
        int nbHour = 1;
        Date tokenLifetime = new Date(System.currentTimeMillis() + ((1000 * 60 * 60) * nbHour));

        // Le code pour générer un token
        String token = Jwts.builder()
                .subject("test")
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(tokenLifetime)
                .signWith(getSecretKey())
                .compact();


```

```java
    private Key getSecretKey() {
        // convertir un string en base 64
        byte[] keyBytes = Decoders.BASE64.decode("69636e783529213d5722613b2b336c793371666524684a3445226e5573");

        // convertir une base 64 en Key
        return Keys.hmacShaKeyFor(keyBytes);
    }

```

```java
@GetMapping("/check-login")
    public ServiceResponse<Boolean> check(){
        // Token
        String token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0IiwiaWF0IjoxNzY4OTkwNzQxLCJleHAiOjE3Njg5OTQzNDF9.EfxEk6075QJRCAk6nK5HlC9LCvqLZSc9YBxVAPUn57g";

        // Verifier
        try {
            // Outil pour récupérer le token (déchiffrer)
            JwtParser jwtParser = Jwts.parser()
                    .verifyWith((SecretKey) getSecretKey())
                    .build();
            Claims claims = jwtParser.parseSignedClaims(token).getPayload();

        } catch (Exception e){
            return new ServiceResponse<Boolean>("689", "Token invalide", false);
        }

        // Sinon ok
        return new ServiceResponse<Boolean>("202", "Token valide", true);
    }

```

```java
@RequestHeader("Authorization") String bearerToken
```

```java
    @GetMapping("/check-login")
    public ServiceResponse<Boolean> check(@RequestHeader("Authorization") String bearerToken){
        // Header authorization
        // Attention Nous on récupéer Bearer MONTOKEN
        // DONC il faut néttoyer le token recu pour récupérer que le MONTOKEN
        // DONC enlever le "Bearer " (7 premiers caractère)
        // Token
        String token = bearerToken.substring(7);

```

```java

 implementation 'org.springframework.boot:spring-boot-starter-security'testImplementation 'org.springframework.security:spring-security-test'

```

```java

 @Configuration
public class SecurityConfig {

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        // Desactiver CSRF
        http.csrf(csrf -> csrf.disable());

        // Desactiver CORS
        http.cors(cors -> cors.disable());

        return http.build();
    }
}

```

```java
@Component
public class JwtAuthInterceptor implements HandlerInterceptor {

    /**
     * Que faire avant d'arriver au controller ou au middleware suivant
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        if (true){
            return false;
        }

        // Par defaut ca veut dire c'est OK -> ca passe
        return HandlerInterceptor.super.preHandle(request, response, handler);
    }
}

```

```java
@Configuration
public class SecurityConfig implements WebMvcConfigurer {

    private final JwtAuthInterceptor jwtAuthInterceptor;

    public SecurityConfig(JwtAuthInterceptor jwtAuthInterceptor) {
        this.jwtAuthInterceptor = jwtAuthInterceptor;
    }

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        // Desactiver CSRF
        http.csrf(csrf -> csrf.disable());

        // Desactiver CORS
        http.cors(cors -> cors.disable());

        return http.build();
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // Allez va s-y rajoute mon interceptor dans ton catalog d'interceptor
        registry.addInterceptor(jwtAuthInterceptor);
    }
}

```

```java
package com.example.demo.demojwt;

import com.example.demo.demobank.ServiceResponse;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;
```

```java
@Component
public class JwtService {
    private Key getSecretKey() {
        // convertir un string en base 64
        byte[] keyBytes = Decoders.BASE64.decode("69636e783529213d5722613b2b336c793371666524684a3445226e5573");

        // convertir une base 64 en Key
        return Keys.hmacShaKeyFor(keyBytes);
    }
    public ServiceResponse<String> auth(LoginRequest loginRequest){
        // Est-ce que email/password
        if (!loginRequest.email.equals("sgobin@eni-ecole.fr") || !loginRequest.password.equals("123456")){
            return new ServiceResponse<>("989", "Couple email / mot de passe incorrect");
        }
        // Générer un token
        // nb heure
        int nbHour = 1;
        Date tokenLifetime = new Date(System.currentTimeMillis() + ((1000 * 60 * 60) * nbHour));
        // Le code pour générer un token
        String token = Jwts.builder()
                .subject("test")
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(tokenLifetime)
                .signWith(getSecretKey())
                .compact();
        return new ServiceResponse<>("206", "Authentifié(e) avec succès", token);
    }

```

```java

    public ServiceResponse<Boolean> check(String bearerToken){
        // Checker que le token est pas null
        if (bearerToken == null){
            return new ServiceResponse<Boolean>("689", "Token invalide", false);
        }

        // Je check que y'a au moins 7 lettres
        if (bearerToken.length() < 7){
            return new ServiceResponse<Boolean>("689", "Token invalide", false);
        }

        // Header authorization
        // Attention Nous on récupérer Bearer MONTOKEN
        // DONC il faut nettoyer le token recu pour récupérer que le MONTOKEN
        // DONC enlever le "Bearer " (7 premiers caractères)
        // Token
        String token = bearerToken.substring(7);

        // Verifier
        try {
            // Outil pour récupérer le token (déchiffrer)
            JwtParser jwtParser = Jwts.parser()
                    .verifyWith((SecretKey) getSecretKey())
                    .build();
            Claims claims = jwtParser.parseSignedClaims(token).getPayload();

        } catch (Exception e){
            return new ServiceResponse<Boolean>("689", "Token invalide", false);
        }

        // Sinon ok
        return new ServiceResponse<Boolean>("202", "Token valide", true);
    }
}

```

```java
package com.example.demo.demojwt;

public class LoginRequest {

    public String email;
    public String password;

    public LoginRequest() {
    }

    public LoginRequest(String email, String password) {
        this.email = email;
        this.password = password;
    }
}
```

```java
@Component
public class JwtAuthInterceptor implements HandlerInterceptor {

    private final JwtService jwtService;

    public JwtAuthInterceptor(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    /**
     * Que faire avant d'arriver au controller ou au middleware suivant
     */
    @Override
    public boolean preHandle(
        @NonNull HttpServletRequest request,
        @NonNull HttpServletResponse response,
        @NonNull Object handler) throws Exception {
        // Si token passe pas -> alors je passe pas
        // Ca passe pas
        if (true){
            return false;
        }
        // Par defaut ca veut dire c'est OK -> ca passe
        return HandlerInterceptor.super.preHandle(request, response, handler);
    }
}
```

```java


```

```java


```

```java


```

```java


```

```java


```

```java


```

```java


```

```java


```

```java


```

```markdown
# Title

## Subtitle

### Smaller title

**Bold text**  
_Italic text_  
`inline code`
```
