---
title: Spring Security : obtention du token
sidebar_position: 2
---

# Obtention du token

1. Requête de login
   Sur une route **publique** le client (Angular, Bruno...) envoie :

```
POST /api/auth/login
{
  "username": "mtartine",
  "password": "secret"
}

```

2. Spring intercepte la requête dans sa chaîne de filtres
   Le filtre d'authentification s'active

3. AuthenticationManager
   `AuthenticationManager` reçoit username + password et délègue à `AuthenticationProvider`

4. UserDetailsService
   `AuthenticationProvider` apelle

```
UserDetailsService.loadUserByUsername(username)
```

- chercher l’utilisateur en base
- mot de passe hashé
- rôles
  throw une erreur ou retourne un UserDetails

5. Vérification du mot de passe
   Compare mdp envoyé et celui en base via un `PasswordEncoder`

6. Authentification réussie
   Spring crée un objet Authentication qui contient utilisateur + rôles + son état "authenticated = true"

7. Génération du token JWT
   Création personnalisée d'un token avec dedans

- username
- rôles
- date d’expiration
  Signé par une clef secrète

8. Envoi au client
   Dans un cookie httpOnly ou dans la réponse

```
LOGIN REQUEST
   ↓
Security Filter
   ↓
AuthenticationManager
   ↓
AuthenticationProvider
   ↓
UserDetailsService
   ↓
PasswordEncoder
   ↓
Authentication OK
   ↓
JWT GENERATED
   ↓
TOKEN SENT TO CLIENT
```
