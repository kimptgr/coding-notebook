---
title: OneToOne
---
# OneToOne
## Unidirectionnel
Utilisateur lié à Profile
```
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;

    // One-to-One mapping with foreign key in 'users' table
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "profile_id", referencedColumnName = "id")
    private Profile profile;

    public User() {}

    public User(String username, Profile profile) {
        this.username = username;
        this.profile = profile;
    }

    // Getters and setters omitted for brevity
}
```
```java
@Entity
@Table(name = "profiles")
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String bio;
//...
}
```

## Bidirectionnel 
```
@OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
private Profile profile;
```
```
@OneToOne
@JoinColumn(name = "user_id", referencedColumnName = "id")
private User user;
```
**JoinColumn** Spécifie la foreign key
**mappedBy** Utilisé pour la bidirectionnalité

## Clef primaire partagée
```java
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    //...

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    @PrimaryKeyJoinColumn
    private Address address;

    //... getters and setters
}
```
```java
@Entity
@Table(name = "address")
public class Address {

    @Id
    @Column(name = "user_id")
    private Long id;

    //...

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;

}

```
**mappedBy** est dans user puisque la clef étrangère est présente dans la table adresse, **@PrimaryKeyJoinColumn**, qui indique que la clé primaire de l’entité User est utilisée comme valeur de clé étrangère pour l’entité Adresse associée. Le champ **@Id** dans adresse fait référence à user_id qui n'utilise plus @GeneratedValue. **@MapsId** inqique que les valeurs principales de la clé seront copiées de l’entité Utilisateur.