# À retenir
### Ajout du starter Spring Security 'org.springframework.boot:spring-boot-starter-security’
### Création d’une classe de configuration avec @Configuration
- Gestion de l’authentification et de l’habilitation :
- Pour activer SecurityFilterChain utilisation @EnableWebSecurity
- Mise en place de filtres :
- Accès à tous : permitAll()
- Interdit à tous : denyAll()
- Accès si authentifié : authenticated()
- Désactivation du CSRF quand manipulation de POST, PUT, PATCH et DELETE
- csrf.disable()
Authentification Stateless
- API n’a pas besoin de maintenir une session côté serveur
- Utilisation d’un jeton JWT (objet JSON qui contient des paires clef-valeur)
- Le JWT se compose de trois parties : Hearder - Payload - Signature