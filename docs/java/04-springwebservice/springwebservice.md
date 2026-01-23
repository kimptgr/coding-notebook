---
title: Spring Web Service
sidebar_position: 0
---

# Web service

Application manipulable au travers d’API sur Internet

# Spring web

- RestController
- ResponseEntity
- librairies jackson : mapping pojo / json

```java
ResponseEntity.ok(employes)
ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Votre identifiant n'est pas un entier");
```

## spring-boot-starter-validation

- Utilise annotations sur les BOs
- Utilise @Valid avec @RequestBody
