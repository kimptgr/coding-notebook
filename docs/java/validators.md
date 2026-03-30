---
title: Validation des données
---

## Paramètre

```java
import org.springframework.validation.annotation.Validated;

@Validated
@RestController
public class UserController {
}
```

- Sans @Validated, les annotations sur les paramètres simples (@RequestParam, @PathVariable, etc.) ne fonctionnent pas.

## Annotations les plus utilisées

```java
@GetMapping("/users")
public String getUsers(
    @RequestParam @NotBlank String name
) {
    return name;
}
```

- @NotNull → pas null
- @NotEmpty → pas null + pas vide (collections, strings)
- @NotBlank → pas null + pas vide + pas que des espaces
- @Size(min=, max=) → taille min/max
- @Pattern(regex=) → regex
- @Email → format email

Numériques

- @Min(value)
- @Max(value)
- @Positive
- @PositiveOrZero
- @Negative
- @NegativeOrZero

Dates / temps

- @Past
- @PastOrPresent
- @Future
- @FutureOrPresent

Autres

- @AssertTrue
- @AssertFalse

Liste

```java
@GetMapping("/ids")
public String getIds(
    @RequestParam List<@Positive Long> ids
) {
    return "ok";
}
```

```java
@RequestBody (le plus classique)
@PostMapping("/users")
public void createUser(
    @Valid @RequestBody UserDTO user
) {
}
```

**@Valid** déclenche la validation sur l’objet

## Objet

```java
import jakarta.validation.constraints.*;

public class UserDTO {

    @NotBlank
    private String name;

    @Email
    private String email;

    @Min(18)
    private int age;

    @Size(min = 6, max = 20)
    private String password;

    // getters/setters
}
```

> **@Valid** Valide un objet (DTO)
> **@Validated** sur la classe active validation sur paramètres

## Gérer les erreurs

Spring renvoie automatiquement une erreur 400 si validation échoue.

```java
@ExceptionHandler(MethodArgumentNotValidException.class)
public ResponseEntity<?> handleValidationError(MethodArgumentNotValidException ex) {
    return ResponseEntity.badRequest().body(ex.getMessage());
}
```

- `@Validated` sur le contrôleur
- `@Valid` pour les objets
- `@RequestParam`
- `@PathVariable`
- `@RequestHeader`
- `@RequestBody`
