---
title: MapStruct
---
MapStruct remplace ModelMApper

## ModelMapper

- inspecte les classes à l'exécution (réflexion) en essayant de deviner le mapping
- ne gère pas les records ou champs finaux
- n’est plus activement maintenu.

## MapStruct (compilation, pas de réflexion, ultra rapide)

- fonctionne à la compilation
- plus rapide que ModelMapper
- fonctionne parfaitement avec les records
- compatible avec Spring Boot 4
- Si une propriété change, le build échoue, pas de surprises

Pour une clean architecture

```bash
Repository -> Projection Interface (IModel)
Service    -> Mapper (MapStruct)
           -> record 
Controller -> ResponseEntity(recordDTO)
```

## Mise en place

### build.gradle

```txt
dependencies {
    // MapStruct core
    implementation 'org.mapstruct:mapstruct:1.5.5.Final'

    // Annotation processor
    annotationProcessor 'org.mapstruct:mapstruct-processor:1.5.5.Final'
}
```

Faire un `gradle clean build`

MapStruct génère les classes de mapping dans : `build/generated/sources/annotationProcessor/...`

Pour mapper une interface de projection en record

### Record

```java
public record AppleDTO(Long id, String name, int weight) {}
```

### Interface de projection

```java
public interface IApple {
    Long getId();
    String getLabel();
    int getWeight();
}
```

### Mapper AppleMapper

```java
@Mapper(componentModel = "spring") // Pour que le Bean soit accessible
public interface AppleMapper {
    
@Mappings({
        @Mapping(source = "label", target = "name"), // si des noms diffèrent
    })
    AppleDTO toDto(IApple source);


    List<AppleDTO> toDtoList(List<IApple> source);

    AppleDTO toDto(AppleEntity entity);

    AppleEntity toEntity(AppleDTO dto);


    // Pour les updates, on met à jour une entité existante
    @InheritConfiguration(name = "toEntity")
    void updateEntityFromDto(AppleDTO dto, @MappingTarget AppleEntity entity);
}
```

### Service

```java
@Service
public class AppleService {

    private final AppleMapper mapper;

    public AppleService(AppleMapper mapper) {
        this.mapper = mapper;
    }

    public List<AppleDTO> getAllApples() {
        List<IApple> apples = repository.findAllProjected(); 
        return mapper.toDtoList(apples);
    }
}
```

On peut mapper des objets contenant des sous objets il suffit de fournir le "sous" mapper avec `@Mapper(componentModel = "spring", uses = {PepinMapper.class})`
