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


## Annotation de classe
`@Schema(name = "...", description = "...")`
Des clefs pour l'internationalisation peuvent être utilisés.
## Annotation contrôleurs, classes

- `@Operation` 
Décrit une opération d'API
- @ApiResponses / @ApiResponse
```java
@ApiResponses({
    @ApiResponse(responseCode = "200", description = "OK"),
    @ApiResponse(responseCode = "404", description = "Not found")
})
```
Documente les réponses HTTP, 'Response**s**' est une annotation conteneur
- @Content
Décrit la structure d’un body
```java

@Content(
    mediaType = "application/json",
    array = @ArraySchema(schema = @Schema(implementation = UserDto.class
```
- @Schema
Utilisé aussi dans les réponses, via @Content(schema = @Schema(...))
```java
@ApiResponse(
   responseCode = "200",
   description = "Utilisateur récupéré",
   content = @Content(schema = @Schema(implementation = UserDto.class))
)
```

## Annotation sur les entités
- `@Schema(description = "Âge de l'utilisateur", example = "35", minimum = "0", maximum = "120") prinvate Integer age;` 
documente un champ, un type, une classe, un record
- `@Schema(hidden = true)` ex `@ApiModelProperty(hidden = true)` : cache une propriété, une classe
```
@ArraySchema(
    schema = @Schema(description = "Tags", example = "['java', 'spring']")
)
private List<String> tags;
```
documente un tableau

## Annotations jakarta qui influence 
```
@NotNull
@Size, @Size(min = 3, max = 50)
@Min
@Max
@Email
@Pattern
@Past, @PastOrPresent
@Future, @FutureOrPresent
```

Media / Modèles

@Schema
@ArraySchema
@Content
@Encoding
@ExampleObject

API / Opérations

@Operation
@ApiResponse
@ApiResponses
@Parameter
@Parameters
@RequestBody

# Récapitulatif des changements 
Swagger 2 -> OpenApi3
- @ApiOperation(value = "Get all stations refresh", notes = "") => @Operation(summary = "Get example data", description = "Returns example data if available")
- @ApiResponse(code = 404, message = "Not found") => @ApiResponse(responseCode = "200", description = "Successfully retrieved data")