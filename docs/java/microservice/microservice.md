---
title: Architecture micro service
---

Spring Boot propose un un écosystème **Spring Cloud** pour gérer des architectures microservice à l'aide d'outils et de bibliothèques.

- Spring Cloud Config	Gestion centralisée de la configuration (ex : application.properties partagée).
- Spring Cloud Netflix	Intègre les composants Netflix comme Eureka (service discovery (permet aux services de se trouver)), Ribbon (load balancing), Hystrix/Resilience4j (tolérance aux pannes), Zuul ou Gateway.
- Spring Cloud Gateway	API Gateway réactive pour router et filtrer les requêtes vers les services.
- Spring Cloud OpenFeign	Simplifie les appels HTTP entre microservices en créant des clients déclaratifs.
- Spring Boot Actuator	Expose des endpoints pour la surveillance et métriques des services.
- Spring Cloud Sleuth & Zipkin	Traçage distribué pour suivre une requête à travers plusieurs microservices.
 
## Créer une application


## Ajouter un module : ApiService

- Les starters: 
    - Spring Web (Permet d’exposer des API REST en mode Servlet (Spring MVC))
    - Spring Data Jpa (ORM + Repositories JPA)
    - H2 Database (Base de données mémoire)
    - Spring Boot Actuator (Expose des endpoints techniques (/actuator) : health, metrics, info)
    - Lombock (Réduit le code boilerplate)
    - Eureka Discovery Client (Permet au service de s’enregistrer automatiquement dans Eureka)
- CRUD
- application.properties

```yml
spring.application.name=race-service 
server.port=8081 

spring.datasource.url=jdbc:h2:mem:race-db 
#consultation de la base de donnée via l'interface 
spring.h2.console.enabled=true 
 
#pour le moment pas de service discovery 
spring.cloud.discovery.enabled=false
```

Initialiser la bdd h2

```java
@SpringBootApplication 
public class RaceServiceApplication { 
 
    public static void main(String[] args) { 
        SpringApplication.run(RaceServiceApplication.class, args); 
    } 
 
    @Bean 
    CommandLineRunner runner(RaceRepository raceRepository) { 
        return args ->  { 
            raceRepository.save(Race.builder().date(LocalDate.now()).distance(10000).location("Quimper").build()); 
            raceRepository.save(Race.builder().date(LocalDate.now()).distance(5000).location("Rennes").build()); 
        }; 
    } 
 
}
```

Les appels se font pour le moment en apellant le service :8081

 

## Gateway 

Starter 
- Eureka Discovery Client (utiliser le Service Discovery comme source dynamique de routes)
- Reactive Gateway (Basé sur WebFlux. Nécessite de ne pas ajouter spring-boot-starter-web (sinon conflit))
- Spring Boot Actuator ( Monitoring)

application.properties:

```properties
#port de l'application 
server.port=8888 
#pour le moment pas de service discovery 
spring.cloud.discovery.enabled=false 
```

Configuraiton yml 

```yml
spring: 
  cloud: 
    gateway: 
      server: 
        webflux: 
          routes: 
            - id: raceid 
              uri: http://localhost:8081 
              predicates: 
                - Path=/races/** 
```

Les appels se font désormais sur le gateway : http://localhost:8888/races 

 ## Discovery 

Discoverey résoud les problèmes : 
- si l’IP change → tout casse
- si le service est déployé ailleurs → tout casse
- si plusieurs instances existent → tu ne sais pas laquelle appeler

Starter 
- Eureka Starter (enregistrer et découvrir les microservices dynamiquement)
 
Modifcation du port dans application.properties 

Et on ajoute une config pour empêcher la dicovery de s’enregistrer sur elle même 

```properties
server.port=8761 

 
#éviter que le service s'enregistre tous seul 
eureka.client.fetch-registry=false 
eureka.client.register-with-eureka=false 

#la configuration vers le service discovery 
eureka.client.service-url.defaultZone=http://localhost:8761/eureka 
eureka.instance.prefer-ip-address=true 
```
 

 

