---
title: Association et héritage
sidebar_position: 3
---

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
