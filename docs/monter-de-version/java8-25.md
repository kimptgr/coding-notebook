# Entités
Les annotations de validations de contraintes javax sont désormais remplacées par 
```build.gradle
implementation 'jakarta.validation:jakarta.validation-api:3.1.1'
```
- Imports : javax.persistence.* → jakarta.persistence.*.
`org.springframework.lang.Nullable` => déprécié
`import jakarta.validation.constraints.NotNull;`

Mais annotation @Nullable si elle est indispensable (comme est implicite ce n'est pas une contrainte de validation)
`import org.jspecify.annotations.Nullable;`
PAS jakarta.annotation.nullable

- Retour de repository/service → `Optional<T>`
- Paramètre potentiellement null → @Nullable (JSpecify) pour analyse par IDE
- DTO → Jakarta Validation (@NotNull) (Nullable implicite)

### Crud repository ou JpRepository ?
Jpa fonction avancée comme pagination, tri...
Pas de perte de performances avec jpa // crud

rabbit mq
cache.size

> Make jars not wars

# Remplacer NamedNativeQuery
- @NamedNativeQuery,  @SqlResultSetMapping remplacés par Native query + interface
```
public interface TasseView {
    Integer getId();
    String getLibelle();
```
```
@Query(value = """
        SELECT 
            t.id AS id,
            t.libelle AS libelle
        FROM tasse t
        WHERE t.id = :id
        """,
        nativeQuery = true)
    Optional<TasseView> findTasseById(@Param("id") Integer id);
```

# Controller
Ne pas renvoyer d'interfaces dans les entités, préférer des dtos même s'il faut les mapper avant. (plus rapide)
