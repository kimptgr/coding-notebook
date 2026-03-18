---
title: Spring Security Objectifs
sidebar_position: 0
---

# Mots clefs

- Authentification VS Authorisation
- Habilitation
- Intégrité
- Confidentialité
- Audit
- Non répudiation
- Protection contre l’analyse du trafic,

```bash
Client                    Serveur
  |                           |
  |--POST /authentification-->|
  |  (login + password)       |
  |                           |--Validation credentials
  |                           |--Génération JWT Token
  |<--Token (header)----------|
  |                           |
  |--GET / resource---------->|
  |(Authorization: Bearer token)|
  |                           |--Validation Token
  |  <--Resource--------------|

  ```

  ## Flux

1. Client envoie login + password → POST /authentification
2. AuthenticationManager valide les credentials
3. Si valide => JWT généré
4. Token renvoyé en header **Authorization: Bearer token**
5. Client envoie token dans chaque requête
6. JWTAuthenticationFilter valide le token

## Créer un UserDetails personnalisé
## Créer un UserDetailsService personnalisé
## Créer filtre JWT
## Configurer SecurityFilterChain
## Classe LoginRequest
