---
title: Cheminement Spring Security de l'authentification par token
sidebar_position: 3
---

# Vue d'ensemble de l'authentification par token (JWT par exemple) dans Spring Boot + Security

```
HTTP Request
 → Security Filter Chain (middlewares)
   → AuthenticationFilter (JWT)
     → AuthenticationManager
       → AuthenticationProvider
         → UserDetailsService
           → UserDetails
     → Authentication (principal)
 → SecurityContext
 → Controller
```

1. Le client envoie une requête

```http
GET /api/projects
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
```

Token dans le header

2. Security Filter Chain

   Dans security pas de middleware mais une chaîne de filtres

   **Filtre** ? Classe qui intercepte chaque requête http pour bloquer, modifier ou laisser passer

   Exemples :
   - `SecurityContextPersistenceFilter`
   - `OncePerRequestFilter` (souvent utilisé pour le JWT)
   - `CorsFilter`
   - `CsrfFilter`
   - `LogoutFilter`
   - `UsernamePasswordAuthenticationFilter`
   - `ExceptionTranslationFilter`
   - `FilterSecurityInterceptor`

3. JWT Authentication Filter (filtre custom)
   - Lit header `Authorization`
   - Vérifie `Bearer Token` existant
   - Valide le token (signature, expiration...)
   - Extrait l'identité (username, id, rôles...)

   ```java
    /**
    * JWT authentication filter.
    * Intercepts each HTTP request to extract and validate a JWT token.
    */
    public class JwtAuthenticationFilter extends OncePerRequestFilter {

        @Override
        protected void doFilterInternal(
                HttpServletRequest request,
                HttpServletResponse response,
                FilterChain filterChain) throws ServletException, IOException {

            String authHeader = request.getHeader("Authorization");

            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                filterChain.doFilter(request, response); // permet à la requête de continuer
                return;
            }

            String token = authHeader.substring(7);
            String username = jwtService.extractUsername(token);

            ...
        }
    }
   ```

   Le filtre custom est placé dans la configuration de la filter chain

   ```
   .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
   ```

   `HttpServletRequest` & `HttpServletResponse` objets bas niveaux du serveur HTTP (Servlet API)

   Spring MVC, Spring Security, etc. ne font que les enrichir, jamais les remplacer

   `HttpServletResponse` permet de définir un status http, écrire dans le bodey, ajouter des headers AVANT le contrôleur (utile quand bloquée avant)

4. AuthenticationManager (le chef d’orchestre)
   `AuthenticationManager` ne **sait rien faire tout seul**

   > “J’ai une demande d’authentification, qui peut s’en occuper ?”

   ```java
   Authentication authentication =
   authenticationManager.authenticate(authRequest);
   ```

   Il délègue à des AuthenticationProvider.

5. AuthenticationProvider

   sait comment authentifier

   vérifie les credentials (password, token, etc.)

6. UserDetailsService
   Accès aux utilisateurs (DB, API, LDAP...)
   Spring ne connais pas User mais UserDetails

   ```java
       public interface UserDetails {

       String getUsername();
       String getPassword();

       Collection<? extends GrantedAuthority> getAuthorities();

       boolean isAccountNonExpired();
       boolean isAccountNonLocked();
       boolean isCredentialsNonExpired();
       boolean isEnabled();
   }
   ```

7. UserDetails (le modèle sécurité)
   Vue sécurité de l'utilisateur, c'est une interface

8. Authentication
   Quand l’authentification réussit, Spring crée une implémentation d' `Authenthication`

   ```java
   Authentication auth =
   new UsernamePasswordAuthenticationToken(
       userDetails,
       null,
       authorities
   );
   ```

9. SecurityContext (la mémoire de la requête)
   `SecurityContext` stocke l’authentification pour la durée de la requête

   ```java
   SecurityContextHolder.getContext().setAuthentication(auth);
   ```

10. Principal
    Vue minimal dans le contrôleur qui expose getName() qui retounr une String

```java
@GetMapping("/me")
public String me(Principal principal) {
    return principal.getName();
}
```

`@AuthenticationPrincipal` peut être utilisé si besoin objet riche dans le contôleur

Si pas de OAuth

PAS d’AuthenticationManager pour le JWT

Un `OncePerRequestFilter` qui

- extrais le token
- le valides
- reconstruis le UserDetails
- mets l’Authentication dans le SecurityContext
