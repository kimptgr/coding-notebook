# Aspect Oriented Programming
- POO est très performante pour découper en couches précises une application
- Mais dès qu’un service est transverse, ça dégrade le modèle objet
ex : sécurité, synchronisation, logging, cache...
=> AOP découpe le code technique du fonctionnel
## Concepts
 ### Aspect : Classe qui contient une logique transversale (log, sécurité, transaction…).
 ### Join Point : Point précis dans l’exécution du programme (ex: appel d’une méthode, lancement d’un constructeur).
 ### Pointcut : Règle qui sélectionne les join points (ex: toutes les méthodes d’un package).
 ### Advice : Code exécuté autour du join point.
#### Points principaux
- @Before → avant l’exécution
- @After → après l’exécution
- @AfterReturning → après succès
- @AfterThrowing → en cas d’exception
- @Around → avant + après (le plus puissant)
 ### Weaving : Moment où l'aspect est appliqué
- à la compilation
- au chargement
- à l’exécution (Spring AOP)
## Mise en place
- Starter :  spring-boot-starter-aop
- Un aspect = une méthode d’un bean de Spring
- Un advice = un moment associé à un « join point »
Aspect de lo
```java
@Aspect
@Component
public class LoggingAspect {

    /**
     * Logs before any method in the service package is executed.
     */
    @Before("execution(* com.example.service.*.*(..))")
    public void logBefore() {
        System.out.println("Method execution started");
    }
}
```
- @Aspect → classe AOP
- execution(* com.example.service.*.*(..)) → pointcut
- @Before → advice

```java
@Service
public class UserService {

    /**
     * Saves a user in the database.
     *
     * @param user the user to save
     */
    public void save(User user) {
        // business logic only
    }
}
```
## TLDR;
AOP = Aspect Oriented Programming
- Le principe = découpler le code technique, du code fonctionnel
-Les concepts :
- Aspect
- Advice (greffon)
- Join Point (point de jonction)
- Pointcut (point de coupe ou de coupure)
- Join Point Model (modèle de point de jonction)
- Weaving (tissage)
Avec Spring Boot, pour réaliser des aspects, il faut :
- Le starter : spring-boot-starter-aop
- Une classe avec l’annotation @Aspect et @Component
- Un aspect = une méthode d’un bean de Spring