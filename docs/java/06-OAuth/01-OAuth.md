---
title: OAuth
sidebar_position: 0
---

# OAuth Open Authorization

- Une norme conçue pour permettre à un site Web ou une application d’accéder aux ressources hébergées par d’autres appli Web
- Protocole d'autorisation et non d'authentification
- Pour accorder l'accès à une ressources
- Utilise des jetons d'accès (souvent jwt mais pas obligé)
  ![Cycle OAuth](\img\java\springsecurity\cycleOAuth.jpg)

## Installation

1. Starters :

- spring-boot-starter-security
- spring-bootstarter-oauth2-client

2. Choisir son serveur OAuth2 (Github, Google, Facebook, Okta...)
3. Configurer les accès depuis ces plateformes
   ex Dans GitHub : configurer les accès à notre application

- Création d’une Oauth Apps avec génération des 2 clefs : « Client ID » Et
  « Client secrets »

```
spring.security.oauth2.client.registration.github.client-id=11a5…
spring.security.oauth2.client.registration.github.client-secret=4f64…
```

Création d’une classe de configuration de sécurité avec un SecurityFilterChain qui utilise le login OAuth 2.0

```java
http.oauth2Login(oauth -> {});
```
