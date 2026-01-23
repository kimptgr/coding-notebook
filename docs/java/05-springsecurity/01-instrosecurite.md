---
title: Spring Security
sidebar_position: 1
---

# Introduction à la sécurité

## Spring security

Couvre :

- Authentification
- Habilitation
- Protège du CSRF

build.gradle :

```
implementation 'org.springframework.boot:spring-boot-starter-security'
```

> Par défault BasicAuth

- login par défault : user
- mdp généré par spring visible dans la console

### Configuration de la gestion de l'authentification et des habilitations

Authentification :

- la stratégie pour les utilisateurs (en mémoire, JDBC, LDAP [AD Directory], …)
- algo pour chiffrer mdp (noop, bcrypt, argon2...)

  ![Authentification sur un serveur](\img\java\springsecurity\serveur-client-jwt.jpg)

```java
package fr.eni.tp.security;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {
    // Only use with JWT
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public WebSecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }
    //
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests((req) ->
                     req
                        .requestMatchers("/articles/", "/articles").authenticated()
                        .requestMatchers(HttpMethod.DELETE, "/articles/*").hasRole("ADMIN")
                        .requestMatchers("/articles/**").hasRole("USER")
                        .requestMatchers(
                                "/swagger-ui/**",
                                "/swagger-ui.html",
                                "/v3/api-docs/**").permitAll()
                             .requestMatchers("/auth/**").permitAll()
                             .requestMatchers("/csrf").permitAll()
                        .anyRequest().authenticated())
                //req.anyRequest().permitAll())
                //.httpBasic(Customizer.withDefaults());
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
//        return NoOpPasswordEncoder.getInstance();
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    /**
     * Exposes AuthenticationManager as a Spring bean.
     *
     * @param config AuthenticationConfiguration provided by Spring Security
     * @return AuthenticationManager instance
     */
    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config
    ) throws Exception {
        return config.getAuthenticationManager();
    }

}
```

- @EnableWebSecurity pour configurer le Filterchain
- csrf.disable() pour requêtes =/= GET

## Intro à JWT

- Authentification Stateless => pas de sessions côté serveur
- Utilisation d'un jeton
  ![Authentification sur un serveur](\img\java\springsecurity\cyclejwtauthentification.jpg)

### JWT (JSON Web Token)

- objet JSON qui contient des paires clef-valeur
- 3 parties
- Hearder (en-tête)  type de jeton et l’algorithme de chiffrement
- Payload (charge utile) informations de l’utilisateur transmises à l’application.
- Clef/valeur appelées « claims »
- 3 types de « claims » : enregistrées, privées ou publiques
- Signature
  - garantit que le jeton n’est pas modifié par des tiers non autorisés
- est un encodage base64 de : Header + Payload + clef secrète (ou une paire de clefs)
  https://www.jwt.io/
  ![Cycle duu jeton](\img\java\springsecurity\cyclejwtauthentification.jpg)

# Mise en place

build.gradle

```
// JWT
implementation 'io.jsonwebtoken:jjwt-api:0.13.0'
runtimeOnly 'io.jsonwebtoken:jjwt-impl:0.13.0'
runtimeOnly 'io.jsonwebtoken:jjwt-jackson:0.13.0'
```

![Arborescence de la sécurité](\img\java\springsecurity\monarborescence.jpg)

## AuthController

```java
@Profile("!mock")
@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthController(AuthenticationManager authenticationManager,
                          JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<Void> login(@RequestBody LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.login,
                        request.password
                )
        );

        UserDetails user = (UserDetails) authentication.getPrincipal();
        String token = jwtService.generateToken(user);

        ResponseCookie jwtCookie = ResponseCookie.from("ACCESS_TOKEN", token)
                .httpOnly(true)
                .secure(false) // true en prod HTTPS
                .sameSite("Lax")
                .path("/")
                .maxAge(Duration.ofMinutes(15))
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                .build();
    }
}
```

## CsrfController

```java
@Profile("!mock")
@RestController
public class CsrfController {

    /**
     * Forces CSRF token generation and exposure.
     */
    @GetMapping("/csrf")
    public CsrfToken csrf(CsrfToken csrfToken) {
        return csrfToken;
    }
}
```

## JwtAuthenticationFilter

```java
/**
     * Security filter that validates JWT tokens on each request.
     */
@Profile("!mock")
    @Component
    public class JwtAuthenticationFilter extends OncePerRequestFilter {

        private static final String ACCESS_TOKEN_COOKIE = "ACCESS_TOKEN";

        private final JwtService jwtService;
        private final UserDetailsService userDetailsService;

        public JwtAuthenticationFilter(JwtService jwtService,
                                       UserDetailsService userDetailsService) {
            this.jwtService = jwtService;
            this.userDetailsService = userDetailsService;
        }

        @Override
        protected void doFilterInternal(HttpServletRequest request,
                                        HttpServletResponse response,
                                        FilterChain filterChain)
                throws ServletException, IOException {
/**
 * Logique pour header autorization
 */
//            final String authHeader = request.getHeader("Authorization");
//
//            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
//                filterChain.doFilter(request, response);
//                return;
//            }
//
//            String jwt = authHeader.substring(7);
//            String username = jwtService.extractUsername(jwt);

            /**
             * Cookie logic
             */
            String jwt = extractTokenFromCookies(request);

            if (jwt == null) {
                filterChain.doFilter(request, response);
                return;
            }

            String username = jwtService.extractUsername(jwt);

            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

                UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                if (jwtService.isTokenValid(jwt, userDetails)) {
                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    userDetails.getAuthorities()
                            );
                    authToken.setDetails(
                            new WebAuthenticationDetailsSource().buildDetails(request)
                    );

                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }

            filterChain.doFilter(request, response);
        }

    /**
     * Extracts the JWT token from HTTP cookies.
     *
     * @param request the current HTTP request
     * @return the JWT token value or null if not found
     */
    private String extractTokenFromCookies(HttpServletRequest request) {
        return Optional.ofNullable(request.getCookies()).flatMap(cookies -> Arrays.stream(cookies)
                        .filter(c -> "ACCESS_TOKEN".equals(c.getName()))
                        .map(Cookie::getValue)
                        .findFirst())
                .orElse(null);
    }
}
```

