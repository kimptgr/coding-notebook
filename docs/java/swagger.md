---
title: Swagger
sidebar_position: 0
---

# Swagger

Les _API REST_ sont créées principalement pour être
utilisées dans des applications.

Documenter pour définir :

- Les URLs accessibles
- Les méthodes
- Les données à fournir
- Les informations récupérées, …

```java
implementation 'org.springdoc:springdoc-openapi-starter-webmvc-ui:3.0.1'
```

## Swagger UI

Accès sur `http://<hostname>:<port>/<context-path>/swagger-ui/index.html`

### Changer contexte path

application.properties

```
springdoc.swagger-ui.path=/documentation/swagger-ui.html
```

### Activer/Désactiver swagger UI

application.properties

```
springdoc.swagger-ui.enabled=true
```

## API Docs

- Documentation OpenAPI générée par SpringDoc OpenAPI
- Accès sur `http://<hostname>:<port>/<context-path>/api-docs`

### Changer contexte path

application.properties

```
springdoc.api-docs.path=/documentation/api-docs
```

### Activer/Désactiver api-docs

application.properties

```
springdoc.api-docs.enabled=true
```

# Personnaliser

## Classe de config

```java
@Configuration
@OpenAPIDefinition(info = @Info(
title = "Titre spécifique",
description = "Description spécifique",
version = "1.0"))
public class OpenApiConfig {
}
```

## Annotation sur les controllers

```java
@Tag(name = "Controller de classe", description = "Une api")

public class ClasseController{
    @Operation(description = "Annotation de méthode")
    @Get...
}
```

Des clefs pour l'internationalisation peuvent être utilisés.
