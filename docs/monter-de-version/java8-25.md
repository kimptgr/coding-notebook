# Entités
Les annotations de validations de contraintes javax sont désormais remplacées par 
```build.gradle
implementation 'jakarta.validation:jakarta.validation-api:3.1.1'
```

`import jakarta.validation.constraints.NotNull;`

Mais annotation @Nullable si elle est indispensable (comme est implicite ce n'est pas une contrainte de validation)
`import org.jspecify.annotations.Nullable;`
PAS jakarta.annotation.nullable

### Crud repository ou JpRepository ?
Jpa fonction avancée comme pagination, tri...
Pas de perte de performances avec jpa // crud

rabbit mq
cache.size 