## JWTService

```java
/**
 * Service responsible for generating and validating JWT tokens.
 */
@Profile("!mock")
@Service
public class JwtService {
    private static final String SECRET_KEY = "WOHOHO_MAIS_QUI_VOILA_LE_PERE_NOEL_2_NON_ENCORE_MIEUX";

    private static final long EXPIRATION_TIME = 1000 * 60 * 60; // 1 hour

    /**
     * Generates a JWT token for an authenticated user.
     *
     * @param userDetails authenticated user
     * @return signed JWT token
     */
    public String generateToken(UserDetails userDetails) {
        return generateToken(Map.of(), userDetails);
    }

    /**
     * Generates a JWT token with custom claims.
     *
     * @param extraClaims additional JWT claims
     * @param userDetails authenticated user
     * @return signed JWT token
     */
    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
        Instant now = Instant.now();
        return Jwts.builder()
                .claims(extraClaims)
                .subject(userDetails.getUsername())
                .issuedAt(Date.from(now))
                .expiration(Date.from(now.plusSeconds(EXPIRATION_TIME)))
                .signWith(getSigningKey())
                .compact();
    }

    /**
     * Extracts username (subject) from token.
     */
    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    /**
     * Checks whether the token is valid for a given user.
     */
    public boolean isTokenValid(String token, UserDetails userDetails) {
        String username = extractUsername(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractAllClaims(token).getExpiration().before(new Date());
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    /**
     * Builds the signing key used for JWT signature.
     */
    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }
}

```

## LoginRequest

```java
public class LoginRequest {
    public String login;
    public String password;
}
```

## JpaUserDetailsService

```java
@Profile("!mock")
@Service
public class JpaUserDetailsService implements UserDetailsService {
    private final IUserDAO repository;

    public JpaUserDetailsService(IUserDAO repository) {
        this.repository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        TPUser user = repository.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found: " + email));

        return new org.springframework.security.core.userdetails.User(
                user.email,
                user.password,
                user.roles
                        .stream()
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toSet())
        );
    }
}
```

## MockSecurityConfig

```java
@Configuration
@Profile("mock")
public class MockSecurityConfig {

        /// //////////////////////////////////////////////////////////////////////////
        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
            http
                    .sessionManagement(session ->
                            session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                    )
//                .csrf(AbstractHttpConfigurer::disable)
                    .csrf(csrf -> csrf
                            .csrfTokenRepository(
                                    CookieCsrfTokenRepository.withHttpOnlyFalse()
                            )
                            .ignoringRequestMatchers(
                                    "/auth/login",
                                    "/auth/refresh"
                            )
                    )
                    .authorizeHttpRequests((req) ->
                            req
                                    .requestMatchers("/articles/", "/articles").authenticated()
                                    .requestMatchers(HttpMethod.DELETE, "/articles/*").hasRole("ADMIN")
                                    .requestMatchers("/articles/**").hasRole("USER")
                                    .requestMatchers(
                                            "/swagger-ui/**",
                                            "/swagger-ui.html",
                                            "/v3/api-docs/**").permitAll()
                                    .requestMatchers("/auth/**").permitAll()
                                    .requestMatchers("/csrf").permitAll()
                                    .anyRequest().authenticated())
                    //req.anyRequest().permitAll())
                    .httpBasic(Customizer.withDefaults());

            return http.build();
        }

        @Bean
        public PasswordEncoder passwordEncoder() {
            return NoOpPasswordEncoder.getInstance();
            //return PasswordEncoderFactories.createDelegatingPasswordEncoder();
            //return Argon2PasswordEncoder.defaultsForSpringSecurity_v5_8();
        }

        /**
         * Exposes AuthenticationManager as a Spring bean.
         *
         * @param config AuthenticationConfiguration provided by Spring Security
         * @return AuthenticationManager instance
         */
        @Bean
        public AuthenticationManager authenticationManager(
                AuthenticationConfiguration config
        ) throws Exception {
            return config.getAuthenticationManager();
        }

    @Profile("mock")
    @Bean
    public UserDetailsService userDetailsService(PasswordEncoder passwordEncoder){
        UserDetails user =
                User.builder()
                        .username("user")
                        .password(("password"))
                        .roles("USER")
                        .build();
        return new InMemoryUserDetailsManager(user);
    }
}
```

###
