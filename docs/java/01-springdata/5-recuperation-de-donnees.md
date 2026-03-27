---
title: Récupération de données
sidebar_position: 5
---

## JPQL & requêtes

### JPQL

- Orienté objets
- Indépendant du SGBD
- Sécurisé contre l’injection SQL

```java
@Query("SELECT e FROM Employee e WHERE e.email = :email")
Employee findByEmail(@Param("email") String email);
```

### Méthodes dérivées

```java
List<Employee> findByLastNameAndFirstName(String last, String first);
```

**Mots-clés:**

- And, Or
- Between
- LessThan, GreaterThan
- OrderBy

### SQL natif

```java
@Query(
value = "SELECT * FROM EMPLOYEES WHERE ROLE = 'ADMIN'",
nativeQuery = true
)
List<Employee> findAdmins();

```

- ⚠ dépendant du SGBD
- ⚠ pagination / tri limités

## Récupérer un DTO

