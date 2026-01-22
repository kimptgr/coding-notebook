---
title: Spring Data
sidebar_position: 1
---

## 📚 SOMMAIRE

1. Introduction à Spring Data
2. Introduction à Spring Data JPA
3. Définitions : JPA, ORM et Entité
4. Configuration de la DataSource
5. Transactions et cycle de vie des entités

---

Spring Data est un **projet Spring** visant à simplifier l’interaction avec différents types de stockages :

- JPA (bases relationnelles)
- MongoDB (NoSQL document)
- Neo4j (graphes)
- Redis (clé / valeur)
- Solr (moteur de recherche)
- API Web

Spring Data permet d’**adapter le modèle de données** selon l’API utilisée.

---

## Repository

```java
public interface Repository<T, ID>
```

**abstraction** pour manipuler les données sans utiliser de SQL
Spring génère automatiquement l’implémentation à l’exécution.

```java
/**
 * Repository responsible for Employee data access.
 */
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
}
```

## CRUD auto

Spring Data JPA est le **module Spring Data dédié aux bases relationnelles.**

```
Spring Data JPA (JpaRepository)
↓
JPA (Specification)
↓
ORM (Hibernate)
↓
JDBC
↓
Database
```

## ⚙ Configuration DataSource minimal

```application.properties
spring.datasource.url=jdbc:sqlserver://localhost;databaseName=DEMO_DB
spring.datasource.username=sa
spring.datasource.password=Password
```

## 📘 Définitions essentielles

**ORM** : Mapping entre objets Java et tables SQL

**JPA** : Sorte de contrat, implémentée par Hibernate, qui définit comment déclarer, sauvegarder, charger, gérer les relations des entités

**Entité JPA** : Classe Java dont les objets peuvent être stockés en base de données

```java
  @Entity
  public class Employee {

      @Id
      @GeneratedValue
      private Integer id;

      private String name;

      public Employee() {}

  }
```

## 🔄 Cycle de vie des entités

New / Transient
Managed
Detached
Removed
➡ JPA limite les requêtes SQL jusqu’au commit

## 🔐 Transactions

Automatiques sur INSERT / UPDATE / DELETE
Transaction métier avec @Transactional

```java
/**
- Executes a money transfer in a single transaction.
*/
  @Transactional
  public void transfer(Account from, Account to, double amount) {
  from.withdraw(amount);
  to.deposit(amount);
  }
```

Respect des propriétés ACID

## ACID

- A Atomicity Tout ou rien
- C Consistency Données valides
- I Isolation Transactions indépendantes
- D Durability Données persistantes

## 🔑 Clés primaires composites

- Méthode 1 — @IdClass

```java
public class OrderProductId implements Serializable {

    private Integer orderId;
    private Integer productId;
}
```

```java
@Entity
@IdClass(OrderProductId.class)
public class OrderProduct {

    @Id
    private Integer orderId;

    @Id
    private Integer productId;
}
```

- Méthode 2 — @EmbeddedId (préférée)

```java
@Embeddable
public class OrderProductId implements Serializable {

    private Integer orderId;
    private Integer productId;
}
```

```java
@Entity
public class OrderProduct {

    @EmbeddedId
    private OrderProductId id;
}
```

⚠ modifie la structure de l’entité

## 🔗 Associations

# Direction

- Unidirectionnelle (préférée)
- Bidirectionnelle (attention récursivité)

# Cardinalités

Exemple ManyToOne

```java
@Entity
public class Department {
    @OneToMany(mappedBy = "department")
    private List<Employee> employees;
}
```

```java
@Entity
public class Employee {

    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company company;

}
```

⚠️ Attention à toString() et equals() (boucles infinies)

## 🧬 Héritage JPA

```java
@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "EMPLOYEE_TYPE")
public abstract class Employee {
}

```

```java
@Entity
@DiscriminatorValue("TEACHER")
public class Teacher extends Employee {
}
```

SINGLE_TABLE

- 1 table
- Colonne discriminante
- Rapide, mais colonnes inutiles

JOINED

- 1 table par classe
- Jointures SQL
- Plus propre, moins performant

## 🔍 JPQL & requêtes

# JPQL

- Orienté objets
- Indépendant du SGBD
- Sécurisé contre l’injection SQL

```java
@Query("SELECT e FROM Employee e WHERE e.email = :email")
Employee findByEmail(@Param("email") String email);
```

# Méthodes dérivées

```java
List<Employee> findByLastNameAndFirstName(String last, String first);
```

**Mots-clés:**

- And, Or
- Between
- LessThan, GreaterThan
- OrderBy

# SQL natif

```java
@Query(
value = "SELECT * FROM EMPLOYEES WHERE ROLE = 'ADMIN'",
nativeQuery = true
)
List<Employee> findAdmins();

```

- ⚠ dépendant du SGBD
- ⚠ pagination / tri limités