Modification de l’application pour qu’elle devienne un serveur eureka 

```java
@SpringBootApplication 
@EnableEurekaServer 
public class DiscoveryServiceApplication { 
 
    public static void main(String[] args) { 
        SpringApplication.run(DiscoveryServiceApplication.class, args); 
    } 
} 
```
 
Configuration des micro services 
- Dans les application.properties des modules on utilise eureka

```properties
spring.cloud.discovery.enabled=true 
TODO eureka.client.service-url.defaultZone=http://localhost:8761/eureka
```

Configuration spécifique de la gateway 

- Supprimer le fichier application.yml 
- Création de la configuration automatique dans la gateway 

```java
@SpringBootApplication 
public class GatewayServiceApplication { 
 
    public static void main(String[] args) { 
        SpringApplication.run(GatewayServiceApplication.class, args); 
    } 
 
    @Bean 
    public DiscoveryClientRouteDefinitionLocator dynamicRoutes(ReactiveDiscoveryClient rdc, 
                                                               DiscoveryLocatorProperties dlp ) { 
        return new DiscoveryClientRouteDefinitionLocator(rdc, dlp); 
    } 
} 
```

La gateway crée automatiquement une route :

**http://localhost:8888/RACE-SERVICE/races**

- Nom du service = spring.application.name du microservice

## Utilisation d'**OpenFeign**

- Création d'un service qui utilise une autre bdd. L'entité dans ce service est lié à une autre entité d'un autre service mais elle ne sont pas lien par un lien jpa pour ne pas être persistée et ne pas multiplier les données.

- Ajout du starter OpenFeign
- Créatio d'une entité qui contient l'id de l'entité associé qui est persisté et l'entité persisté dans l'autre bdd

```java
@Entity 
@AllArgsConstructor 
@NoArgsConstructor 
@Data //@Getter @Setter 
@Builder 
public class Runner { 
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Long id; 
    private String firstname; 
    private String lastname; 
 
    private Long idRace; 
 
    @Transient 
    private Race race; 
}
```

Comme l'entité Race est dans un autre service il faut créer la classe

```java
public class Race { 
    private Long id; 
    private int distance; 
    private LocalDate date; 
    private String location; 
} 
```

Pour contacter le service qui gère les courses on utilise openFeign et on crée une interface pour communiquer avec l'api rest

```java
@FeignClient(name = "race-service") 
public interface RaceRestClient { 
 
    //la définition du service pour aller récupérer une course 
    @GetMapping("/races/{id}") 
    public Race getRaceById(@PathVariable Long id); 
 
    //récupération de toutes les courses 
    @GetMapping("/races") 
    public Iterable<Race> getAllRaces(); 
} 
```

```java
@Service 
//création du constructeur et injection géré par lombok 
@AllArgsConstructor 
public class RunnerService { 
    private RunnerRepository runnerRepository; 
    private RaceRestClient raceRestClient; 
 
    public Runner save(Runner runner) { 
        return runnerRepository.save(runner); 
    } 
 
    public Iterable<Runner> findAll(){ 
 
        List<Runner> list = runnerRepository.findAll(); 
        list.forEach(r -> { 
            Race race = raceRestClient.getRaceById(r.getIdRace()); 
            r.setRace(race); 
        }); 
 
        return runnerRepository.findAll(); 
    } 
 
    public Runner findById(Long id){ 
         Runner runner = runnerRepository.findById(id).orElse(null); 
         //utilisation l'id récupéré pour ajouter la course à mon runner 
        //en passant par openfeign 
 
        //appel rest 
        Race race = raceRestClient.getRaceById(runner.getIdRace()); 
 
        runner.setRace(race); 
 
        return runner; 
    } 
    ```

    On peut utiliser h2 console pour vérifier.