---
title: JWT & CSRF
sidebar_position: 3
---

# CSRF (Cross-Site Request Forgery)

CSRF = forcer un utilisateur déjà connecté à faire une action sans le vouloir

> Le navigateur envoie **automatiquement** certaines infos d’authentification(cookies, session, etc.)

### Principe du CSRF

> Ajouter un secret que seul le vrai site connaît, et que le navigateur n’envoie pas automatiquement.

> **CSRF Token**

1. Le serveur génère un token CSRF

2. Il est :

- injecté dans le HTML
- ou envoyé via une API

3. Le client doit le renvoyer :

- dans un header
- ou dans le body

4. Le serveur vérifie

- Si le token est absent ou faux → requête rejetée

### CSRF et Spring Security

Par défaut activé pour méthodes non safe (post, put, patch, delete)

Spring génère un token CSRF, le stock par défault en session et vérifie à chaque requête

### CSRF et JWT

JWT dans le header Authorization : **PAS vulnérable au CSRF**

> le navigateur n’envoie pas ce header automatiquement donc un site externe ne peut pas le forcer

CSRF inutile → on le désactive

```java
http.csrf(csrf -> csrf.disable());
```

HTTPS Obligatoire en production pour que le token ne puisse pas être intercepté

Durée de vie du token courte (15mns-1h MAX)

CORS bien configurés

```java
http.cors(cors -> cors.configurationSource(corsConfigurationSource()));
```

Désactiver CSRF en server-side = faille critique car en server-side, on utilise des cookies de session

```java
.sessionManagement(session ->
            session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        )
```

JWT dans un cookie HttpOnly: **VULNÉRABLE** au CSRF

> CSRF OBLIGATOIRE

### Double Submit Cookie

Principe :

- 1 cookie JWT (HttpOnly)
- 1 cookie CSRF (lisible JS)
- le client renvoie le CSRF token dans un header

Spring :

- compare cookie ↔ header

### CORS = Cross-Origin Resource Sharing

> Le **navigateur** bloque une requête HTTP vers un autre domaine sauf si le serveur autorise explicitement cette origine.
> CORS décide qui peut LIRE la réponse, pas qui peut appeler l’API
> CORS = règle navigateur
> Bloque JS cross-domain

```java
@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration config = new CorsConfiguration();

    config.setAllowedOrigins(List.of("http://localhost:4200"));
    config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
    config.setAllowedHeaders(List.of("Authorization", "Content-Type"));
    config.setAllowCredentials(true);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", config);

    return source;
}
```

Dans la security config

```
http.cors();
```
